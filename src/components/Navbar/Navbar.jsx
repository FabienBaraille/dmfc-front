import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import './Navbar.scss';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const userRole = useSelector((state) => state.user.loggedUser.roles[0]);
  const username = useSelector((state) => state.user.loggedUser.username);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    if (window.innerWidth > 1050) {
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
    if (window.innerWidth <= 1050) {
      setShowMenu(false);
    }
  };

  return (
    <nav>
      <div className="hamburger" onClick={toggleMenu}>
        <div className={`icone-burger ${showMenu ? 'close' : 'open'}`}></div>
      </div>
      
      <div className={`navbar ${showMenu ? 'show-menu' : ''}`}>
        {userRole !== 'ROLE_JOUEUR_NA' && <NavLink className={({ isActive }) =>isActive ? 'menu menu--active' : 'menu'} to="/" onClick={handleLinkClick}>Accueil</NavLink> }
        <NavLink className={({ isActive }) =>isActive ? 'menu menu--active' : 'menu'} to="/profil" onClick={handleLinkClick}>Profil</NavLink>
        {userRole === 'ROLE_DMFC' && <NavLink className={({ isActive }) =>isActive ? 'menu menu--active' : 'menu'} to="/creation/SR" onClick={handleLinkClick}>Création</NavLink> }
        {userRole === 'ROLE_DMFC' && <NavLink className={({ isActive }) =>isActive ? 'menu menu--active' : 'menu'} to="/scores/SR" onClick={handleLinkClick}>Résultats</NavLink> }
        {userRole === 'ROLE_DMFC' && <NavLink className={({ isActive }) =>isActive ? 'menu menu--active' : 'menu'} to="/league-management" onClick={handleLinkClick}>Ligue</NavLink> }
        {userRole === 'ROLE_JOUEUR' && <NavLink className={({ isActive }) =>isActive ? 'menu menu--active' : 'menu'} to="/player-bet"onClick={handleLinkClick}>Prono</NavLink> }
        {userRole !== 'ROLE_JOUEUR_NA' && <NavLink className={({ isActive }) =>isActive ? 'menu menu--active' : 'menu'} to="/rankings"onClick={handleLinkClick}>Classement</NavLink> }
        {userRole === 'ROLE_JOUEUR' &&  <NavLink className={({ isActive }) =>isActive ? 'menu menu--active' : 'menu'} to={`/player/${username}`} onClick={handleLinkClick}>Statistiques</NavLink> }
        {userRole !== 'ROLE_JOUEUR_NA' && <NavLink className={({ isActive }) =>isActive ? 'menu menu--active' : 'menu'} to="/cheatsheets"onClick={handleLinkClick}>Infos NBA</NavLink> }
        <NavLink className={({ isActive }) =>isActive ? 'menu menu--active' : 'menu'} to="/logout"onClick={handleLinkClick}>Déconnexion</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
