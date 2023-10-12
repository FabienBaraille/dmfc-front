import PropTypes from 'prop-types';

import './Modal.scss'
import { useDispatch, useSelector } from 'react-redux';
import { toggleConfirmationModal } from '../../../actions/league';
import { setFocusedInputId } from '../../../actions/datas';

const Modal = ({player}) => {
  const dispatch = useDispatch();

  const modalFunction = useSelector((state) => state.datas.modalFunction);

  const handleCancel = () => {
    // dispatch(setFocusedInputId(null))
    dispatch(setFocusedInputId(null)) 
    dispatch(toggleConfirmationModal(false))
  }

  const handleAccept = () => {
    dispatch(modalFunction)
    dispatch(toggleConfirmationModal(false))
  }

  return (
    <>
      <div className="modal-box_container" onClick={handleCancel} />
      <div className="modal-box_content">
        <p>Voulez-vous vraiment sortir {player} de la ligue ?</p>
        <button className="confirm-button" id="confirmRefuser" onClick={handleAccept}>Oui</button>
        <button className="cancel-button" id="cancelRefuser" onClick={handleCancel}>Annuler</button>
      </div>
    </>
  )
};

Modal.propTypes = {
  player: PropTypes.string.isRequired,
};

export default Modal;

// Ajouter une fonction optionnelle qui sera géré dans les composants et passer en parametres pour le bouton de validation