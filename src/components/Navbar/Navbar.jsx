import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';

function Navbar() {
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
        <Link to="/profil">Profil</Link>
        <Link to="/player-bet">Bet</Link>
        <Link to="/rankings">Général Ranking</Link>
        <Link to="/">Général Stats</Link>
        <Link to="/">NBA Cheat Sheet</Link>
      </div>      
    </>
  );
}

export default Navbar;
