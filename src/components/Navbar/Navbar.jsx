import './Navbar.scss'
import { Link } from "react-router-dom"

function Navbar() {
  return (
    <>
      <div className="navbar">
        <Link to="/">Accueil</Link>
        <Link to="/">Match SR</Link>
        <Link to="/">Top 10</Link>
        <Link to="/">Playoff</Link>
        <Link to="/">Pronostic en Cours</Link>
      </div>
    </>
  )
}

export default Navbar;
