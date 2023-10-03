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

const datasMiddleware = (store) => (next) => async (action) => {
  // Récupérer le token stocké dans le cookies en passant la clé du cookies à récupérer à la fonction
  const token = getCookies('token');
  const url = 'http://0.0.0.0:8080';
  switch (action.type) {
    // Possible d'avoir une route qui récupère les users filtrés suivant l'ID d'une league ?
    case GET_USERS_LIST:
      store.dispatch(setIsLoading());
      try {
        const { data } = await axios.get(`${url}/api/leagues/${store.getState().user.loggedUser.league_id.id}/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        store.dispatch(setUsersList(data));
      } catch (error) {
        console.log(error);
      }
    break;
    case GET_ALL_LEAGUE:
      store.dispatch(setIsLoading())
      try {
        const { data } = await axios.get(`${url}/api/leagues`, {
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
