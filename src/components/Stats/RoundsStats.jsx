import { useSelector } from 'react-redux';
import Wrapper from '../Wrapper/Wrapper';
import ResultElmt from './Element/ResultElmt';
import { predictionByGameId } from '../../Utils/filters/predictionFilter';

import './RoundsStats.scss';

const RoundStats = () => {

  const allPrediction = useSelector((state) => state.datas.SRPrediction);
  const allRounds = useSelector((state) => state.datas.rounds);

  const byRound = allRounds.map(({id, name, games}) => {
    const predByRound = games.map (({id}, index) => {
      const filteredPrediction = predictionByGameId(id, allPrediction);
      if (filteredPrediction !== undefined) {
        return (
          <ResultElmt key={id} filteredPrediction={filteredPrediction} index={index+1} />
        )
      } else {
        return (
          <div key={id} className="bet_result player-stat">
            <h5>{`Match ${index+1}`} </h5>
            <p>Pas de pronostique réalisé</p>
          </div>
        )
      }
    })
    return (
      <Wrapper key={id} name="player-stat">
        <h3>{name}</h3>
        {predByRound}
      </Wrapper>
    )
  });

  return (
    <div className='rounds-stats'>
      {byRound}
    </div>
  )};
export default RoundStats;