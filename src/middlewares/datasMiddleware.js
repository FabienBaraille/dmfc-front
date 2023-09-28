// import axios from 'redaxios';

// import { getCookies } from "../Utils/cookies/getCookies";

import { 
  GET_USERS_LIST,
  setUsersList,
  GET_ALL_LEAGUE,
  setAllLeague,
  setIsLoading 
} from "../actions/datas";

import data from '../data/data';

const datasMiddleware = (store) => (next) => async (action) => {
  // const token = getCookies('token');
  switch (action.type) {
    case GET_USERS_LIST:
      store.dispatch(setIsLoading())
      try {
        // const { data } = await axios.get(`http://maxime-lemarchand.vpnuser.lan:8001/api/league/${action.id}/users`);
        // store.dispatch(setUsersList(data));
        store.dispatch(setUsersList(data.User));
      } catch (error) {
        console.log(error);
      }
    break;
    case GET_ALL_LEAGUE:
      store.dispatch(setIsLoading())
      try {
        // const { data } = await axios.get('http://maxime-lemarchand.vpnuser.lan:8001/api/leagues');
        // store.dispatch(setAllLeague(data));
        store.dispatch(setAllLeague(data.League));
      } catch (error) {
        console.log(error);
      }
    break;
    default:
}
  next(action);
};

export default datasMiddleware;
