import { SET_ERROR_MESSAGE, SET_INPUT_VALUE, SET_IS_CREATED, SET_IS_LOGGED, SET_USER_INFOS, TOGGLE_CREATION_MODE, UPDATE_USER_PROFILE } from "../actions/user";

const initialState = {
  'pseudo': '',
  'email': '',
  'password': '',
  'DMFC': false,
  'league': '',
  'league_name': '',
  'isCreationMode': false,
  'isLogged': false,
  'role': '',
  'created': false,
  'loggedUser': {},
  'errorMessage': '',
  'team': '',
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
    case SET_IS_CREATED:
      return {
        ...state,
        created: action.isCreated,
      }
    case SET_USER_INFOS:
      return {
        ...state,
        loggedUser: action.loggedUser,
      }
    case SET_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.message,
      }
    case UPDATE_USER_PROFILE:
      return {
        ...state,
        ...action.userData,
      }
    default:
      return state;
  }
};
export default reducer;
