export const SET_INPUT_VALUE = 'SET_INPUT_VALUE';
export const TOGGLE_CREATION_MODE = 'TOGGLE_CREATION_MODE';

export const CHECK_LOGIN = 'CHECK_LOGIN';

export const CREATE_USER = 'CREATE_USER';
export const CREATE_LEAGUE = 'CREATE_LEAGUE';
export const GET_USER = 'GET_USER';

export const SET_IS_LOGGED = 'SET_IS_LOGGED';
export const SET_IS_CREATED = 'SET_IS_CREATED';
export const SET_USER_INFOS = 'SET_USER_INFOS';
export const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE'

export const setInputValue = (inputName, inputValue) => ({
  type: SET_INPUT_VALUE,
  inputName,
  inputValue,
});
export const toggleCreationMode = (isCreationMode) => ({
  type: TOGGLE_CREATION_MODE,
  isCreationMode,
});

export const checkLogin = () => ({
  type: CHECK_LOGIN,
});
export const createUser = (leagueId = null) => ({
  type: CREATE_USER,
  leagueId
});
export const createLeague = () => ({
  type: CREATE_LEAGUE,
});
export const getUser = (username) => ({
  type: GET_USER,
  username,
});

export const setIsLogged = (isLogged) => ({
  type: SET_IS_LOGGED,
  isLogged 
});
export const setIsCreated = (isCreated) => ({
  type: SET_IS_CREATED,
  isCreated
});
export const setUserInfos = (loggedUser) => ({
  type: SET_USER_INFOS,
  loggedUser
});
export const setErrorMessage = (message) => ({
  type: SET_ERROR_MESSAGE,
  message,
});
