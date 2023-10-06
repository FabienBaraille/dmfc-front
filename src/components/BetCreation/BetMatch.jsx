import { useDispatch, useSelector } from "react-redux";
import data from "../../data/data";
import { betToRemove } from "../../actions/bet";
import Input from "../Utils/Input";
import { useState } from "react";

const BetMatch = () => {

  const dispatch = useDispatch();

  const [matchDate, setMatchDate] = useState('');

  const betListNumber = useSelector((state) => state.bet.betNumber);

  const teamsOptions = data.team.map((team) => (
    <option key={team["Name"]}>{team["Trigram"]} - {team["Name"]}</option>
  ));  

  const handleDelete = (event) => {
    event.preventDefault()
    const idToRemove = event.currentTarget.id
    dispatch(betToRemove(idToRemove))
  }

  return (
    <div className="match-line" id={betListNumber}>
      <select>
        {teamsOptions}
      </select>
      <p> @ </p>
      <select>
        {teamsOptions}
      </select>
      <Input label="Date limite de pronostique :" htmlFor="pronostic_limit" id="pronostic_limit" type="datetime-local" value={matchDate} onChange={event => setMatchDate(event.target.value)} />
      <button id={betListNumber} type="button" onClick={handleDelete}></button>
    </div>
  )
};

export default BetMatch;