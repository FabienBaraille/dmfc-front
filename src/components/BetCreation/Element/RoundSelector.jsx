import { useDispatch, useSelector } from "react-redux";
import { setInputValueBet } from "../../../actions/bet";

const RoundSelector = () => {
  const dispatch = useDispatch();
  const roundsList = useSelector((state) => state.datas.rounds);
  const roundNumber = useSelector((state) => state.bet.roundNumber);

  const handleInput = (event) => {
    dispatch(setInputValueBet(event.target.id, event.target.value));
  }

  const roundOptions = roundsList.map(({id, name}) => {
    return (
      <option key={`round${id}`} value={id}>{name}</option>
    )
  });
  return (
    <>
      <p>Sélectionne un round dans lequel créer des matchs.</p>
      <select id="roundNumber" value={roundNumber} onChange={handleInput}>
        <option value=''>Choisir le Round</option>
        {roundOptions}
      </select>
    </>
  )};
export default RoundSelector;