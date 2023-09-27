/* eslint-disable react/no-unescaped-entities */
import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../Wrapper/Wrapper"
import data from "../../data/data";
import { addBetToList } from "../../actions/bet";
import { toggleCreationMode } from "../../actions/bet";
import BetTpl  from "./BetMatch";


const RsBetCreation = () => {
  const dispatch = useDispatch();

  const betList = useSelector((state) => state.bet.betList);
  const roundCreationMode = useSelector((state) => state.bet.roundCreationMode)

  const roundOptions = data.Round.map(round => {
    return (
      <option key={round["Name"]} value={round["Name"]}>{round["Name"]}</option>
    )
  });

  const betTpl = BetTpl()

  const handleAddBet = () => {
    dispatch(addBetToList(betTpl))
  }

  const handleRoundCreation = () => {
    roundCreationMode ? dispatch(toggleCreationMode(false)) : dispatch(toggleCreationMode(true))
  }

  return (
    <Wrapper name="rsbetcreation">
      <div>
        <p>Pronostique saison régulire</p>
        {roundCreationMode ||
          <select>
            <option>Choisir le Round</option>
            {roundOptions}
          </select>
        }
      </div>
      <form>
        {betList.length ==0 ?
          <>
            <button type="button" onClick={handleRoundCreation}>Création d'un nouveau round</button>
            {roundCreationMode &&
              <>
                <input id="round_creation" type="text" placeholder="Nom du round"/>
                <select>
                  <option>SR</option>
                  <option disabled>PO</option>
                </select>
              </>
            }
          </>
        : null }
        {betList}
        {roundCreationMode ?
          <button type="button" className="addRound">Validez</button> :
          <button type="button" className="addBet" onClick={handleAddBet}>+</button>
        }
        {betList.length !== 0 ?
          <>
            <button type="submit">Validez mes choix</button>
          </>
        : null}
      </form>
    </Wrapper>
  )
};

export default RsBetCreation;