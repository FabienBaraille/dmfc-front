import axios from 'redaxios';

import { CHECK_LOGIN, setIsLogged } from "../actions/user";

const authMiddelware = (store) => (next) => async (action) => {
  switch (action.type) {
    case CHECK_LOGIN: {
      try {
        const { data } = await axios.post('http://localhost:3001/login', {
          username: store.getState().user.pseudo,
          password: store.getState().user.password,
        });
        console.log(data);
        store.dispatch(setIsLogged(true));
      } catch (error) {
        console.log(error)
      }
    }
    break;
    default:
  }
  next(action);
};

export default authMiddelware;
