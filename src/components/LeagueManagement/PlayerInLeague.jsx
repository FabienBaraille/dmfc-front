import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import Input from "../Utils/Input";
import Wrapper from "../Wrapper/Wrapper";
import { updatePlayerByDmfc, setFocusedInputId, setTitle, setModalFunction } from "../../actions/datas";
import { Link } from "react-router-dom";
import { toggleConfirmationModal } from "../../actions/league";
import { setTargetKick } from '../../actions/user';


const PlayerInLeague = ({players}) => {
  const dispatch = useDispatch();

  const focusedInputId = useSelector((state) => state.datas.focusedInputId);
  const playerTitle = useSelector((state) => state.datas.title);

  let isSubmitButtonClicked = false;

  const sortedUsers = players.slice().sort((a, b) => a.username.localeCompare(b.username));

  const handleSubmitTitle = (event) => {
    event.preventDefault();
    isSubmitButtonClicked = true;
    dispatch(updatePlayerByDmfc({title: playerTitle}));
    dispatch(setFocusedInputId(null))
    handleBlur();
  };
  
  const handleTitleChange = (event) => {
    dispatch(setTitle(event.target.value));
  };

  const handleFocus = (event) => {
    dispatch(setFocusedInputId(event.target.id));
  };

  const handleBlur = () => {
    if (!isSubmitButtonClicked) {
      dispatch(setFocusedInputId(null));
    }
    isSubmitButtonClicked = false;
  };

  const handleReject = (event) => {
    const targetPlayer = players.filter(({username}) => username.includes(event.target.id));
    const targetID = targetPlayer[0].id;
    dispatch(setTargetKick(event.target.id));
    dispatch(setFocusedInputId(targetID));
    dispatch(toggleConfirmationModal(true));
    dispatch(setModalFunction(updatePlayerByDmfc({role: ["ROLE_JOUEUR_NA"], title: null, league: 0})));
  };

  return (
    <Wrapper name={"league-management_actual"}>
      <div>Joueur de ma ligue :</div>
      <table className="ranking-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Titre</th>
            <th>Sortir</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map(({id, username, title}) => 
            <tr key={id} className='users-row'>
              <th><Link to={`/player/${id}`}>{username}</Link></th>
              <th>
                <form onSubmit={handleSubmitTitle}>
                  <Input value={title} id={id} onChange={handleTitleChange} onFocus={handleFocus} onBlur={handleBlur}/>
                  {focusedInputId == id && <button type="submit" onMouseDown={() => isSubmitButtonClicked = true}>Valider</button>}
                </form>
              </th>
              <th><button id={username} onClick={handleReject}>X</button></th>
            </tr>
          )}
        </tbody>
      </table>
    </Wrapper>
  );
};

PlayerInLeague.propTypes = {
  players: PropTypes.array,
}

export default PlayerInLeague;