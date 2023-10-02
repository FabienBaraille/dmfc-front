import {
  FETCH_FAVORITE_TEAMS,
  FETCH_TEAMS,
  saveTeams,
  saveFavoriteTeams,

} from '../actions/teams';


import data from '../../data/data'; 

const teamsMiddleware = (store) => (next) => (action) => {

  let teamsData;
  let favoriteTeamsData;

  switch (action.type) {
    case FETCH_TEAMS:
      teamsData = data.Teams;
      store.dispatch(saveTeams(teamsData));
      break;

    case FETCH_FAVORITE_TEAMS:
      favoriteTeamsData = []; 
      store.dispatch(saveFavoriteTeams(favoriteTeamsData));
      break;

      default:
      }
    
      next(action);
    };
    
    export default teamsMiddleware;