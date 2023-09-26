import './Navbar.scss'
import { Link } from "react-router-dom"

function Navbar() {
  return (
    <>
        <div className="navbar">
          <Link to="/">Profil</Link>
          <Link to="/">Bet</Link>
          <Link to="/">Général Ranking</Link>
          <Link to="/">Général Stats</Link>
          <Link to="/">NBA Cheat Sheet</Link>
        </div>
    </>
  )
}

export default Navbar;
