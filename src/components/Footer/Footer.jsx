import { Link } from "react-router-dom";

import './Footer.scss';

const Footer = () => {
  return (
    <>
      <div className="footer">
        <Link to="/rules">DMFC Rules</Link>
        <Link to="/terms-and-conditions">Conditions Générales</Link>
      </div>
    </>
  )
}

export default Footer;
