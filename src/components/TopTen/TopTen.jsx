import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import RoundSelector from '../BetCreation/Element/RoundSelector';
import Wrapper from '../Wrapper/Wrapper';
import Input from '../Utils/Input';
import LoadElmt from '../Loader/LoadElmt';
import TopTenList from '../TopTen/TopTenList';

import { createRound, createTopTen, getTopTen, setInputValueBet, setIsCreatedMatch, toggleCreationMode, updateTopTen } from '../../actions/bet';
import { getRounds } from '../../actions/datas';

import { transformDate } from '../../Utils/stats/calcDate';
import { phaseFilter, toptenId } from '../../Utils/filters/roundFilter';
import { teamsByConf } from '../../Utils/filters/teamFilter';

import './TopTen.scss';

const TopTen = () => {

  const dispatch = useDispatch();

  const {isCreatedMatch, isLoadingGame, roundCreationMode, roundName, roundNumber, toptens, toptenDate} = useSelector((state) => state.bet);
  const {allTeams, isLoadingSR} = useSelector((state) => state.datas);

  const eastTeams = teamsByConf(allTeams, 'Eastern');
  const westTeams = teamsByConf(allTeams, 'Western');

  const rounds = phaseFilter(useSelector((state) => state.datas.rounds), 'TOP');

  const eastTopId = toptenId(rounds, 'Eastern');
  const westTopId = toptenId(rounds, 'Western');

  const isUpdate = toptens.length !== 0;

  useEffect(() => {
    if (roundNumber !== '') {
      dispatch(getTopTen(roundNumber));
    } else {
      dispatch(setInputValueBet('roundNumber', rounds[rounds.length-1].id));
      dispatch(getTopTen(rounds[rounds.length-1].id));
    }
    if (!isLoadingGame && isCreatedMatch) {
      if (!isUpdate) {
        setTimeout(() => {
          dispatch(getRounds());
          dispatch(setIsCreatedMatch(false));
        }, 1500);
      } else {
        setTimeout(() => {
          dispatch(getTopTen(roundNumber));
          dispatch(setIsCreatedMatch(false));
        }, 1500);
      }
    }
  }, [roundNumber, isCreatedMatch]);

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

  if (isCreatedMatch) {
    return (
      <Wrapper>
        <h2>{isUpdate ? 'Mise à jour effecuée avec succès' : 'Tops 10 créés avec succès !'}</h2>
      </Wrapper>
    )
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
      {(roundNumber !== '' && !roundCreationMode) &&
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
          <TopTenList topten={isUpdate ? toptens[0] : ''} teams={eastTeams} idsList={eastTopId} conference={'Est'} />
          <TopTenList topten={isUpdate ? toptens[1] : ''} teams={westTeams} idsList={westTopId} conference={'Ouest'} />
        </div>
      }
    </section>
  )
};
export default TopTen;