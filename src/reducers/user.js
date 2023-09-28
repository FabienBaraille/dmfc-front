import { SET_INPUT_VALUE, SET_IS_LOGGED, TOGGLE_CREATION_MODE } from "../actions/user";

const initialState = {
  'pseudo': '',
  'email': '',
  'password': '',
  'DMFC': false,
  'league': '',
  'league_name': '',
  'isCreationMode': false,
  'isLogged': false,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_INPUT_VALUE:
      return {
        ...state,
        [action.inputName]: action.inputValue,
      }
    case TOGGLE_CREATION_MODE:
      return {
        ...state,
        isCreationMode: action.isCreationMode,
      }
    case SET_IS_LOGGED:
      return {
        ...state,
        isLogged: action.isLogged,
      }
    default:
      return state;
  }
};
export default reducer;
