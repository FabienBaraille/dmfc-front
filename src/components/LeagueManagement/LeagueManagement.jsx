import Wrapper from "../Wrapper/Wrapper";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleConfirmationModal } from "../../actions/league";

import './LeagueManagement.scss'

import data from '../../data/data'
import { postLeagueChange, setLeague, setLeagueCreationMode } from "../../actions/datas";
import Input from "../Utils/Input";

const LeagueManagement = () => {
  const dispatch = useDispatch();

  const isConfirmationVisible = useSelector((state) => state.league.isConfirmationVisible)
  const allUsers = useSelector((state) => state.datas.allUsers);
  const leagueCreation = useSelector((state) => state.datas.leagueCreation);
  const leagueDescription = useSelector((state) => state.datas.leagueDescription);
  const leagueName = useSelector((state) => state.datas.leagueName);

  const handleReject = () => {
    dispatch(toggleConfirmationModal(true))
  }

  if (isConfirmationVisible) {
    document.body.classList.add('modal-open');
  } else {
    document.body.classList.remove('modal-open');
  }

  const playerInLigue = ( 
    <table className="ranking-table">
    <thead>
      <tr>
        <th>Nom</th>
        <th>Titre</th>
        <th>Sortir</th>
      </tr>
    </thead>
    <tbody>
      {allUsers.map(({id, username, title}) => 
        <tr key={id} className='users-row'>
          <th><Link to={`/player/${id}`}>{username}</Link></th>
          <th><input defaultValue={title}></input><button id="changeTitleBtn" onClick={handleReject}>V</button></th>
          <th><button id="kickBtn" onClick={handleReject}>X</button></th>
        </tr>)}
    </tbody>
  </table>
  )

  const playerPending = data.User.length > 0 ? 
  (
    <table className="ranking-table">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Accepter</th>
          <th>Refuser</th>
        </tr>
      </thead>
      <tbody>
          {allUsers.map(({id, username}) => 
          <tr key={id} className='users-row'>
            <th><Link to={`/player/${id}`}>{username}</Link></th>
            <th><button id="acceptBtn" onClick={handleReject}>V</button></th>
            <th><button id="refuseBtn" onClick={handleReject}>X</button></th>
          </tr>)}
        </tbody>
    </table>
  ) : (
      <tr>
      <th colSpan='3'>Pas de demande actuellement</th>
    </tr>
  );

  const handleCreationMode = () => {
    leagueCreation ? dispatch(setLeagueCreationMode(false)) : dispatch(setLeagueCreationMode(true))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(postLeagueChange());
    dispatch(setLeagueCreationMode(false))
  }

  const handleLeagueChange = (event) => {
    dispatch(setLeague(event.target.id, event.target.value));
  };

  return (
    <>
      <div className="league-management">
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
        <div className="league-management_player">
          <Wrapper name={"league-management_actual"}>
            <div>Joueur de ma ligue :</div>
            {playerInLigue}
          </Wrapper>
          <Wrapper name={"league-management_pending"}>
            <div>Joueur en attente de validation :</div>
            {playerPending}
          </Wrapper>
        </div>
      </div>
    </>
  )
};

export default LeagueManagement;
