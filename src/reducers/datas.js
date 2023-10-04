import { SET_ALL_LEAGUE, SET_IS_LOADING, SET_IS_LOADING_SR, SET_ROUNDS, SET_SR_PREDICTION, SET_USERS_LIST } from '../actions/datas';

const initialState = {
  'allUsers': [],
  'allLeague': [],
  'isLoading': true,
  'SRPrediction': [],
  'isLoadingSR': true,
  'rounds': [],
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_USERS_LIST:
      return {
        ...state,
        allUsers: action.list,
        isLoading: false,
      }
    case SET_ALL_LEAGUE:
      return {
        ...state,
        allLeague: action.leaguesList,
        isLoading: false,
      }
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: true,
      }
    case SET_IS_LOADING_SR:
      return {
        ...state,
        isLoadingSR: true,
      }
    case SET_SR_PREDICTION:
      return {
        ...state,
        SRPrediction: action.prediction,
        isLoadingSR: false,
      }
    case SET_ROUNDS:
      return {
        ...state,
        rounds: action.roundsInfos,
        isLoading: false,
      }
    default:
      return state;
  }
};

export default reducer;