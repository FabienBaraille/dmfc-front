import './Footer.scss'
import { Link } from "react-router-dom"
function Footer() {
  return (
    <>
      <div className="footer">
        <Link to="/">DMFC Rules</Link>
        <Link to="/">Conditions Générales</Link>
      </div>
    </>
  )
}

export default Footer;
