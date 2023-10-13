import { predictionByGameId } from '../../Utils/filters/predictionFilter';

import { useSelector } from 'react-redux';
import Wrapper from '../Wrapper/Wrapper';
import ResultElmt from './Element/ResultElmt';
import Page from '../Page/Page';
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
              <p>Pas de pronostique non réalisé</p>
            </div>
          )
        }
      }) :
      <Wrapper name="player-stat">
        <p>Pas de match pour ce round</p>
      </Wrapper>;

  return (
    <Page>
      <div className='rounds-stats'>
        <Wrapper name='round-history'>
          <p>Sélectionne le round :</p>
          <RoundSelector />
        </Wrapper>
        {roundNumber !== '' && <Wrapper>{ofRound}</Wrapper>}
      </div>
    </Page>
  )};

export default RoundStats;