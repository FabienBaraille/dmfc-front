export const ADD_BET_TO_LIST = 'ADD_BET_TO_LIST';
export const BET_TO_REMOVE = 'BET_TO_REMOVE';
export const TOGGLE_CREATION_MODE_BET = 'TOGGLE_CREATION_MODE_BET';
export const SET_IS_LOADING_BET = 'SET_IS_LOADING_BET';
export const GET_GAMES_ROUND = 'GET_GAMES_ROUND';
export const SET_GAMES_ROUND = 'SET_GAMES_ROUND';
export const CREATE_BET = 'CREATE_BET';
export const UPDATE_BET = 'UPDATE_BET';
export const CREATE_ROUND = 'CREATE_ROUND';
export const SET_INPUT_VALUE_BET = 'SET_INPUT_VALUE_BET';
export const CREATE_GAME = 'CREATE_GAME';
export const SET_IS_LOADING_GAME = 'SET_IS_LOADING_GAME';
export const SET_IS_CREATED_MATCH = 'SET_IS_CREATED_MATCH';
export const UPDATE_GAME = 'UPDATE_GAME';
export const SET_IS_UPDATED = 'SET_IS_UPDATED';

export const setIsLoadingBet = (isLoading) => ({
  type: SET_IS_LOADING_BET,
  isLoading
});
export const setIsLoadingGame = (isLoading) => ({
  type: SET_IS_LOADING_GAME,
  isLoading
});
export const setIsCreatedMatch = (isCreated) => ({
  type: SET_IS_CREATED_MATCH,
  isCreated
});
export const setInputValueBet = (inputName, inputValue) => ({
  type: SET_INPUT_VALUE_BET,
  inputName,
  inputValue,
});
export const setIsUpdated = (isUpdated) => ({
  type: SET_IS_UPDATED,
  isUpdated
});

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

export const getGamesRound = (roundId) => ({
  type: GET_GAMES_ROUND,
  roundId
});
export const setGamesRound = (gamesList) => ({
  type: SET_GAMES_ROUND,
  gamesList 
});
export const createBet = (winningTeam, winningDif, matchId, status) => ({
  type: CREATE_BET,
  winningTeam,
  winningDif,
  matchId,
  status,
});
export const createRound = () => ({
  type: CREATE_ROUND,
});
export const createGame = (date, teams) => ({
  type: CREATE_GAME,
  date,
  teams
});

export const updateBet = (winningTeam, winningDif, betId, status) => ({
  type: UPDATE_BET,
  winningTeam,
  winningDif,
  betId,
  status
});
export const updateGame = (gameId, visitorScore, homeScore, visitorOdd, homeOdd) => ({
  type: UPDATE_GAME,
  gameId,
  visitorScore,
  homeScore,
  visitorOdd,
  homeOdd
});
