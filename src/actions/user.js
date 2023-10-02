export const SET_INPUT_VALUE = 'SET_INPUT_VALUE';
export const CHECK_LOGIN = 'CHECK_LOGIN';
export const TOGGLE_CREATION_MODE = 'TOGGLE_CREATION_MODE';
export const CREATE_USER = 'CREATE_USER';
export const SET_IS_LOGGED = 'SET_IS_LOGGED';
export const SET_IS_CREATED = 'SET_IS_CREATED';
export const CREATE_LEAGUE = 'CREATE_LEAGUE'

export const setInputValue = (inputName, inputValue) => ({
  type: SET_INPUT_VALUE,
  inputName,
  inputValue,
});
export const checkLogin = () => ({
  type: CHECK_LOGIN,
});
export const createUser = (leagueId = null) => ({
  type: CREATE_USER,
  leagueId
});
export const toggleCreationMode = (isCreationMode) => ({
  type: TOGGLE_CREATION_MODE,
  isCreationMode,
});
export const setIsLogged = (isLogged) => ({
  type: SET_IS_LOGGED,
  isLogged 
});
export const setIsCreated = (isCreated) => ({
  type: SET_IS_CREATED,
  isCreated
});
export const createLeague = () => ({
  type: CREATE_LEAGUE,
});
