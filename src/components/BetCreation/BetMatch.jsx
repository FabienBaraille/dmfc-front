import { useDispatch, useSelector } from "react-redux";
import { betToRemove } from "../../actions/bet";
import Input from "../Utils/Input";
import { useState } from "react";

const BetMatch = () => {

  const dispatch = useDispatch();

  const [matchDate, setMatchDate] = useState('');

  const betListNumber = useSelector((state) => state.bet.betNumber);
  const teamsList = useSelector((state) => state.datas.allTeams);

  const teamsOptions = teamsList.map(({id, trigram, name}, index) => <option key={`${index}team${id}`} value={id}>{trigram} - {name}</option> );  

  const handleDelete = (event) => {
    event.preventDefault()
    const idToRemove = event.currentTarget.id
    dispatch(betToRemove(idToRemove))
  }

  return (
    <div className="match-line" key={betListNumber} id={betListNumber}>
      <select name="visitor">
        {teamsOptions}
      </select>
      <div className='at-logo'> </div>
      <select name="home-team">
        {teamsOptions}
      </select>
      <Input 
        inputName="deadline"
        label="Deadline :"
        htmlFor="pronostic_limit"
        id="pronostic_limit"
        type="datetime-local"
        value={matchDate}
        onChange={event => setMatchDate(event.target.value)} 
        isRequired={true}
      />
      <button 
        className="trash-button"
        id={betListNumber}
        type="button"
        onClick={handleDelete}
      >
        <div className='trash-logo'> </div>
      </button>
    </div>
  )
};

export default BetMatch;