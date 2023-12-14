import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { toastSuccess } from "../Toast/ToastDMFC";
import RoundSelector from '../BetCreation/Element/RoundSelector';
import Wrapper from '../Wrapper/Wrapper';
import Input from '../Utils/Input';
import LoadElmt from '../Loader/LoadElmt';
import TopTenList from '../TopTen/TopTenList';

import {
  createRound,
  createTopTen,
  getBetTopByConference,
  getBetTopByPlayer,
  getTopTen,
  resetIsAllGet,
  resetScoreUpdate,
  setInputValueBet,
  setIsCreatedRound,
  setIsCreatedTop,
  setIsLoadingGame,
  setIsUpdatedBet,
  setIsUpdatedDeadline,
  setIsUpdatedResults,
  setIsUpdatedTop,
  toggleCreationMode,
  updateBetTopDMFC,
  updatePlayerScore,
  updateTopTen
} from '../../actions/bet';
import { getRounds, getUsersList } from '../../actions/datas';

import { transformDate } from '../../Utils/stats/calcDate';
import { isInclude, phaseFilter, toptenId } from '../../Utils/filters/roundFilter';
import { teamsByConf } from '../../Utils/filters/teamFilter';

import './TopTen.scss';
import { calcScoreTop, calcTopBetPoints } from '../../Utils/stats/calcStats';
import { positionFinder } from '../../Utils/filters/usersFilter';

