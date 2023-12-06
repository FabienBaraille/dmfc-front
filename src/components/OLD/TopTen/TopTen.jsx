import { useDispatch, useSelector } from 'react-redux';

import RoundSelector from '../BetCreation/Element/RoundSelector';
import Wrapper from '../Wrapper/Wrapper';
import Input from '../Utils/Input';
import LoadElmt from '../Loader/LoadElmt';

import { createRound, createTopTen, getTopTen, setInputValueBet, toggleCreationMode } from '../../actions/bet';

import './TopTen.scss';
import { useEffect } from 'react';
import { transformDate } from '../../Utils/stats/calcDate';
import TopTenList from './TopTenList';
import { phaseFilter } from '../../Utils/filters/roundFilter';

const TopTen = () => {

  const dispatch = useDispatch();

  const {isLoadingGame, roundCreationMode, roundName, roundNumber, toptens, toptenDate} = useSelector((state) => state.bet);
  const rounds = phaseFilter(useSelector((state) => state.datas.rounds), 'TOP');

  useEffect(() => {
    if (roundNumber !== '') {
      dispatch(getTopTen(roundNumber));
    } else {
      dispatch(setInputValueBet('roundNumber', rounds[rounds.length-1].id));
      dispatch(getTopTen(rounds[rounds.length-1].id));
    }
  }, [roundNumber]);

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

  const handleCreateTop = (event) => {
    event.preventDefault();
    if (toptenDate !== 'now') {
      const transformedDate = transformDate(toptenDate, 'create');
      dispatch(createTopTen(transformedDate));
    }
  }

  if (isLoadingGame) {
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
      {(roundNumber !== '' && !roundCreationMode) &&
        <>
            {toptens.length === 0 ? 
              <Wrapper name="topten-list">
                <h5>{`Les tops 10 n'existent pas encore`}</h5>
                <form onSubmit={handleCreateTop}>
                  <Input 
                    inputName="deadline"
                    label="Deadline :"
                    id="pronostic-limit"
                    type="datetime-local"
                    value={toptenDate}
                    onChange={event => dispatch(setInputValueBet('toptenDate', event.target.value))} 
                    isRequired={true}
                  />
                  <button type="submit" >Créer les tops 10</button>
                </form>
              </Wrapper>
              :
              <div className='topten-all'>
                <TopTenList topten={toptens[0]} />
                <TopTenList topten={toptens[1]} />
              </div>
            }
        </>
      }
    </section>
  )
};
export default TopTen;