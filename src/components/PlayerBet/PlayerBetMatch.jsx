import PropTypes from 'prop-types';
import Input from "../Utils/Input";


const PlayerBetMatch = ({ id, dateAndTimeOfMatch, team }) => {

  return (
    <form className="match">
      <div className="teams">
        <div className="team1">
          <input type="radio" id="team1" name={`matchnumber${id}`} />
          <label htmlFor="team1" >
            {team[0].trigram}
          </label>
        </div>
        @ 
        <div className="team2">
          <label htmlFor="team2" >
            {team[1].trigram}
          </label>
          <input type="radio" id="team2" name={`matchnumber${id}`} />
        </div>
      </div>
      <Input label="Diff" htmlFor="diff" id="diff" type="number" />
      <div className="match_timer">{dateAndTimeOfMatch}</div>
      <button type="submit">Valider mon choix</button>
    </form>
  )
};

PlayerBetMatch.propTypes = {
  id: PropTypes.number,
  dateAndTimeOfMatch: PropTypes.string,
  team: PropTypes.array,
}

export default PlayerBetMatch;