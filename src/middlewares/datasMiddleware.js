import axios from 'redaxios';

// Import de la fonction permettant de récupérer les cookies
import { getCookies } from "../Utils/cookies/getCookies";

import { 
  GET_USERS_LIST,
  setUsersList,
  GET_ALL_LEAGUE,
  setAllLeague,
  setIsLoading, 
  GET_SR_PREDICTION,
  setSRPrediction,
  setIsLoadingSR
} from "../actions/datas";

const datasMiddleware = (store) => (next) => async (action) => {
  // Récupérer le token stocké dans le cookies en passant la clé du cookies à récupérer à la fonction
  const token = getCookies('token');
  const url = 'http://0.0.0.0:8080';
  switch (action.type) {
    // Action qui va faire la requête pour récupérer tous les utilisateurs d'une ligue suivant un id
    case GET_USERS_LIST:
      store.dispatch(setIsLoading());
      try {
        const { data } = await axios.get(`${url}/api/league/${store.getState().user.loggedUser.league_id.id}/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        store.dispatch(setUsersList(data));
      } catch (error) {
        console.log(error);
      }
    break;
    // Action qui va faire la requête pour récupérer toutes les leagues
    case GET_ALL_LEAGUE:
      store.dispatch(setIsLoading());
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
    // Action qui va faire la requête pour récupérer toutes les prédictions d'un joueur suivant son id
    case GET_SR_PREDICTION:
      store.dispatch(setIsLoadingSR());
      try {
        const { data } = await axios.get(`${url}/api/srprediction/user/${action.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        store.dispatch(setSRPrediction(data));
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    break;
    default:
}
  next(action);
};

export default datasMiddleware;
