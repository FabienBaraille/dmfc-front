export const ADD_BET_TO_LIST = 'ADD_BET_TO_LIST';
export const BET_TO_REMOVE = 'BET_TO_REMOVE';
export const TOGGLE_CREATION_MODE_BET = 'TOGGLE_CREATION_MODE_BET';
export const SET_IS_LOADING_BET = 'SET_IS_LOADING_BET';
export const GET_GAMES_ROUND = 'GET_GAMES_ROUND';
export const SET_GAMES_ROUND = 'SET_GAMES_ROUND';
export const SET_IS_PRED = 'SET_IS_PRED';
export const CREATE_BET = 'CREATE_BET';
export const UPDATE_BET = 'UPDATE_BET';
export const CREATE_ROUND = 'CREATE_ROUND';
export const SET_INPUT_VALUE_BET = 'SET_INPUT_VALUE_BET';
export const CREATE_GAME = 'CREATE_GAME';
export const DELETE_GAME = 'DELETE_GAME';
export const SET_DELETE_MESSAGE = 'SET_DELETE_MESSAGE';
export const SET_IS_LOADING_GAME = 'SET_IS_LOADING_GAME';
export const SET_IS_CREATED_MATCH = 'SET_IS_CREATED_MATCH';
export const UPDATE_GAME = 'UPDATE_GAME';
export const SET_IS_UPDATED = 'SET_IS_UPDATED';
export const GET_PREDICTION_BY_GAME = 'GET_PREDICTION_BY_GAME';
export const SET_PREDICTION_BY_GAME = 'SET_PREDICTION_BY_GAME';
export const RESET_GAME_ID = 'RESET_GAME_ID';
export const UPDATE_BET_POINTS = 'UPDATE_BET_POINTS';
export const SET_UPDATED_GAME = 'SET_UPDATED_GAME';
export const GET_ALL_PREDICTIONS = 'GET_ALL_PREDICTIONS';
export const SET_ALL_PREDICTIONS = 'SET_ALL_PREDICTIONS';
export const SET_COUNT_BET = 'SET_COUNT_BET';
export const RESET_COUNT_BET = 'RESET_COUNT_BET';
export const RESET_SCORE_UPDATE = 'RESET_SCORE_UPDATE';
export const UPDATE_PLAYER_SCORE = 'UPDATE_PLAYER_SCORE';
export const SET_UPDATED_MESSAGE = 'SET_UPDATED_MESSAGE';
export const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';
export const GET_TOP_TEN = 'GET_TOP_TEN';
export const SET_TOP_TEN = 'SET_TOP_TEN';
export const CREATE_TOP_TEN = 'CREATE_TOP_TEN';
export const UPDATE_TOP_TEN = 'UPDATE_TOP_TEN';

export const setCountUpdate = () => ({
  type: SET_COUNT_BET,
});
export const resetCountBet = () => ({
  type: RESET_COUNT_BET,
});
export const resetScoreUpdate = () => ({
  type: RESET_SCORE_UPDATE,
});

export const getPredictionByGame = (gameId) => ({
  type: GET_PREDICTION_BY_GAME,
  gameId
});
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
export const setIsPred = (predList) => ({
  type: SET_IS_PRED,
  predList 
});
export const createBet = (winningTeam, winningDif, matchId, status) => ({
  type: CREATE_BET,
  winningTeam,
  winningDif,
  matchId,
  status,
});
export const createRound = (phase) => ({
  type: CREATE_ROUND,
  phase
});
export const createGame = (date, teams) => ({
  type: CREATE_GAME,
  date,
  teams
});
export const deleteGame = (gameId) => ({
  type: DELETE_GAME,
  gameId
});
export const setDeleteMessage = (message) => ({
  type: SET_DELETE_MESSAGE,
  message
});
export const updateBet = (winningTeam, winningDif, betId, status) => ({
  type: UPDATE_BET,
  winningTeam,
  winningDif,
  betId,
  status
});
export const updateGame = (gameId, body, isUpdate = false) => ({
  type: UPDATE_GAME,
  gameId,
  body,
  isUpdate
});
export const setPredictionByGame = (predictionInfos) => ({
  type: SET_PREDICTION_BY_GAME,
  predictionInfos,
});

export const resetGameId = () => ({
  type: RESET_GAME_ID,
});
export const updateBetPoints = (betId, updateInfos) => ({
  type: UPDATE_BET_POINTS,
  betId,
  updateInfos
});
export const setUpdatedGame = (gameInfos) => ({
  type: SET_UPDATED_GAME,
  gameInfos
});
export const getAllPredictions = (playerId) => ({
  type: GET_ALL_PREDICTIONS,
  playerId
});
export const setAllPredictions = (predictionsInfos) => ({
  type: SET_ALL_PREDICTIONS,
  predictionsInfos
});
export const updatePlayerScore = (playerId, playerScore, playerOldPosition) => ({
  type: UPDATE_PLAYER_SCORE,
  playerId,
  playerScore,
  playerOldPosition
});
export const setUpdatedMessage = (message) => ({
  type: SET_UPDATED_MESSAGE,
  message
});
export const setErrorMessage = (message) => ({
  type: SET_ERROR_MESSAGE,
  message 
});

export const getTopTen = (roundId) => ({
  type: GET_TOP_TEN,
  roundId 
});
export const setTopTen = (datas) => ({
  type: SET_TOP_TEN,
  datas
});
export const createTopTen = (date) => ({
  type: CREATE_TOP_TEN,
  date
});
export const updateTopTen = (toptenId, body) => ({
  type: UPDATE_TOP_TEN,
  toptenId,
  body 
});
