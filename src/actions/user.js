export const SET_INPUT_VALUE = 'SET_INPUT_VALUE';
export const CHECK_LOGIN = 'CHECK_LOGIN';
export const TOGGLE_CREATION_MODE = 'TOGGLE_CREATION_MODE';
export const CREATE_USER = 'CREATE_USER';
export const SET_IS_LOGGED = 'SET_IS_LOGGED'

export const setInputValue = (inputName, inputValue) => ({
  type: SET_INPUT_VALUE,
  inputName,
  inputValue,
});
export const checkLogin = () => ({
  type: CHECK_LOGIN,
});
export const createUser = () => ({
  type: CREATE_USER,
});
export const toggleCreationMode = (isCreationMode) => ({
  type: TOGGLE_CREATION_MODE,
  isCreationMode,
});
export const setIsLogged = (isLogged) => ({
  type: SET_IS_LOGGED,
  isLogged
});
