export const ADD_BET_TO_LIST = 'ADD_BET_TO_LIST';
export const BET_TO_REMOVE = 'BET_TO_REMOVE';
export const TOGGLE_CREATION_MODE_BET = 'TOGGLE_CREATION_MODE_BET';

export const addBetToList = (betTpl) => ({
  type: ADD_BET_TO_LIST,
  betTpl,
});

export const betToRemove = (idToRemove) => ({
  type: BET_TO_REMOVE,
  idToRemove,
});

export const toggleCreationMode = (roundCreationMode) => ({
  type: TOGGLE_CREATION_MODE_BET,
  roundCreationMode,
});