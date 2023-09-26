import { useDispatch, useSelector } from "react-redux";
import data from "../../data/data"
import { betToRemove } from "../../actions/bet";

const BetTpl = () => {
  const dispatch = useDispatch();
  const betListNumber = useSelector((state) => state.bet.betNumber);

  const teamsOptions = data.Team.map((team) => (
    <option key={team["Name"]}>{team["Trigram"]} - {team["Name"]}</option>
  ));  

  const handleDelete = (event) => {
    event.preventDefault()
    const idToRemove = event.currentTarget.id
    dispatch(betToRemove(idToRemove))
  }

  return (
    <form key={betListNumber} id={betListNumber} onSubmit={handleDelete}>
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
    </form>
  )
};

export default BetTpl;