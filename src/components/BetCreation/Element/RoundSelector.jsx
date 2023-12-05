import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { setInputValueBet } from "../../../actions/bet";
import { phaseFilter } from "../../../Utils/filters/roundFilter";

const RoundSelector = ({isCreationMatch = false, phase}) => {
  const dispatch = useDispatch();
  // List of all the rounds
  const roundsList = phaseFilter(useSelector((state) => state.datas.rounds), phase);
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
          {isCreationMatch && <p>{`Choisi un round dans lequel créer les ${phase === 'SR' ? 'matchs' : 'tops 10'}.`}</p>}
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
  phase: PropTypes.string
}
export default RoundSelector;