import PropTypes from 'prop-types';

import './ConfirmationPopup.scss'
import { useDispatch } from 'react-redux';
import { toggleConfirmationPopup } from '../../../actions/league';

const ConfirmationPopup = ({player}) => {
  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(toggleConfirmationPopup(false))
  }

  return (
    <div className="confirmation-box_container" onClick={handleCancel}>
      <div className="confirmation-box_content">
      <p>Voulez-vous vraiment sortir {player} de la ligue ?</p>
      <button className="confirm-button" id="confirmRefuser">Oui</button>
      <button className="cancel-button" id="cancelRefuser" onClick={handleCancel}>Annuler</button>
      </div>
    </div>
  )
};

ConfirmationPopup.propTypes = {
  player: PropTypes.string.isRequired,
};

export default ConfirmationPopup;