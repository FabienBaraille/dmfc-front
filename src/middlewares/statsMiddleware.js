import { GET_USERS_LIST, setIsLoading, setUsersList } from "../actions/stats";


import data from '../data/data';

const statsMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case GET_USERS_LIST:
      store.dispatch(setIsLoading())
      try {
        store.dispatch(setUsersList(data.User));
      } catch (error) {
        console.log(error);
      }
    break;
    default:
}
  next(action);
};

export default statsMiddleware;
