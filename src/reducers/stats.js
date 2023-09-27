import { SET_IS_LOADING, SET_USERS_LIST } from '../actions/stats';

const initialState = {
  'allUsers': [],
  'isLoading': true,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_USERS_LIST:
      return {
        ...state,
        allUsers: action.list,
        isLoading: false,
      }
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: true,
      }
    default:
      return state;
  }
};

export default reducer;