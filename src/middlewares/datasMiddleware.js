import axios from 'redaxios';

// Import de la fonction permettant de récupérer les cookies
import { getCookies } from "../Utils/cookies/getCookies";

import { 
  GET_USERS_LIST,
  setUsersList,
  GET_ALL_LEAGUE,
  setAllLeague,
  setIsLoading 
} from "../actions/datas";
import { findUserRole, usersFromLeague } from '../Utils/filters/usersFilter';
import { setInputValue } from '../actions/user';

const datasMiddleware = (store) => (next) => async (action) => {
  // Récupérer le token stocké dans le cookies en passant la clé du cookies à récupérer à la fonction
  const token = getCookies('token');
  switch (action.type) {
    case GET_USERS_LIST:
      store.dispatch(setIsLoading())
      try {
        const { data } = await axios.get(`http://fabien-baraille.vpnuser.lan:8080/api/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userRole = findUserRole(data, store.getState().user.pseudo);
        const usersOfLeague = usersFromLeague(data, store.getState().user.pseudo);
        document.cookie = `role=${userRole[0]};max-age=60*60*24*15`;
        store.dispatch(setInputValue('role', userRole[0]));
        store.dispatch(setUsersList(usersOfLeague));
      } catch (error) {
        console.log(error);
      }
    break;
    case GET_ALL_LEAGUE:
      store.dispatch(setIsLoading())
      try {
        const { data } = await axios.get(`http://fabien-baraille.vpnuser.lan:8080/api/leagues`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        store.dispatch(setAllLeague(data));
      } catch (error) {
        console.log(error);
      }
    break;
    default:
}
  next(action);
};

export default datasMiddleware;