const TopTen = () => {

  const dispatch = useDispatch();

  const {
    isLoadingGame,
    isCreatedRound,
    isCreatedTop,
    isUpdatedTop,
    isUpdatedDeadline,
    isUpdatedResults,
    isUpdatedBet,
    isAllGet,
    roundCreationMode,
    roundName,
    roundNumber,
    toptens,
    toptenDate,
    updatedConf,
    topResults,
    predictionByGame,
    allPredictions,
    updatedMessageScore
  } = useSelector((state) => state.bet);
  const {allTeams, isLoadingSR, allUsers} = useSelector((state) => state.datas);

  const eastTeams = teamsByConf(allTeams, 'Eastern');
  const westTeams = teamsByConf(allTeams, 'Western');

  const rounds = phaseFilter(useSelector((state) => state.datas.rounds), 'TOP');

  const userPlaying = allUsers.filter(({roles}) => roles.includes('ROLE_JOUEUR'));

  const eastTopId = toptenId(rounds, 'Eastern');
  const westTopId = toptenId(rounds, 'Western');

  const isUpdate = toptens.length !== 0;

  useEffect(() => {
    if (roundNumber === '' || isInclude(rounds, roundNumber)) {
      dispatch(setInputValueBet('roundNumber', rounds[rounds.length-1].id));
      dispatch(getTopTen(rounds[rounds.length-1].id));
    } else if (rounds.length != 0) {
      dispatch(getTopTen(roundNumber));
    }
    if (!isLoadingGame && isCreatedRound) {
      toast.success('Round créé avec succès.', toastSuccess);
      setTimeout(() => {
        dispatch(setIsCreatedRound(false));
      }, 2001);
    }
    if (!isLoadingGame && isCreatedTop) {
      toast.success('Tops 10 créés avec succès.', toastSuccess);
      setTimeout(() => {
        dispatch(getRounds());
        dispatch(setIsCreatedTop(false));
      }, 2001);
    }
    if (isUpdatedDeadline) {
      toast.success('La deadline a été mise à jour.', toastSuccess);
        setTimeout(() => {
          dispatch(getRounds());
          dispatch(getTopTen(rounds[rounds.length-1].id));
          dispatch(setIsUpdatedDeadline(false));
        }, 2001);
    }
    // Calculate points starting
    if (isUpdatedTop && topResults.length != 0) {
      toast.success('Tops 10 mis à jour avec succès.', toastSuccess);
      setTimeout(() => {
        dispatch(getBetTopByConference(updatedConf));
        dispatch(setIsUpdatedTop(false));
      }, 2001);
    }
    if (predictionByGame.length > 0 && isUpdatedResults) {
      dispatch(setIsUpdatedResults(false));
      dispatch(setIsLoadingGame(true));
      calcBetPoints();
    }
    if (predictionByGame.length > 0 && isUpdatedBet) {
      const idsList = [];
      userPlaying.forEach(({id}) => idsList.push(id));
      dispatch(getBetTopByPlayer(JSON.stringify(idsList)));
      dispatch(setIsUpdatedBet(false));
    }
    if (allPredictions.length != 0 && isAllGet) {
      updateScore();
      dispatch(resetIsAllGet());
    }
    if (updatedMessageScore !== '') {
      dispatch(setIsLoadingGame(false));
      toast.success('Scores recalculés avec succès, merci de ta patience.', toastSuccess);
      setTimeout(() => {
        dispatch(resetScoreUpdate());
        dispatch(getTopTen(roundNumber));
        dispatch(getUsersList());
      }, 2501);
    }
  }, [roundNumber, isCreatedRound, isCreatedTop, isUpdatedTop, isUpdatedResults, isUpdatedBet, isAllGet, updatedMessageScore]);

  const calcBetPoints = () => {
    const idsList = [];
    const pointsEarned = [];
    predictionByGame.forEach((prediction) => {
      idsList.push(prediction.id);
      pointsEarned.push(calcTopBetPoints(prediction.predictedRanking, topResults));
    })
    const body = {
      idsList: idsList,
      pointsEarned: pointsEarned
    }
    dispatch(updateBetTopDMFC(body));
  }

  const updateScore = () => {
    const idsList = [];
    const scoresTOP = [];
    const oldPositions = [];
    allPredictions.forEach((playerBets) => {
      if (playerBets.length != 0) {
        idsList.push(playerBets[0].User.id);
        scoresTOP.push(calcScoreTop(playerBets));
        oldPositions.push(positionFinder(userPlaying, playerBets[0].User.id));
      }
    })
    const body = {
      idsList: idsList,
      scoresTOP: scoresTOP,
      oldPositions: oldPositions
    }
    dispatch(updatePlayerScore(body));
  }

  const handleRoundCreation = () => {
    roundCreationMode ? dispatch(toggleCreationMode(false)) : dispatch(toggleCreationMode(true))
  }
  const handleInput = (event) => {
    dispatch(setInputValueBet(event.target.id, event.target.value));
  }
  const handleSubmitRound = (event) => {
    event.preventDefault();
    dispatch(createRound('TOP'));
  }

  const handleCreateUpdateTop = (event) => {
    event.preventDefault();
    if (toptenDate !== '' && !isUpdate) {
      const transformedDate = transformDate(toptenDate, 'create');
      dispatch(createTopTen(transformedDate));
    }
    if (isUpdate) {
      const newDate = transformDate(toptenDate, 'create');
      const body = {
        "deadline": newDate
      };
      toptens.forEach(({id}) => {
        dispatch(updateTopTen(id, body));
      });
    }
  }

  if (isLoadingGame || isLoadingSR) {
    return <LoadElmt />
  }

  return (
    <section className="dmfc-creation top-creation">
      <Wrapper name="rsbetcreation">
        <div className="round-choice">
          <h4>Top 10</h4>
          {!roundCreationMode &&
            <RoundSelector isCreationMatch={true} phase={"TOP"} />
          }
        </div>
        <form onSubmit={handleSubmitRound}>
          <button type="button" onClick={handleRoundCreation}>
            {!roundCreationMode ? "Nouveau round" : "Round existant"}
          </button>
          {roundCreationMode &&
            <>
              <div className="round-creation">
                <Input 
                  label="Nom du Round" 
                  id="roundName" 
                  type="text" 
                  placeholder="Nom du round"
                  value={roundName}
                  onChange={handleInput}
                />
              </div>
              <button type="submit">Créer le round</button>
            </>
          }
        </form>
      </Wrapper>
      {(roundNumber !== '' && !roundCreationMode && rounds.length != 0) &&
        <Wrapper name="topten-deadline">
          <h5>{isUpdate === 0 ? "Les tops 10 n'existent pas encore" : "Tu peux éditer la deadline"}</h5>
          <form onSubmit={handleCreateUpdateTop}>
            <Input 
              inputName="deadline"
              label="Deadline :"
              id="pronostic-limit"
              type="datetime-local"
              value={toptenDate}
              onChange={event => dispatch(setInputValueBet('toptenDate', event.target.value))} 
              isRequired={true}
            />
            <button type="submit" >{!isUpdate ? "Créer les tops 10" : "Mettre à jour la deadline"}</button>
          </form>
        </Wrapper>
      }
      {(rounds.length !== 0 && !roundCreationMode && isUpdate) &&
        <div className='topten-all'>
          <TopTenList topten={isUpdate ? toptens[1] : ''} teams={westTeams} idsList={westTopId} conference={'Ouest'} />
          <TopTenList topten={isUpdate ? toptens[0] : ''} teams={eastTeams} idsList={eastTopId} conference={'Est'} />
        </div>
      }
    </section>
  )
};
export default TopTen;