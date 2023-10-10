import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";
import Wrapper from "../Wrapper/Wrapper";
import { toggleConfirmationModal } from "../../actions/league";
import { Link } from "react-router-dom";
import { setTargetKick } from '../../actions/user';

const PlayerPending = ({playersNA}) => {
  const dispatch = useDispatch();

  const handleReject = (event) => {
    dispatch(setTargetKick(event.target.id));
    dispatch(toggleConfirmationModal(true));
  }

  const playerPending = playersNA.length > 0 ? 
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
        {playersNA.map(({id, username}) => 
        <tr key={id} className='users-row'>
          <th><Link to={`/player/${id}`}>{username}</Link></th>
          <th><button id={username} onClick={handleReject}>V</button></th>
          <th><button id={username} onClick={handleReject}>X</button></th>
        </tr>)}
      </tbody>
    </table>
  ) : (
    <div>Pas de demande actuellement</div>
  );

  return (
    <Wrapper name={"league-management_pending"}>
      <div>Joueur en attente de validation :</div>
      {playerPending}
    </Wrapper>
  )
};

PlayerPending.propTypes = {
  playersNA: PropTypes.array,
}

export default PlayerPending;