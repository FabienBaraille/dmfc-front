import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../Wrapper/Wrapper";

import { postLeagueChange, setLeague, setLeagueCreationMode } from "../../actions/datas";
import Input from "../Utils/Input";


const LeagueTitle = () => {
  const dispatch = useDispatch();

  const leagueCreation = useSelector((state) => state.datas.leagueCreation);
  const leagueDescription = useSelector((state) => state.datas.leagueDescription);
  const leagueName = useSelector((state) => state.datas.leagueName);

  const handleCreationMode = () => {
    leagueCreation ? dispatch(setLeagueCreationMode(false)) : dispatch(setLeagueCreationMode(true))
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(postLeagueChange());
    dispatch(setLeagueCreationMode(false))
  };

  const handleLeagueChange = (event) => {
    dispatch(setLeague(event.target.id, event.target.value));
  };


  return (
    <Wrapper name={'league-management_name'}>
    {!leagueCreation && <button type="button" className="editBtn" onClick={handleCreationMode}>Editer</button>}
    {leagueCreation ?
      <>
        <Input htmlFor={"leagueName"} id={"leagueName"} value={leagueName} onChange={handleLeagueChange}  />        
        <form onSubmit={handleSubmit}>
          <textarea id="leagueDescription" onChange={handleLeagueChange} defaultValue={leagueDescription}/>
          <button>Valider</button>
        </form>
      </>
      :
      <>
        <h3>{leagueName}</h3>
        <p>{leagueDescription}</p>
      </>
    }
    </Wrapper>
  )
}

export default LeagueTitle;