export const SET_INPUT_VALUE = 'SET_INPUT_VALUE';
export const CHECK_LOGIN = 'CHECK_LOGIN'

export const setInputValue = (inputName, inputValue) => ({
  type: SET_INPUT_VALUE,
  inputName,
  inputValue,
});

export const checkLogin = () => ({
  type: CHECK_LOGIN,
});

