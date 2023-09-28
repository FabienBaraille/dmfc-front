import data from "../../data/data";
import Input from "../Utils/Input";

const teamsOptions = data.Team.map((team) => {
  return (team["Trigram"])
});

const matchTime = data.Game[0]["Date and time of Match"]

const PlayerBetMatch = () => {
  return (
    <div className="match">
      <div className="teams">
        <div className="team">
          <input type="checkbox" />
          <label htmlFor="team1" id="team1">
            {teamsOptions[0]}
          </label>
        </div>
        @ 
        <div className="team">
          <label htmlFor="team2" id="team2">
            {teamsOptions[1]}
          </label>
          <input type="checkbox" />
        </div>
        <Input label="Diff" htmlFor="diff" id="diff" type="number" />
      </div>
      <div className="match_timer">{matchTime}</div>
    </div>
  )
};

export default PlayerBetMatch;