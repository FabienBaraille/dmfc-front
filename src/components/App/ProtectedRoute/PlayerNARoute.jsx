import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import PropTypes from 'prop-types';

const PlayerNARoute = ({ children }) => {
  const userRole = useSelector((state) => state.user.loggedUser.roles[0]);
  return userRole === "ROLE_JOUEUR_NA" ? <Navigate to="/Error403" replace /> : children ? children : <Outlet />;
}

PlayerNARoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
}

export default PlayerNARoute;