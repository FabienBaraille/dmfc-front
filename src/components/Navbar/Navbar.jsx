import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
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

  const handleLinkClick = () => {
    if (window.innerWidth <= 1000) {
      setShowMenu(false);
    }
  };

  return (
    <nav>
      <div className="hamburger" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      <div className={`navbar ${showMenu ? 'show-menu' : ''}`}>
        <NavLink className={({ isActive }) =>isActive ? 'menu menu--active' : 'menu'} to="/profil" onClick={handleLinkClick}>Profil</NavLink>
        <NavLink className={({ isActive }) =>isActive ? 'menu menu--active' : 'menu'} to="/creation/SR"onClick={handleLinkClick}>Bet</NavLink>
        <NavLink className={({ isActive }) =>isActive ? 'menu menu--active' : 'menu'} to="/rankings"onClick={handleLinkClick}>Général Ranking</NavLink>
        <NavLink className={({ isActive }) =>isActive ? 'menu menu--active' : 'menu'} to="/stats"onClick={handleLinkClick}>Général Stats</NavLink>
        <NavLink className={({ isActive }) =>isActive ? 'menu menu--active' : 'menu'} to="/nba-infos"onClick={handleLinkClick}>NBA Cheat Sheet</NavLink>
      </div>      
      </nav>
  );
}

export default Navbar;
