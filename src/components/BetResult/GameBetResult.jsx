/* eslint-disable react/no-unescaped-entities */
import data from "../../data/data";
import Input from "../Utils/Input";

const GameBetResult = () => {
  const teamsOptions = data.Team.map((team) => (
    <option key={team["Name"]}>{team["Trigram"]} - {team["Name"]}</option>
  ));  

  return (
    <form className="bet_result">
      <div>
        <select>
          {teamsOptions}
        </select>
        <div>
          <Input label="Score" htmlFor="score" id="score" placeholder="000" />
          <Input label="Cote bookie" placeholder="0.00" htmlFor="bookie1" id="bookie1"/>
        </div>
      </div>
      <p> @ </p>
      <div>
        <select>
          {teamsOptions}
        </select>
        <div>
          <Input label="Score" htmlFor="score" id="score" placeholder="000" />
          <Input label="Cote bookie" placeholder="0.00" htmlFor="bookie2" id="bookie2"/>
        </div>
      </div>
      <div>
        <p>Sélection auto "winning team"</p>
        <p>Diff : "calcul auto"</p>
      </div>
      <button>Envoyer les résultats</button>
    </form>
  )
};

export default GameBetResult;