import { Link } from 'react-router-dom';
import dmfcLogo from '../../assets/design/dmfc-logo.png';
import clipartLogo from '../../assets/design/clipart1224.png';

import './Header.scss';

function Header() {
  return (
  <header className='header'>  
    <div className="logo-one">
      <img src={dmfcLogo} alt="logo-1" />
    </div>
      <h1 className='header-title'><Link to="/">DMFC - Game</Link></h1>
    <div className="logo-two">
      <img src={clipartLogo} alt="logo-2" />
    </div>
  </header>
  )
}

export default Header
