import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { setInputValueBet } from "../../../actions/bet";

const RoundSelector = ({isCreationMatch = false}) => {
  const dispatch = useDispatch();
  // List of all the rounds
  const roundsList = useSelector((state) => state.datas.rounds);
  // Value of the controlled input
  const roundNumber = useSelector((state) => state.bet.roundNumber);
  // Fonction necessary to have a controlled input
  const handleInput = (event) => {
    dispatch(setInputValueBet(event.target.id, event.target.value));
  }
  const roundOptions = roundsList.map(({id, name}) => {
    return (
      <option key={`round${id}`} value={id} defaultValue={id === roundNumber}>{name}</option>
    )
  });
  return (
    <>
      {/* Condition needed if there is no round created */}
      {roundOptions.length === 0 ? 
        <h3>Créer un nouveau round pour commencer !</h3>
        :
        <>
          {isCreationMatch && <p>Sélectionne un round dans lequel créer des matchs.</p>}
          <select id="roundNumber" value={roundNumber} onChange={handleInput}>
            <option value='' defaultValue={roundNumber === ''} disabled hidden>Choisir le Round</option>
            {roundOptions}
          </select>
        </>
      }
    </>
  )
}
// Using propTypes to define the type of props transmitted to the component
RoundSelector.propTypes = {
  isCreationMatch: PropTypes.bool,
}
export default RoundSelector;