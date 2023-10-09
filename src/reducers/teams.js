export const initialState = {
  favoriteTeam: '',
};

const reducer = (state = initialState, action) => {
switch (action.type) {
    case 'SAVE_FAVORITE_TEAM':
      return {
        ...state,
        favoriteTeam: action.name,
      };
    default:
      return state;
  }
};

export default reducer;
