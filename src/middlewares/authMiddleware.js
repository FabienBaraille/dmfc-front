import axios from 'redaxios';

import { CHECK_LOGIN, CREATE_LEAGUE, CREATE_USER, createUser, GET_USER, getUser, setErrorMessage, setIsCreated, setIsLogged, setUserInfos } from "../actions/user";

import { leagueByName } from '../Utils/filters/leagueFilter';
import { roleName } from '../Utils/filters/usersFilter';
import { getCookies } from '../Utils/cookies/getCookies';

const authMiddelware = (store) => (next) => async (action) => {
  const url = 'http://0.0.0.0:8080';
  const token = getCookies('token');
  switch (action.type) {
      case CREATE_USER: {
      const leagueId = action.leagueId ? action.leagueId : leagueByName(store.getState().datas.allLeague, store.getState().user.league);
      const roles = roleName(store.getState().user.DMFC);
      try {
        const { data } = await axios.post(
          `${url}/api/user/new`,
          {
            username: store.getState().user.pseudo,
            email: store.getState().user.email,
            password: store.getState().user.password,
            roles: roles,
            league: leagueId,
          }
        )
        store.dispatch(setIsCreated(true));
      } catch (error) {
        store.dispatch(setErrorMessage(error.data.error));
      }
    }
    break;
    case CREATE_LEAGUE: {
      try {
        const { data } = await axios.post(
          `${url}/api/leagues/new`,
          {
            leagueName: store.getState().user.league_name,
          }
        )
        store.dispatch(createUser(data.id));
      } catch (error) {
        store.dispatch(setErrorMessage(error.data.error));
      }
    }
    break;
    case CHECK_LOGIN: {
      try {
        const { data } = await axios.post(
          // Perso http://0.0.0.0:8080
          // adresse pour Charli et Quentin remplacer http://fabien-baraille.vpnuser.lan:8080
          // adresse QuentinR http://quentin-riviere.vpnuser.lan:8000
          // adresse Maxime maxime-lemarchand.vpnuser.lan
          // Demandez moi pour que je démarre le serveur ;)
          `${url}/api/login_check`,
          {
          username: store.getState().user.pseudo,
          password: store.getState().user.password,
        });
        document.cookie = `token=${data.token};max-age=60*60*24`;
        store.dispatch(getUser(store.getState().user.pseudo), data.token);
      } catch (error) {
        store.dispatch(setErrorMessage('Pseudo ou Mot de passe erroné'));
      }
    }
    break;
    case GET_USER:
      try {
        const { data } = await axios.get(`${url}/api/user/${action.username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        document.cookie = `isLogged=true;max-age=60*60*24`;
        document.cookie = `userInfos=${JSON.stringify(data)};max-age=60*60*24`;
        store.dispatch(setUserInfos(data));
        store.dispatch(setIsLogged(true));
      } catch (error) {
        console.log(error);
      }
    break;
    default:
  }
  next(action);
};

export default authMiddelware;