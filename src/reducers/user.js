import { SET_INPUT_VALUE } from "../actions/user";

const initialState = {
  'pseudo': '',
  'email': '',
  'password': '',
  'DMFC': false,
  'league': '',
  'token': '',
  'isLogged': false,
};

const reducer = (state = initialState, action = {}) => {
  switch (action) {
    case SET_INPUT_VALUE:
      return {
        ...state,
        [action.inputName]: action.inputValue,
      }
    default:
      return state;
  }
};

export default reducer;
