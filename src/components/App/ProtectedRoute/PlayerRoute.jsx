import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import PropTypes from 'prop-types';

const PlayerRoute = ({ children }) => {
  const userRole = useSelector((state) => state.user.loggedUser.roles[0]);
  return userRole !== "ROLE_JOUEUR" ? <Navigate to="/Error403" replace /> : children ? children : <Outlet />;
}

PlayerRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
}

export default PlayerRoute;