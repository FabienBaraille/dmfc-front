import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Retour.scss';

function Retour ({ isLogged }) {
  return (
    <div>
      {!isLogged && (
        <button className="return-btn" type="button">
          <Link to="/login">Retour à la page de connexion</Link>
        </button>
         )}
    </div>
  );
}

Retour.propTypes = {
  isLogged: PropTypes.bool.isRequired,
};

export default Retour;