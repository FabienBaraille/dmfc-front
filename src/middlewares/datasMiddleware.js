import axios from 'redaxios';

import { 
  GET_USERS_LIST,
  GET_ALL_LEAGUE,
  GET_SR_PREDICTION,
  GET_ROUNDS,
  GET_LEAGUE,
  POST_LEAGUE_CHANGE,
  UPDATE_PLAYER_BY_DMFC,
  setUsersList,
  setAllLeague,
  setAllTeams,
  setIsLoading, 
  setSRPrediction,
  setIsLoadingSR,
  setRounds,
  setLeague,
  getLeague,
  setSeason,
  getUsersList,
  setFocusedInputId,
  GET_DATAS_START,
  setIsLoadingStart,
  GET_ALL_TEAMS,
  GET_TOPTEN_BET,
  setToptenBet,
} from "../actions/datas";

import {
  GET_NEWS,
  POST_NEWS_CHANGE,
  POST_NEWS_CREATION,
  getNews,
  setNews,
} from '../actions/news';

import { usersSortByScore } from '../Utils/filters/usersFilter';
import { setIsLoadingGame } from '../actions/bet';


const datasMiddleware = (store) => (next) => async (action) => {
  switch (action.type) {
    // Action qui va faire la requête pour récupérer tous les utilisateurs d'une ligue suivant un id
    case GET_USERS_LIST:
      store.dispatch(setIsLoading());
      try {
        const { data } = await axios.get(`/api/league/${store.getState().user.loggedUser.league_id.id}/users`);
        store.dispatch(setUsersList(usersSortByScore(data)));
      } catch (error) {
        console.log(error);
      }
    break;
    case GET_DATAS_START:
      store.dispatch(setIsLoadingStart(true));
      try {
        const [ data1, data2, data3, data4, data5, data6 ] =  await axios.all([
          axios.get(`/api/seasons/`), 
          axios.get(`/api/selections/${store.getState().user.loggedUser.league_id.id}`),
          axios.get(`/api/league/${store.getState().user.loggedUser.league_id.id}/users`),
          axios.get(`/api/league/${store.getState().user.loggedUser.league_id.id}/news`),
          axios.get(`/api/league/${store.getState().user.loggedUser.league_id.id}/round`),
          axios.get(`/api/league/${store.getState().user.loggedUser.league_id.id}`)
        ]);
        store.dispatch(setSeason(data1.data));
        store.dispatch(setAllTeams(data2.data));
        store.dispatch(setUsersList(usersSortByScore(data3.data)));
        if (data4.data.length > 0) {
          store.dispatch(setNews('newsTitle', data4.data[0].title));
          store.dispatch(setNews('news', data4.data[0].description));
          store.dispatch(setNews('newsId', data4.data[0].id));
        }
        store.dispatch(setRounds(data5.data));
        store.dispatch(setLeague('leagueName', data6.data.leagueName));
        store.dispatch(setLeague('leagueDescription', data6.data.leagueDescription));
        store.dispatch(setIsLoadingStart(false));
      } catch (error) {
        console.log(error);
      }
    break;
    case GET_ALL_TEAMS:
      store.dispatch(setIsLoadingGame(true));
      try {
        const { data } = await axios.get(`/api/selections/${store.getState().user.loggedUser.league_id.id}`);
        store.dispatch(setAllTeams(data));
        store.dispatch(setIsLoadingGame(false));
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
    // Action qui va faire la requête pour récupérer toutes les prédictions d'un joueur suivant son id
    case GET_SR_PREDICTION:
      store.dispatch(setIsLoadingSR());
      try {
        const { data } = await axios.get(`/api/srprediction/${action.id}`);
        const sortedList = usersSortByScore(data);
        store.dispatch(setSRPrediction(sortedList));
      } catch (error) {
        console.log(error);
      }
    break;
    case GET_TOPTEN_BET: {
      store.dispatch(setIsLoadingSR());
      try {
        const { data } = await axios.get(`/api/bettop/player/${action.id}`);
        store.dispatch(setToptenBet(data));
      } catch (error) {
        console.log(error);
      }
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
        store.dispatch(setNews('newsId', data.news.id));
      } catch (error) {
        console.log(error);
      }
    break;
    // Action pour récuperer une news
    case GET_NEWS:
      store.dispatch(setIsLoading());
      try {
        const { data } = await axios.get(`/api/league/${store.getState().user.loggedUser.league_id.id}/news`);
        if (data.length > 0) {
          store.dispatch(setNews('newsTitle', data[0].title));
          store.dispatch(setNews('news', data[0].description));
          store.dispatch(setNews('newsId', data[0].id));
        }
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
      store.dispatch(setLeague('leagueDescription', data.leagueDescription));
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
    // Action qui permet au DMFC de changer les infos d'un joueur
    case UPDATE_PLAYER_BY_DMFC:
      store.dispatch(setIsLoading());
      try {
        const { data } = await axios.put(`/api/user/${store.getState().datas.focusedInputId}/dmfc`,
          action.body
        );
        store.dispatch(setFocusedInputId(null))
        store.dispatch(getUsersList());
        
      } catch (error) {
        console.log(error);
      }
    break;
    default:
}
  next(action);
};

export default datasMiddleware;
