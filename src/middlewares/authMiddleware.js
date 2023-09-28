import axios from 'redaxios';

import { CHECK_LOGIN, setIsLogged } from "../actions/user";

const authMiddelware = (store) => (next) => async (action) => {
  switch (action.type) {
    case CHECK_LOGIN: {
      try {
        // http://quentin-riviere.vpnuser.lan:8001/api/login
        const { data } = await axios.post('http://quentin-riviere.vpnuser.lan:8001/api/login_check', {
          username: store.getState().user.pseudo,
          password: store.getState().user.password,
        });
        console.log(data)
        document.cookie = `isLogged=${data.logged};max-age=60*60*24*15`;
        // document.cookie = `role=${data.Role};max-age=60*60*24*15`;
        // document.cookie = `token=${data.token};max-age=60*60*24*15`;
        store.dispatch(setIsLogged(data.logged));
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
