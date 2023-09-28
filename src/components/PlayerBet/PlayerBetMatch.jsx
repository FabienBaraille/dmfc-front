import PropTypes from 'prop-types';
import data from "../../data/data";
import Input from "../Utils/Input";

const teamsOptions = data.Team.map((team) => {
  return (team["Trigram"])
});

const matchTime = data.Game[0]["Date and time of Match"]

const PlayerBetMatch = ({ number }) => {
  return (
    <div className="match">
      <div className="teams">
        <div className="team1">
          <input type="radio" id="team1" name={`matchnumber${number}`} />
          <label htmlFor="team1" >
            {teamsOptions[0]}
          </label>
        </div>
        @ 
        <div className="team2">
          <label htmlFor="team2" >
            {teamsOptions[1]}
          </label>
          <input type="radio" id="team2" name={`matchnumber${number}`} />
        </div>
      </div>
      <Input label="Diff" htmlFor="diff" id="diff" type="number" />
      <div className="match_timer">{matchTime}</div>
    </div>
  )
};

PlayerBetMatch.propTypes = {
  number: PropTypes.number,
}

export default PlayerBetMatch;