export const SET_INPUT_VALUE_BET = 'SET_INPUT_VALUE_BET';
export const SET_IS_PRED = 'SET_IS_PRED';
export const TOGGLE_CREATION_MODE_BET = 'TOGGLE_CREATION_MODE_BET';
export const ADD_BET_TO_LIST = 'ADD_BET_TO_LIST';
export const BET_TO_REMOVE = 'BET_TO_REMOVE';

export const setInputValueBet = (inputName, inputValue) => ({
  type: SET_INPUT_VALUE_BET,
  inputName,
  inputValue,
});
export const setIsPred = (predList) => ({
  type: SET_IS_PRED,
  predList 
});
export const toggleCreationMode = (roundCreationMode) => ({
  type: TOGGLE_CREATION_MODE_BET,
  roundCreationMode,
});
export const addBetToList = (betTpl) => ({
  type: ADD_BET_TO_LIST,
  betTpl,
});
export const betToRemove = (idToRemove) => ({
  type: BET_TO_REMOVE,
  idToRemove,
});

export const SET_IS_LOADING_BET = 'SET_IS_LOADING_BET';
export const SET_IS_LOADING_GAME = 'SET_IS_LOADING_GAME';
export const SET_IS_LOADING_TOP = 'SET_IS_LOADING_TOP';

export const setIsLoadingBet = (isLoading) => ({
  type: SET_IS_LOADING_BET,
  isLoading
});
export const setIsLoadingGame = (isLoading) => ({
  type: SET_IS_LOADING_GAME,
  isLoading
});
export const setIsLoadingTop = (isLoading) => ({
  type: SET_IS_LOADING_TOP,
  isLoading 
});

export const SET_IS_CREATED_MATCH = 'SET_IS_CREATED_MATCH';
export const SET_IS_CREATED_ROUND = 'SET_IS_CREATED_ROUND';
export const SET_IS_CREATED_TOP = 'SET_IS_CREATED_TOP';
export const SET_IS_UPDATED = 'SET_IS_UPDATED'
export const SET_IS_UPDATED_RESULTS = 'SET_IS_UPDATED_RESULTS';
export const SET_IS_UPDATED_BET = 'SET_IS_UPDATED_BET';
export const SET_IS_UPDATED_TOP = 'SET_IS_UPDATED_TOP'
export const SET_IS_DELETED = 'SET_IS_DELETED';
export const SET_IS_BET = 'SET_IS_BET';
export const RESET_IS_ALL_GET = 'RESET_IS_ALL_GET';

export const setIsCreatedMatch = (isCreated) => ({
  type: SET_IS_CREATED_MATCH,
  isCreated
});
export const setIsCreatedRound = (isCreated) => ({
  type: SET_IS_CREATED_ROUND,
  isCreated 
});
export const setIsCreatedTop = (isCreated) => ({
  type: SET_IS_CREATED_TOP,
  isCreated
});
export const setIsUpdated = (isUpdated) => ({
  type: SET_IS_UPDATED,
  isUpdated
});
export const setIsUpdatedResults = (isUpdated) => ({
  type: SET_IS_UPDATED_RESULTS,
  isUpdated
});
export const setIsUpdatedBet = (isUpdated) => ({
  type: SET_IS_UPDATED_BET,
  isUpdated
});
export const setIsUpdatedTop = (isUpdated) => ({
  type: SET_IS_UPDATED_TOP,
  isUpdated
});
export const setIsDeleted = (isDeleted) => ({
  type: SET_IS_DELETED,
  isDeleted
});
export const setIsBet = (isBet, status) => ({
  type: SET_IS_BET,
  isBet,
  status 
});
export const resetIsAllGet = () => ({
  type: RESET_IS_ALL_GET,
});

export const SET_UPDATED_GAME = 'SET_UPDATED_GAME';
export const SET_UPDATED_MESSAGE_SCORE = 'SET_UPDATED_MESSAGE_SCORE';
export const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';

export const setUpdatedGame = (gameInfos) => ({
  type: SET_UPDATED_GAME,
  gameInfos
});
export const setUpdatedMessageScore = (message) => ({
  type: SET_UPDATED_MESSAGE_SCORE,
  message
});
export const setErrorMessage = (message) => ({
  type: SET_ERROR_MESSAGE,
  message 
});

export const CREATE_ROUND = 'CREATE_ROUND';
export const UPDATE_PLAYER_SCORE = 'UPDATE_PLAYER_SCORE';

export const createRound = (phase) => ({
  type: CREATE_ROUND,
  phase
});
export const updatePlayerScore = (body) => ({
  type: UPDATE_PLAYER_SCORE,
  body
});

