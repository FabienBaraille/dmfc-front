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
      <option key={`round${id}`} value={id} defaultValue={id === roundNumber}>{name}</option>
    )
  });

  return (
    <>
      {roundOptions.length === 0 ? 
      <h3>Créer un nouveau round pour commencer !</h3>
        :
      <select id="roundNumber" value={roundNumber} onChange={handleInput}>
        <option value='' defaultValue={roundNumber === ''} disabled hidden>Choisir le Round</option>
        {roundOptions}
      </select>      
      }  
    </>
  )}

export default RoundSelector;