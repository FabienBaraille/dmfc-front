import PropTypes from 'prop-types';

import './Modal.scss'
import { useDispatch } from 'react-redux';
import { toggleConfirmationModal } from '../../../actions/league';

const Modal = ({player}) => {
  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(toggleConfirmationModal(false))
  }

  return (
    <>
      <div className="modal-box_container" onClick={handleCancel} />
      <div className="modal-box_content">
        <p>Voulez-vous vraiment sortir {player} de la ligue ?</p>
        <button className="confirm-button" id="confirmRefuser">Oui</button>
        <button className="cancel-button" id="cancelRefuser" onClick={handleCancel}>Annuler</button>
      </div>
    </>
  )
};

Modal.propTypes = {
  player: PropTypes.string.isRequired,
};

export default Modal;