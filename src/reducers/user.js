import { SET_INPUT_VALUE, TOGGLE_CREATION_MODE } from "../actions/user";

const initialState = {
  'pseudo': '',
  'email': '',
  'password': '',
  'DMFC': false,
  'league': '',
  'token': '',
  'isLogged': false,
  'isCreationMode': false,
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
        'isCreationMode': action.isCreationMode,
      }
    default:
      return state;
  }
};

export default reducer;