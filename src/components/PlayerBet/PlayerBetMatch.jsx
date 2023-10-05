import PropTypes from 'prop-types';

import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { createBet, updateBet } from '../../actions/bet';
import { unableBet } from '../../Utils/filters/predictionFilter';


const PlayerBetMatch = ({ id, dateAndTimeOfMatch, team, predictStatus, prediction }) => {

  const dispatch = useDispatch();

  const [button, setButton] = useState('');
  const [winTeam, setWinTeam] = useState(predictStatus !== 'Not done' ? prediction.predictedWinnigTeam : '');
  const [winDif, setWinDif] = useState(predictStatus !== 'Not done' ? prediction.predictedPointDifference : '');

  const matchDate = new Date(dateAndTimeOfMatch);
  const currentDate = new Date();

  const unableMessage = unableBet(currentDate, matchDate, predictStatus);

  const handleSubmit = event => {
    event.preventDefault();
    const predictedWinTeam = winTeam == 0 ? team[0].name : winTeam == 1 ? team[1].name : winTeam;
    predictStatus === 'Not done' ? 
    dispatch(createBet(
      predictedWinTeam,
      winDif,
      id,
      button,
      )) : 
    dispatch(updateBet(
      predictedWinTeam,
      winDif,
      prediction.id,
      button
    ))
  }
  return (
    <form className="match" onSubmit={handleSubmit} id={id}>
      <div className="teams">
        <div className="team1">
          <input 
            type="radio" 
            id="0" 
            name='winning-team' 
            defaultChecked={predictStatus !== 'Not done' ? prediction.predictedWinnigTeam === team[0].name : false} 
            disabled={(predictStatus === 'Published' || predictStatus === 'Validated')}
            onChange={(event) => setWinTeam(event.target.id)}
          />
          <label htmlFor="team1" >
            {team[0].trigram}
          </label>
        </div>
        @ 
        <div className="team2">
          <label htmlFor="team2" >
            {team[1].trigram}
          </label>
          <input 
            type="radio" 
            id="1" 
            name='winning-team' 
            defaultChecked={predictStatus !== 'Not done' ? prediction.predictedWinnigTeam === team[1].name : false} 
            disabled={(currentDate > matchDate || predictStatus === 'Published' || predictStatus === 'Validated')} 
            onChange={(event) => setWinTeam(event.target.id)}
          />
        </div>
      </div>
      <div>
        <label htmlFor="diff">Diff</label>
        <input 
          type="number" 
          id="diff" 
          onChange={(event) => setWinDif(event.target.value)} 
          defaultValue={winDif} 
          disabled={(currentDate > matchDate || predictStatus === 'Published' || predictStatus === 'Validated')} />
      </div>
      <div className="match_timer">
        <p>{`Match time : ${matchDate.getMonth()+1} / ${matchDate.getDate()} / ${matchDate.getFullYear()} - ${matchDate.getHours()}:${matchDate.getMinutes()}`}</p>
        {dateAndTimeOfMatch}
      </div>
      {currentDate < matchDate && predictStatus !== 'Validated' && predictStatus !== 'Published' && 
        <div>
          <button type="submit" onClick={() => setButton('Saved')} >Sauvegarder</button>
          <button type="submit" onClick={() => setButton('Validated')} >Valider</button>
        </div>}
      {(currentDate > matchDate || predictStatus == 'Validated' || predictStatus == 'Published') && <h5>{unableMessage}</h5>}
    </form>
  )
};

PlayerBetMatch.propTypes = {
  id: PropTypes.number,
  dateAndTimeOfMatch: PropTypes.string,
  team: PropTypes.array,
  predictStatus: PropTypes.string,
  userId: PropTypes.number,
  prediction: PropTypes.object,
}

export default PlayerBetMatch;