import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import PropTypes from 'prop-types';

/**
 * Component that will protect the route when the user is not a DMFC
 * It will check the user role, if it's DMFC it return the component ask else it will redirect on error 403 route
 */
const DMFCRoute = ({ children }) => {
  const userRole = useSelector((state) => state.user.loggedUser.roles[0]);
  return userRole !== "ROLE_DMFC" ? <Navigate to="/Error403" replace /> : children ? children : <Outlet />;
}

DMFCRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
}

export default DMFCRoute;