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

import {
  GET_NEWS,
  POST_NEWS_CREATION,
  setNews,
} from '../actions/news';

const datasMiddleware = (store) => (next) => async (action) => {
  // Récupérer le token stocké dans le cookies en passant la clé du cookies à récupérer à la fonction
  const token = getCookies('token');
  switch (action.type) {
    // Action qui va faire la requête pour récupérer tous les utilisateurs d'une ligue suivant un id
    case GET_USERS_LIST:
      store.dispatch(setIsLoading());
      try {
        const { data } = await axios.get(`/api/league/${store.getState().user.loggedUser.league_id.id}/users`, {
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
        const { data } = await axios.get(`/api/leagues`, {
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
        const { data } = await axios.get(`/api/srprediction/user/${action.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        store.dispatch(setSRPrediction(data));
      } catch (error) {
        console.log(error);
      }
    break;

    // News
    // Action qui permet de mettre les news en BDD
    case POST_NEWS_CREATION:
      store.dispatch(setIsLoading());
      try {
        const { data } = await axios.post(`/api/news/new`, 
          {
            league: store.getState().user.loggedUser.league_id.id,
            title: store.getState().datas.newsTitle,
            description: store.getState().datas.news,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
      } catch (error) {
        console.log(error);
      }
    break;
    // Action pour récuperer les news en BDD
    case GET_NEWS:
      store.dispatch(setIsLoading());
      try {
        const { data } = await axios.get(`/api/league/${store.getState().user.loggedUser.league_id.id}/news`, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        store.dispatch(setNews(data[0].title, data[0].description));
      } catch (error) {
        console.log(error);
      }
    break;
    default:
}
  next(action);
};

export default datasMiddleware;
