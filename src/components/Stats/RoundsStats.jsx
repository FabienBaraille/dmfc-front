import { predictionByGameId } from '../../Utils/filters/predictionFilter';

import { useSelector } from 'react-redux';
import Wrapper from '../Wrapper/Wrapper';
import ResultElmt from './Element/ResultElmt';
import RoundSelector from '../BetCreation/Element/RoundSelector';

import './RoundsStats.scss';

const RoundStats = () => {

  const allPrediction = useSelector((state) => state.datas.SRPrediction);
  const allRounds = useSelector((state) => state.datas.rounds);
  const roundNumber = useSelector((state) => state.bet.roundNumber);
  const selectedRound = roundNumber !== '' ? allRounds.find(round => round.id === parseInt(roundNumber)) : allRounds[0];

  const ofRound = (selectedRound.games.length !== 0) ?
      selectedRound.games.map (({id}, index) => {
        const filteredPrediction = predictionByGameId(id, allPrediction);
        if (filteredPrediction !== undefined) {
          return (
            <ResultElmt key={id} filteredPrediction={filteredPrediction} index={index+1} />
          )
        } else {
          return (
            <div key={id} className="bet_result player-stat">
              <h5>{`Match ${index+1}`} </h5>
              <p>Le pronostic n'a pas été réalisé</p>
            </div>
          )
        }
      }) :
      <p>Pas de match pour ce round</p>;

  if (allPrediction.length === 0) {
    return (
        <Wrapper name='no-history'>
          <h5>Sans pronostics, pas de stats !</h5>
          <p>Commence par jouer !</p>
        </Wrapper>
    )
  }
  return (
      <div className='rounds-stats'>
        <Wrapper name='round-history'>
          <p>Sélectionne le round :</p>
          <RoundSelector />
        </Wrapper>
        {roundNumber !== '' && <Wrapper>{ofRound}</Wrapper>}
      </div>
  )};

export default RoundStats;