import './Header.scss'
import dmfcLogo from '../../assets/design/dmfc-logo.png'
import clipartLogo from '../../assets/design/clipart1224.png'

function Header() {
  return (
  <header className='header'>  
    <div className="logo-one">
      <img src={dmfcLogo} alt="logo-1" />
    </div>
      <h1 className='header-title'>DMFC - Game</h1>
    <div className="logo-two">
      <img src={clipartLogo} alt="logo-2" />
    </div>
  </header>
  )
}

export default Header
