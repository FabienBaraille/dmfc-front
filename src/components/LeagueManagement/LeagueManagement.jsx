import Wrapper from "../Wrapper/Wrapper";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleConfirmationModal } from "../../actions/league";

import './LeagueManagement.scss'

import data from '../../data/data'

const LeagueManagement = () => {
  const dispatch = useDispatch();
  const isConfirmationVisible = useSelector((state) => state.league.isConfirmationVisible)

  const handleReject = () => {
    dispatch(toggleConfirmationModal(true))
    console.log(isConfirmationVisible);
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
      {data.User.map(({id, username, title}) => 
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
          {data.User.map(({id, username}) => 
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

  return (
    <>
      <div className="league-management">
        <Wrapper name={'league-management_name'}>
          <h2>{data.League[1].leagueName}</h2>
          <textarea defaultValue={data.League[1].leagueDescription}/>
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
