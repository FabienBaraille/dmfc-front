// import {
//   FETCH_FAVORITE_TEAMS,
//   FETCH_TEAMS,
//   saveFavoriteTeams,

// } from '../actions/teams';

// import data from '../../data/data'; 

// const teamsMiddleware = (store) => (next) => (action) => {
//   switch (action.type) {
//     case FETCH_TEAMS:
//       const teamsData = data.Teams;
//       store.dispatch((teamsData));
//       break;

//     case FETCH_FAVORITE_TEAMS:
//       const favoriteTeamsData = [];
//       store.dispatch(saveFavoriteTeams(favoriteTeamsData));
//       break;

//       default:
//       }
    
//       next(action);
//     };
    
//     export default teamsMiddleware;