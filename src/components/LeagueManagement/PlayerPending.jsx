import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";
import Wrapper from "../Wrapper/Wrapper";
import { toggleConfirmationModal } from "../../actions/league";
import { Link } from "react-router-dom";
import { setTargetKick } from '../../actions/user';
import { setFocusedInputId, setModalFunction, updatePlayerByDmfc } from '../../actions/datas';

const PlayerPending = ({playersNA}) => {
  const dispatch = useDispatch();

  const handleAccept = (event) => {
    const targetPlayer = playersNA.filter(({username}) => username.includes(event.target.id));
    const targetID = targetPlayer[0].id;
    dispatch(setTargetKick(event.target.id));
    dispatch(setFocusedInputId(targetID));
    dispatch(toggleConfirmationModal(true));
    dispatch(setModalFunction(updatePlayerByDmfc({role: ["ROLE_JOUEUR"]})));
  };

  const handleReject = (event) => {
    const targetPlayer = playersNA.filter(({username}) => username.includes(event.target.id));
    const targetID = targetPlayer[0].id;
    dispatch(setTargetKick(event.target.id));
    dispatch(setFocusedInputId(targetID));
    dispatch(toggleConfirmationModal(true));
    dispatch(setModalFunction(updatePlayerByDmfc({league: null})));
  };

  return (
    <Wrapper name={"league-management_pending"}>
      <div>Joueur en attente de validation :</div>
      {playersNA.length > 0 ? 
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
                <th><button id={username} onClick={handleAccept}>V</button></th>
                <th><button id={username} onClick={handleReject}>X</button></th>
              </tr>)}
            </tbody>
          </table>
        ) : (
          <div>Pas de demande actuellement</div>
        )
        }
    </Wrapper>
  )
};

PlayerPending.propTypes = {
  playersNA: PropTypes.array,
};

export default PlayerPending;