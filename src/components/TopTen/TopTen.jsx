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
  getBetTopByPlayer,
  getBetTopByTop,
  getTopTen,
  resetCountPred,
  resetScoreUpdate,
  setInputValueBet,
  setIsCreatedRound,
  setIsCreatedTop,
  setIsLoadingTop,
  toggleCreationMode,
  updateBetTopDMFC,
  updatePlayerScore,
  updateTopTen
} from '../../actions/bet';
import { getRounds, getUsersList } from '../../actions/datas';

import { transformDate } from '../../Utils/stats/calcDate';
import { phaseFilter, toptenId } from '../../Utils/filters/roundFilter';
import { teamsByConf } from '../../Utils/filters/teamFilter';

import './TopTen.scss';
import { calcScoreTop, calcTopBetPoints } from '../../Utils/stats/calcStats';
import { positionFinder } from '../../Utils/filters/usersFilter';

const TopTen = () => {

  const dispatch = useDispatch();

  const {
    isLoadingGame,
    isLoadingTop,
    isCreatedRound,
    isCreatedTop,
    isUpdateTop,
    roundCreationMode,
    roundName,
    roundNumber,
    toptens,
    toptenDate,
    updatedConf,
    toptenList,
    betTopTenList,
    countBet,
    allPredictions,
    countPred,
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
    if (roundNumber !== '') {
      dispatch(getTopTen(roundNumber));
    } else if (rounds.length != 0) {
      dispatch(setInputValueBet('roundNumber', rounds[rounds.length-1].id));
      dispatch(getTopTen(rounds[rounds.length-1].id));
    }
    if (!isLoadingGame && isCreatedRound) {
      toast.success('Round créé avec succès.', toastSuccess);
      setTimeout(() => {
        dispatch(setIsCreatedRound(false));
      }, 2001);
    }
    if (!isLoadingGame && isCreatedTop) {
      if (!isUpdateTop) {
        toast.success('Tops 10 créés avec succès.', toastSuccess);
        setTimeout(() => {
          dispatch(getRounds());
          dispatch(setIsCreatedTop(false, false));
        }, 2001);
      }
    }
    // Calculate points starting
    if (isCreatedTop && isLoadingTop && ((updatedConf === 'Western' && toptenList.length === westTopId.length) || updatedConf === 'Eastern' && toptenList.length === eastTopId.length)) {
      dispatch(setIsLoadingTop(false));
      toast.success('Tops 10 mis à jour avec succès.', toastSuccess);
      if (updatedConf === 'Western') {
        westTopId.forEach((id) => dispatch(getBetTopByTop(id)));
      } else {
        eastTopId.forEach((id) => dispatch(getBetTopByTop(id)));
      }
      setTimeout(() => {
        dispatch(setIsLoadingTop(true));
        dispatch(getTopTen(roundNumber));
        dispatch(setIsCreatedTop(false, false));
      }, 2001);
    }
    if (!isCreatedTop && (countPred === eastTopId.length || countPred === westTopId.length)) {
      dispatch(resetCountPred());
      calcBetPoints();
    }
    if (!isCreatedTop && countPred === allPredictions.length && allPredictions.length != 0) {
      userPlaying.forEach(({id}) => dispatch(getBetTopByPlayer(id)));
    }
    if (isUpdateTop && betTopTenList.length === userPlaying.length) {
      updateScore();
      dispatch(setIsCreatedTop(false, false));
    }
    if (updatedMessageScore !== '') {
      dispatch(setIsLoadingTop(false));
      toast.success('Scores recalculés avec succès, merci de ta patience.', toastSuccess);
      setTimeout(() => {
        dispatch(resetScoreUpdate());
        dispatch(getUsersList());
      }, 2501);
    }
  }, [roundNumber, isCreatedRound, isCreatedTop, toptenList, betTopTenList, countBet, countPred, updatedMessageScore]);

  const calcBetPoints = () => {
    const results = toptenList.length != 0 ? toptenList[0].results : [];
    dispatch(setIsLoadingTop(false));
    allPredictions.forEach((predictionsByTop) => {
      if (predictionsByTop.length !== 0) {
        predictionsByTop.forEach((prediction) => {
          const pointsEarned = calcTopBetPoints(prediction.predictedRanking, results);
          dispatch(updateBetTopDMFC(prediction.id, pointsEarned));
        })
      }
    })
  }

  const updateScore = () => {
    const idsList = [];
    const scoresTOP = [];
    const oldPositions = [];
    betTopTenList.forEach((playerBets) => {
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

  if (isLoadingGame || isLoadingSR || isLoadingTop) {
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