import data from "../../data/data"

const teamsOptions = data.Team.map((team) => (
  <option key={team["Name"]}>{team["Trigram"]} - {team["Name"]}</option>
));

export const betTpl = (
  <>
    <select>
      {teamsOptions}
    </select>
    <p> @ </p>
    <select>
      {teamsOptions}
    </select>
    <label htmlFor="pronostic_limit">Date limite de pronostique :</label>
    <input id="pronostic_limit" type="datetime-local" />
    <button>Supprimer</button>
  </>
);