import { ADD_BET_TO_LIST, BET_TO_REMOVE, SET_GAMES_ROUND, SET_IS_LOADING_BET, TOGGLE_CREATION_MODE_BET } from "../actions/bet";

const initialState = {
  'betList': [],
  'betNumber': 0,
  'roundCreationMode': false,
  'isLoading': true,
  'games': [],
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_BET_TO_LIST:
      return {
        ...state,
        'betList': [...state.betList, action.betTpl],
        'betNumber': state.betNumber + 1
      }
      
    case BET_TO_REMOVE: 
      return {
        ...state,
        'betList': [...state.betList.filter(bet => bet.key !== action.idToRemove)]
      }
    
    case TOGGLE_CREATION_MODE_BET:
      return {
        ...state,
        'roundCreationMode': action.roundCreationMode
      }
    case SET_IS_LOADING_BET:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case SET_GAMES_ROUND:
      return {
        ...state,
        games: action.gamesList,
        isLoading: false,
      }
    default:
      return state;
  }
};

export default reducer;