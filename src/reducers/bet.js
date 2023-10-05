import { ADD_BET_TO_LIST, BET_TO_REMOVE, TOGGLE_CREATION_MODE_BET } from "../actions/bet";

const initialState = {
  'betList': [],
  'betNumber': 0,
  'roundCreationMode': false
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

    default:
      return state;
  }
};

export default reducer;