import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import PropTypes from 'prop-types';

/**
 * Component that will protect the route when the user is not a player
 * It will check the user role, if it's player it return the component ask else it will redirect on error 403 route
 */
const PlayerRoute = ({ children }) => {
  const userRole = useSelector((state) => state.user.loggedUser.roles[0]);
  return userRole !== "ROLE_JOUEUR" ? <Navigate to="/Error403" replace /> : children ? children : <Outlet />;
}

PlayerRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
}

export default PlayerRoute;