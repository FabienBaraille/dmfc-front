import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import './Navbar.scss';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const userRole = useSelector((state) => state.user.role);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    if (window.innerWidth > 768) {
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
    if (window.innerWidth <= 768) {
      setShowMenu(false);
    }
  };

  return (
    <nav>
      <div className="hamburger" onClick={toggleMenu}>
        <div className={`icone-burger ${showMenu ? 'close' : 'open'}`}></div>
      </div>

      <div className={`navbar ${showMenu ? 'show-menu' : ''}`}>
        <NavLink className={({ isActive }) =>isActive ? 'menu menu--active' : 'menu'} to="/" onClick={handleLinkClick}>Home</NavLink>
        <NavLink className={({ isActive }) =>isActive ? 'menu menu--active' : 'menu'} to="/profil" onClick={handleLinkClick}>Profil</NavLink>
        {userRole === 'ROLE_DMFC' && <NavLink className={({ isActive }) =>isActive ? 'menu menu--active' : 'menu'} to="/creation/SR" onClick={handleLinkClick}>Création matchs</NavLink> }
        {userRole === 'ROLE_DMFC' && <NavLink className={({ isActive }) =>isActive ? 'menu menu--active' : 'menu'} to="/scores/SR" onClick={handleLinkClick}>Résultats</NavLink> }
        {userRole === 'ROLE_JOUEUR' && <NavLink className={({ isActive }) =>isActive ? 'menu menu--active' : 'menu'} to="/player-bet"onClick={handleLinkClick}>Bet</NavLink> }
        <NavLink className={({ isActive }) =>isActive ? 'menu menu--active' : 'menu'} to="/rankings"onClick={handleLinkClick}>Général Ranking</NavLink>
        {/* {userRole === 'ROLE_JOUEUR' &&  <NavLink className={({ isActive }) =>isActive ? 'menu menu--active' : 'menu'} to="/stats"onClick={handleLinkClick}>Général Stats</NavLink> } */}
        {/* <NavLink className={({ isActive }) =>isActive ? 'menu menu--active' : 'menu'} to="/nba-infos"onClick={handleLinkClick}>NBA Cheat Sheet</NavLink> */}
        <NavLink className={({ isActive }) =>isActive ? 'menu menu--active' : 'menu'} to="/logout"onClick={handleLinkClick}>Déconnexion</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
