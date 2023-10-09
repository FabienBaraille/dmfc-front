import axios from 'redaxios';

import { CHECK_LOGIN, CREATE_LEAGUE, CREATE_USER, createUser, GET_USER, getUser, setErrorMessage, setIsCreated, setIsLogged, setUserInfos, UPDATE_USER_PROFILE, updateUserProfile } from "../actions/user";

import { leagueByName } from '../Utils/filters/leagueFilter';
import { roleName } from '../Utils/filters/usersFilter';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

const authMiddelware = (store) => (next) => async (action) => {
  switch (action.type) {
    case CREATE_USER: {
      const leagueId = action.leagueId ? action.leagueId : leagueByName(store.getState().datas.allLeague, store.getState().user.league);
      const roles = roleName(store.getState().user.DMFC);
      try {
        const { data } = await axios.post(
          `/api/user/new`,
          {
            username: store.getState().user.pseudo,
            email: store.getState().user.email,
            password: store.getState().user.password,
            roles: roles,
            league: leagueId,
          },
          { 
            withCredentials: false
          }
        );
        store.dispatch(setIsCreated(true));
      } catch (error) {
        store.dispatch(setErrorMessage(error.data.error));
      }
    }
    break;
    case CREATE_LEAGUE: {
      try {
        const { data } = await axios.post(
          `/api/league/new`,
          {
            leagueName: store.getState().user.league_name,
          },
          { 
            withCredentials: false
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
        const { data } = await axios.post(`/api/login_check`,
          {
            username: store.getState().user.pseudo,
            password: store.getState().user.password,
          }
        );
        store.dispatch(getUser(store.getState().user.pseudo), data.token);
      } catch (error) {
        store.dispatch(setErrorMessage('Pseudo ou Mot de passe erroné'));
      }
    }
    break;
    case GET_USER:
      try {
        const { data } = await axios.get(`/api/user/${action.username}`);
        document.cookie = `isLogged=true;max-age=60*60*24`;
        document.cookie = `userInfos=${JSON.stringify(data)};max-age=60*60*24`;
        store.dispatch(setUserInfos(data));
        store.dispatch(setIsLogged(true));
      } catch (error) {
        console.log(error);
      }
    break;

    case UPDATE_USER_PROFILE: 
    try {
      const id = store.getState().user.loggedUser.id;
      console.log(id);
      const { data } = await axios.put(`/api/user/${id}`,
        {
          username: store.getState().user.pseudo,
          email: store.getState().user.email,
          password: store.getState().user.password,
        }
      );
      store.dispatch(updateUserProfile(data));
    } catch (error) {
      console.log(error);
    }
    break;

    default:
  }

  next(action);
};

export default authMiddelware;