/* eslint-disable react/no-unescaped-entities */
import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../Wrapper/Wrapper"
import data from "../../data/data";
import { addBetToList, betToRemove } from "../../actions/bet";
import { betTpl } from "./betMatch"


const RsBetCreation = () => {
  const dispatch = useDispatch();

  const betList = useSelector((state) => state.bet.betList);

  const handleDelete = (event) => {
    event.preventDefault()
    const idToRemove = event.currentTarget.id
    dispatch(betToRemove(idToRemove))
    console.log(idToRemove);
  }

  const betListed = betList.map((bet, index) => (
    <form key={index} id={index} onSubmit={handleDelete}>
      {betTpl}
    </form>
  ));

  const roundOptions = data.Round.map(round => {
    return (
      <option key={round["Name"]} value={round["Name"]}>{round["Name"]}</option>
    )
  });

  const handleAddBet = () => {
    dispatch(addBetToList(betTpl))
  }

  return (
    <Wrapper name="rsbetcreation">
      <div>
        <p>Pronostique saison régulire</p>
        <select>
          <option>Choisir le Round</option>
          {roundOptions}
        </select>
      </div>
      <div>
        <label htmlFor="round_creation">Création d'un nouveau round</label>
        <input id="round_creation" type="text" placeholder="Nom du round"/>
        <select>
          <option>SR</option>
          <option disabled>PO</option>
        </select>
      </div>
        {betListed}
      <div>
        <button className="addBet" onClick={handleAddBet}>+</button>
        <button type="submit">Validez mes choix</button>
        <button type="button">Annulez</button>
      </div>
    </Wrapper>
  )
};

export default RsBetCreation;