import { ADD_BET_TO_LIST, BET_TO_REMOVE } from "../actions/bet";
import { betTpl } from "../components/BetCreation/betMatch";

const initialState = {
  'betList': [betTpl],
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_BET_TO_LIST:
      return {
        ...state,
        'betList': [...state.betList, action.betTpl]
      }

    case BET_TO_REMOVE:
      console.log(state.betList);
      return {
        ...state,
        'betList': null
      }

    default:
      return state;
  }
};

export default reducer;