/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Input from "../Utils/Input";

import { betToRemove } from "../../actions/bet";

const BetMatch = () => {

  const dispatch = useDispatch();

  const [matchDate, setMatchDate] = useState('');

  const betListNumber = useSelector((state) => state.bet.betNumber);
  const teamsList = useSelector((state) => state.datas.allTeams);

  const teamsOptions = teamsList.map(({selectedAway, selectedHome, teams: {id, trigram, name}}, index) => <option key={`${index}team${id}`} value={id}>{trigram} - {name} - V:{selectedAway} - H:{selectedHome}</option> );

  const handleDelete = (event) => {
    event.preventDefault()
    const idToRemove = event.currentTarget.id
    dispatch(betToRemove(idToRemove))
  }

  return (
    <div className="match-line" key={betListNumber} id={betListNumber}>
      <select name="visitor">
        <option defaultValue={true} disabled hidden>Choisir l'équipe visiteur</option>
        {teamsOptions}
      </select>
      <div className="at">@</div>
      <select name="home-team">
        <option defaultValue={true} disabled hidden>Choisir l'équipe recevant</option>
        {teamsOptions}
      </select>
      <Input 
        inputName="deadline"
        label="Deadline :"
        id="pronostic-limit"
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