export const GET_GAMES_ROUND = 'GET_GAMES_ROUND';
export const SET_GAMES_ROUND = 'SET_GAMES_ROUND';
export const GET_ALL_PREDICTIONS = 'GET_ALL_PREDICTIONS';
export const SET_ALL_PREDICTIONS = 'SET_ALL_PREDICTIONS';
export const GET_PREDICTION_BY_GAME = 'GET_PREDICTION_BY_GAME';
export const SET_PREDICTION_BY_GAME = 'SET_PREDICTION_BY_GAME';
export const CREATE_GAME = 'CREATE_GAME';
export const UPDATE_GAME = 'UPDATE_GAME';
export const DELETE_GAME = 'DELETE_GAME';
export const CREATE_BET = 'CREATE_BET';
export const UPDATE_BET = 'UPDATE_BET';
export const UPDATE_BET_POINTS = 'UPDATE_BET_POINTS';
export const RESET_GAME_ID = 'RESET_GAME_ID';
export const RESET_SCORE_UPDATE = 'RESET_SCORE_UPDATE';

export const getGamesRound = (roundId) => ({
  type: GET_GAMES_ROUND,
  roundId
});
export const setGamesRound = (gamesList) => ({
  type: SET_GAMES_ROUND,
  gamesList 
});
export const getAllPredictions = (idsList) => ({
  type: GET_ALL_PREDICTIONS,
  idsList
});
export const setAllPredictions = (predictionsInfos) => ({
  type: SET_ALL_PREDICTIONS,
  predictionsInfos
});
export const getPredictionByGame = (gameId) => ({
  type: GET_PREDICTION_BY_GAME,
  gameId
});
export const setPredictionByGame = (predictionInfos) => ({
  type: SET_PREDICTION_BY_GAME,
  predictionInfos,
});
export const createGame = (date, teams) => ({
  type: CREATE_GAME,
  date,
  teams
});
export const updateGame = (gameId, body, isUpdate = false) => ({
  type: UPDATE_GAME,
  gameId,
  body,
  isUpdate
});
export const deleteGame = (gameId) => ({
  type: DELETE_GAME,
  gameId
});
export const createBet = (winningTeam, winningDif, matchId, status) => ({
  type: CREATE_BET,
  winningTeam,
  winningDif,
  matchId,
  status,
});
export const updateBet = (winningTeam, winningDif, betId, status) => ({
  type: UPDATE_BET,
  winningTeam,
  winningDif,
  betId,
  status
});
export const updateBetPoints = (body) => ({
  type: UPDATE_BET_POINTS,
  body
});
export const resetGameId = () => ({
  type: RESET_GAME_ID,
});
export const resetScoreUpdate = () => ({
  type: RESET_SCORE_UPDATE,
});

export const GET_TOP_TEN = 'GET_TOP_TEN';
export const SET_TOP_TEN = 'SET_TOP_TEN';
export const CREATE_TOP_TEN = 'CREATE_TOP_TEN';
export const UPDATE_TOP_TEN = 'UPDATE_TOP_TEN';
export const UPDATE_TOP_RESULTS = 'UPDATE_TOP_RESULTS';
export const SET_TOP_TEN_RESULTS = 'SET_TOP_TEN_RESULTS';
export const CREATE_BET_TOP = 'CREATE_BET_TOP';
export const UPDATE_BET_TOP = 'UPDATE_BET_TOP';
export const UPDATE_BET_TOP_DMFC = 'UPDATE_BET_TOP_DMFC';
export const GET_BET_TOP_BY_CONFERENCE = 'GET_BET_TOP_BY_CONFERENCE';
export const GET_BET_TOP_BY_PLAYER = 'GET_BET_TOP_BY_PLAYER';
export const SET_BET_TOP_TEN_LIST = 'SET_BET_TOP_TEN_LIST';
export const SET_IS_UPDATED_DEADLINE = 'SET_IS_UPDATED_DEADLINE';

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
export const updateTopResults = (body) => ({
  type: UPDATE_TOP_RESULTS,
  body
});
export const setTopTenResults = (data, conference) => ({
  type: SET_TOP_TEN_RESULTS,
  data,
  conference
});
export const createBetTop = (body, status) => ({
  type: CREATE_BET_TOP,
  body,
  status
});
export const updateBetTop = (betTopId, body, status) => ({
  type: UPDATE_BET_TOP,
  betTopId,
  body,
  status
});

export const updateBetTopDMFC = (body) => ({
  type: UPDATE_BET_TOP_DMFC,
  body
});
export const getBetTopByConference = (conference) => ({
  type: GET_BET_TOP_BY_CONFERENCE,
  conference
});
export const getBetTopByPlayer = (idsList) => ({
  type: GET_BET_TOP_BY_PLAYER,
  idsList 
});
export const setBetTopTenList = (datas) => ({
  type: SET_BET_TOP_TEN_LIST,
  datas
});
export const setIsUpdatedDeadline = (isUpdated) => ({
  type: SET_IS_UPDATED_DEADLINE,
  isUpdated 
});
