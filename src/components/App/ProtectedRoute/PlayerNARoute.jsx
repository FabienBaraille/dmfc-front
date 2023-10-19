import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import PropTypes from 'prop-types';

/**
 * Component that will protect the route when the user is a player not affiliated to a league
 * It will check the user role, if it's not a player not affiliated it return the component ask else it will redirect on error 403 route
 */
const PlayerNARoute = ({ children }) => {
  const userRole = useSelector((state) => state.user.loggedUser.roles[0]);
  return userRole === "ROLE_JOUEUR_NA" ? <Navigate to="/Error403" replace /> : children ? children : <Outlet />;
}

PlayerNARoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
}

export default PlayerNARoute;