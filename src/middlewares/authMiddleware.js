import axios from 'redaxios';

import { CHECK_LOGIN, CREATE_USER, setIsCreated, setIsLogged } from "../actions/user";
import { leagueByName } from '../Utils/filters/leagueFilter';
import { roleName } from '../Utils/filters/usersFilter';

const authMiddelware = (store) => (next) => async (action) => {
  switch (action.type) {
    case CHECK_LOGIN: {
      try {
        const { data } = await axios.post(
          // adresse pour Charli et Quentin remplacer 0.0.0.0 par fabien-baraille.vpnuser.lan
          // Demandez moi pour que je démarre le serveur ;)
          // login : QuentinR  mdp : test
          'http://fabien-baraille.vpnuser.lan:8080/api/login_check',
          {
          username: store.getState().user.pseudo,
          password: store.getState().user.password,
        });
        document.cookie = `isLogged=true;max-age=60*60*24*15`;
        document.cookie = `userName=${store.getState().user.pseudo};max-age=60*60*24*15`;
        document.cookie = `token=${data.token};max-age=60*60*24*15`;
        store.dispatch(setIsLogged(true));
      } catch (error) {
        console.log(error.data.errors);
      }
    }
    break;
    case CREATE_USER: {
      console.log(store.getState().datas.allLeague)
      const leagueId = leagueByName(store.getState().datas.allLeague, store.getState().user.league);
      const roles = roleName(store.getState().user.DMFC);
      try {
        const response = await axios.post(
          'http://fabien-baraille.vpnuser.lan:8080/api/login',
          {
            username: store.getState().user.pseudo,
            email: store.getState().user.email,
            password: store.getState().user.password,
            roles: roles,
            league: leagueId,
          }
        )
        store.dispatch(setIsCreated(true));
        // console.log('response', response);
      } catch (error) {
        console.log(error);
      }
    }
    break;
    default:
  }
  next(action);
};

export default authMiddelware;


// Création de compte
// http://0.0.0.0:8080/api/login
/* body {
  username:
  password:
  email:
  roles: []
  league_id:

} */