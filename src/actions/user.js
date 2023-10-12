export const SET_INPUT_VALUE = 'SET_INPUT_VALUE';
export const TOGGLE_CREATION_MODE = 'TOGGLE_CREATION_MODE';
export const CHECK_LOGIN = 'CHECK_LOGIN';
export const CREATE_USER = 'CREATE_USER';
export const CREATE_LEAGUE = 'CREATE_LEAGUE';
export const GET_USER = 'GET_USER';
export const GET_CURRENT_USER = 'GET_CURRENT_USER';
export const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE';
export const UPDATE_USERNAME = 'UPDATE_USERNAME';
export const SET_IS_LOGGED = 'SET_IS_LOGGED';
export const SET_IS_CREATED = 'SET_IS_CREATED';
export const SET_USER_INFOS = 'SET_USER_INFOS';
export const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';
export const SET_MAIL_ERROR = 'SET_MAIL_ERROR';
export const SET_PASSWORD_ERROR = 'SET_PASSWORD_ERROR';
export const SET_TARGET_KICK = 'SET_TARGET_KICK';
// Action to reset the store when logout
export const RESET = 'RESET';


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
  username
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
export const updateUserProfile = (userData) => ({
  type: UPDATE_USER_PROFILE,
  userData,
});
export const updateUsername = (username) => ({
  type: UPDATE_USERNAME,
  username
});
export const setMailError = (isError) => ({
  type: SET_MAIL_ERROR,
  isError
});
export const setPasswordError = (isError) => ({
  type: SET_PASSWORD_ERROR,
  isError
});
export const setTargetKick = (username) => ({
  type: SET_TARGET_KICK,
  username,
})

// Action to reset the store when logout
export const resetStore = () => ({
  type: RESET,
});
