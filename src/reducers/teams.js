export const initialState = {
  favoriteTeam: '',
};

const reducer = (state = initialState, action) => {
switch (action.type) {
    case 'SAVE_FAVORITE_TEAM':
      return {
        ...state,
        favoriteTeam: action.teamName,
      };
    default:
      return state;
  }
};

export default reducer;
