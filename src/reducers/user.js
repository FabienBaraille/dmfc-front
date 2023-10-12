import { SET_ERROR_MESSAGE, SET_INPUT_VALUE, SET_IS_CREATED, SET_IS_LOGGED, SET_MAIL_ERROR, SET_PASSWORD_ERROR, SET_USER_INFOS, TOGGLE_CREATION_MODE, UPDATE_USER_PROFILE } from "../actions/user";

const initialState = {
  'pseudo': '',
  'email': '',
  'password': '',
  'DMFC': false,
  'league_name': '',
  'league': 'Pas de ligue',
  'isCreationMode': false,
  'isLogged': false,
  'created': false,
  'loggedUser': {},
  'errorMessage': '',
  'team': '',
  'mailError': false,
  'passwordError': false,
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
        username: action.userData.pseudo,
        email: action.userData.email,
        password: action.userData.password,
        favoriteTeam: action.userData.favoriteTeam,
      }
    case SET_MAIL_ERROR:
      return {
        ...state,
        mailError: action.isError
      }
    case SET_PASSWORD_ERROR:
      return {
        ...state,
        passwordError: action.isError
      }
    default:
      return state;
  }
};
export default reducer;
