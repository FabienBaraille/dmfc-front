import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import dmfcLogo from '../../assets/design/dmfc-logo.png';
import clipartLogo from '../../assets/design/clipart1224.png';

import './Header.scss';

function Header() {
  const isLogged = useSelector((state) => state.user.isLogged);

  return (
  <header className='header'>  
    <div className="logo-one">
      <img src={dmfcLogo} alt="logo-1" />
    </div>
    <h1 className='header-title'>{isLogged ? <Link to="/">DMFC - Game</Link> : "DMFC - Game"}</h1>
    <div className="logo-two">
      <img src={clipartLogo} alt="logo-2" />
    </div>
  </header>
  )
}

export default Header
