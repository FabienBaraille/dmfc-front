import { useDispatch, useSelector } from "react-redux";

import Wrapper from "../Wrapper/Wrapper";
import Input from "../Utils/Input";

import { postLeagueChange, setLeague, setLeagueCreationMode } from "../../actions/datas";


const LeagueTitle = () => {
  const dispatch = useDispatch();

  const userRole = useSelector((state) => state.user.loggedUser.roles[0]);
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
    <h2>Infos de ta Ligue :</h2>
    {(userRole === 'ROLE_DMFC' && !leagueCreation) && <button type="button" className="leagueEditBtn" onClick={handleCreationMode}>Editer</button>}
    {leagueCreation ?
      <form onSubmit={handleSubmit}>
        <Input id="leagueName" value={leagueName} onChange={handleLeagueChange}  />
        <textarea id="leagueDescription" onChange={handleLeagueChange} defaultValue={leagueDescription} placeholder="Description de ta ligue"/>
        <button type="submit">Valider</button>
        <p>Pensez à validez vos changements !</p>
      </form>
      :
      <>
        <h3>{leagueName}</h3>
        <p>{leagueDescription === null ? "Bienvue dans ta ligue, tu peux ajouter ici une description": leagueDescription}</p>
      </>
    }
    </Wrapper>
  )
}

export default LeagueTitle;