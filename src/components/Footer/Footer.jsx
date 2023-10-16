import './Footer.scss'
import { Link } from "react-router-dom"
function Footer() {
  return (
    <>
      <div className="footer">
        <Link to="/rules">DMFC Rules</Link>
        <Link to="/cheatsheets">Cheat Sheets</Link>
        <Link to="/terms-and-conditions">Conditions Générales</Link>
      </div>
    </>
  )
}

export default Footer;
