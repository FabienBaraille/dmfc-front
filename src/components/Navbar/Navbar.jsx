import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './Navbar.scss';

const Navbar = ({ userRole }) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    if (window.innerWidth > 1000) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', closeMenu);
    return () => {
      window.removeEventListener('resize', closeMenu);
    };
  }, []);

  return (
    <>
      <div className="hamburger" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      <div className={`navbar ${showMenu ? 'show-menu' : ''}`}>
        <Link to="/">Home</Link>
        <Link to="/profil">Profil</Link>
        {userRole === 'ROLE_JOUEUR' && <Link to="/player-bet">Bet</Link>}
        {userRole === 'ROLE_DMFC' && <Link to="/creation/SR">Création matchs</Link>}
        {userRole === 'ROLE_DMFC' && <Link to="/scores/SR">Score matchs</Link>}
        <Link to="/rankings">Général Ranking</Link>
        {userRole === 'ROLE_JOUEUR' && <Link to="/">Général Stats</Link>}
        {/* <Link to="/">NBA Cheat Sheet</Link> */}
        <Link to="/logout">Déconnexion</Link>
      </div>
    </>
  );
}

Navbar.propTypes = {
  userRole: PropTypes.string,
}

export default Navbar;
