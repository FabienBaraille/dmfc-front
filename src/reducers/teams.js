import { SAVE_FAVORITE_TEAMS, SAVE_TEAMS } from '../actions/teams';

export const initialState = {
  list: [],

  favorites: [],

  isTeamsLoaded: false,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_TEAMS:
      return {
        ...state,
        list: action.teams,
     
        isTeamsLoaded: true,
      };

    case SAVE_FAVORITE_TEAMS:
      return {
        ...state,
        favorites: action.favoriteTeams,
      };

    default:
      return state;
  }
};

export default reducer;
