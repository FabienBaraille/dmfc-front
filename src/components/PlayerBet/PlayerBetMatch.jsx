import PropTypes from 'prop-types';
import { useState } from 'react';


const PlayerBetMatch = ({ id, dateAndTimeOfMatch, team, predictStatus, userId, prediction }) => {

  const [button, setButton] = useState('');
  
  const handleSubmit = event => {
    event.preventDefault();
    console.log(button)
    // Voir comment on récup les value des id (voir Quentin)
    console.log(event.target[2].value)
  }
  
  return (
    <form className="match" onSubmit={handleSubmit}>
      <div className="teams">
        <div className="team1">
          <input type="radio" id="team1" />
          <label htmlFor="team1" >
            {team[0].trigram}
          </label>
        </div>
        @ 
        <div className="team2">
          <label htmlFor="team2" >
            {team[1].trigram}
          </label>
          <input type="radio" id="team2" />
        </div>
      </div>
      <div>
        <label htmlFor="diff">Diff</label>
        <input type="number" id="diff" />
      </div>
      <div className="match_timer">{dateAndTimeOfMatch}</div>
      {(predictStatus !== 'Validated' && predictStatus !== 'Published') && <button type="submit" onClick={() => setButton('Saved')} >Sauvegarder</button>}
      {(predictStatus !== 'Validated' && predictStatus !== 'Published') && <button type="submit" onClick={() => setButton('Validated')} >Valider</button>}
    </form>
  )
};

PlayerBetMatch.propTypes = {
  id: PropTypes.number,
  dateAndTimeOfMatch: PropTypes.string,
  team: PropTypes.array,
  predictStatus: PropTypes.string,
  userId: PropTypes.number,
}

export default PlayerBetMatch;