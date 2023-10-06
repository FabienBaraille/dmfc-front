/* eslint-disable react/no-unescaped-entities */
import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../Wrapper/Wrapper"
import { addBetToList, createRound, setInputValueBet } from "../../actions/bet";
import { toggleCreationMode } from "../../actions/bet";
import BetTpl  from "./BetMatch";
import Input from "../Utils/Input";


const RsBetCreation = () => {
  const dispatch = useDispatch();

  const betList = useSelector((state) => state.bet.betList);
  const roundCreationMode = useSelector((state) => state.bet.roundCreationMode);
  const roundsList = useSelector((state) => state.datas.rounds);
  const roundName = useSelector((state) => state.bet.roundName);
  const roundCat = useSelector((state) => state.bet.roundCat);

  const roundOptions = roundsList.map(({id, name}) => {
    return (
      <option key={id} value={name}>{name}</option>
    )
  });

  const betTpl = BetTpl()

  const handleAddBet = () => {
    dispatch(addBetToList(betTpl))
  }

  const handleRoundCreation = () => {
    roundCreationMode ? dispatch(toggleCreationMode(false)) : dispatch(toggleCreationMode(true))
  }
  const handleInput = (event) => {
    dispatch(setInputValueBet(event.target.id, event.target.value));
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    if (roundCreationMode) {
      dispatch(createRound());
    }
  }

  return (
    <Wrapper name="rsbetcreation">
      <div>
        <p>Pronostique saison régulière</p>
        {roundCreationMode ||
          <select>
            <option>Choisir le Round</option>
            {roundOptions}
          </select>
        }
      </div>
      <form onSubmit={handleSubmit} >
        {betList.length ==0 ?
          <>
            <button type="button" onClick={handleRoundCreation}>{!roundCreationMode ? "Création d'un nouveau round" : "Round existant"}</button>
            {roundCreationMode &&
              <>
                <Input 
                  label="Nom du Round" 
                  htmlFor="roundName" 
                  id="roundName" 
                  type="text" 
                  placeholder="Nom du round"
                  value={roundName}
                  onChange={handleInput}
                />
                <select id="roundCat" placeholder="Catégorie Round" onChange={handleInput} value={roundCat} >
                  <option value='SR'>SR</option>
                  <option value='PO' disabled>PO</option>
                </select>
              </>
            }
          </>
        : null }
        {betList}
        {! roundCreationMode && <button type="button" className="addBet" onClick={handleAddBet}>+</button> }
        {(betList.length !== 0 || roundCreationMode) ?
            <button type="submit">Créer</button>
        : null}
      </form>
    </Wrapper>
  )
};

export default RsBetCreation;