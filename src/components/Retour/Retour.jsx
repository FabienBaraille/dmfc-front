import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Retour.scss';

function Retour ({ where, link }) {
  return (
    <div>
      <button className="return-btn" type="button">
        <Link to={link}>{`Retour ${where}`}</Link>
      </button>
    </div>
  );
}

Retour.propTypes = {
  where: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default Retour;