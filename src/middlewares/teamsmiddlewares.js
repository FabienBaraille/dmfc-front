import axios from 'redaxios';

import { FETCH_TEAMS, FETCH_FAVORITE_TEAMS, saveTeams, saveFavoriteTeams } from "../actions/teams";

import { getCookies } from '../Utils/cookies/getCookies';

const teamsMiddleware = (store) => (next) => async (action) => {
  const token = getCookies('token');
  switch (action.type) {
    case FETCH_TEAMS: {
      try {
        const { data } = await axios.get(`/api/teams`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        store.dispatch(saveTeams(data));
      } catch (error) {
        console.error(error);
      }
      break;
    }

 case FETCH_FAVORITE_TEAMS: {
      try {
        const { id } = store.getState().user.team_id; 
        const { data } = await axios.put(`/api/team/${id}`, {
        team: store.getState().user.team,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      store.dispatch(saveFavoriteTeams(data));
    } catch (error) {
      console.error(error);
    }
    break;
  }

  default:
    break;
}

next(action);
};


export default teamsMiddleware;