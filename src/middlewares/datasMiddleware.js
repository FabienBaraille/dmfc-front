import axios from 'redaxios';

import { 
  GET_USERS_LIST,
  setUsersList,
  GET_ALL_LEAGUE,
  setAllLeague,
  GET_ALL_TEAMS,
  setAllTeams,
  setIsLoading, 
  GET_SR_PREDICTION,
  setSRPrediction,
  setIsLoadingSR,
  GET_ROUNDS,
  setRounds,
  GET_LEAGUE,
  setLeague,
  POST_LEAGUE_CHANGE,
  getLeague,
  GET_SEASON,
  setSeason
} from "../actions/datas";

import {
  GET_NEWS,
  POST_NEWS_CHANGE,
  POST_NEWS_CREATION,
  getNews,
  setNews,
} from '../actions/news';

const datasMiddleware = (store) => (next) => async (action) => {
  switch (action.type) {
    // Action qui va faire la requête pour récupérer tous les utilisateurs d'une ligue suivant un id
    case GET_USERS_LIST:
      store.dispatch(setIsLoading());
      try {
        const { data } = await axios.get(`/api/league/${store.getState().user.loggedUser.league_id.id}/users`);
        store.dispatch(setUsersList(data));
      } catch (error) {
        console.log(error);
      }
    break;
    // Action qui va faire la requête pour récupérer toutes les leagues
    case GET_ALL_LEAGUE:
      store.dispatch(setIsLoading());
      try {
        const { data } = await axios.get(`/api/leagues`,
          {
            withCredentials: false
          }
        );
        store.dispatch(setAllLeague(data));
      } catch (error) {
        console.log(error);
      }
    break;
    // Action qui va faire la requête pour récupérer toutes les teams
    case GET_ALL_TEAMS:
      store.dispatch(setIsLoading())
      try {
        const { data } = await axios.get(`/api/teams`);
        store.dispatch(setAllTeams(data));
        } catch (error) {
          console.log(error);
        }
      break;
    // Action qui va faire la requête pour récupérer toutes les prédictions d'un joueur suivant son id
    case GET_SR_PREDICTION:
      store.dispatch(setIsLoadingSR());
      try {

        const { data } = await axios.get(`/api/srprediction/${action.id}`);
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
          }
        );
      } catch (error) {
        console.log(error);
      }
    break;
    // Action pour récuperer une news
    case GET_NEWS:
      store.dispatch(setIsLoading());
      try {
        const { data } = await axios.get(`/api/league/${store.getState().user.loggedUser.league_id.id}/news`);
        store.dispatch(setNews('newsTitle', data[0].title));
        store.dispatch(setNews('news', data[0].description));
        store.dispatch(setNews('newsId', data[0].id));
      } catch (error) {
        console.log(error);
      }
    break;
    // Action qui permet de modifier une news
    case POST_NEWS_CHANGE:
      store.dispatch(setIsLoading());
      try {
        const { data } = await axios.put(`/api/news/${store.getState().datas.newsId}`,
          {
            league: store.getState().user.loggedUser.league_id.id,
            title: store.getState().datas.newsTitle,
            description: store.getState().datas.news,
          }
        );
        store.dispatch(getNews());
      } catch (error) {
        console.log(error);
      }
    break;
    case GET_ROUNDS:
      store.dispatch(setIsLoadingSR());
      try {
        const { data } = await axios.get(`/api/league/${store.getState().user.loggedUser.league_id.id}/round`);
      store.dispatch(setRounds(data));
      } catch (error) {
        console.log(error);
      }
    break;
    // Action qui permet de récuperer toutes les infos d'une league avec son id
    case GET_LEAGUE:
      store.dispatch(setIsLoading());
      try {
        const { data } = await axios.get(`/api/league/${store.getState().user.loggedUser.league_id.id}`);
      store.dispatch(setLeague('leagueName', data.leagueName));
      store.dispatch(setLeague('leagueDescription', data.leagueDescription))
      } catch (error) {
        console.log(error);
      }
    break;
    // Action qui va faire la requête pour récupérer toutes les leagues
    case GET_SEASON:
      store.dispatch(setIsLoading());
      try {
        const { data } = await axios.get(`/api/seasons/`);
        store.dispatch(setSeason(data));
        } catch (error) {
          console.log(error);
        }
      break;
    // Action qui permet de modifier une league
    case POST_LEAGUE_CHANGE:
      store.dispatch(setIsLoading());
      try {
        const { data } = await axios.put(`/api/leagues/${store.getState().user.loggedUser.league_id.id}`,
          {
            leagueName: store.getState().datas.leagueName,
            leagueDescription: store.getState().datas.leagueDescription,
          }
        );
        store.dispatch(getLeague());
      } catch (error) {
        console.log(error);
      }
    break;
    default:
}
  next(action);
};

export default datasMiddleware;
