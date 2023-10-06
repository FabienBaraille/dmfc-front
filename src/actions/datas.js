export const SET_USERS_LIST = 'SET_USERS_LIST';
export const GET_USERS_LIST = 'GET_USERS_LIST';
export const SET_IS_LOADING = 'SET_IS_LOADING';
export const SET_IS_LOADING_SR = 'SET_IS_LOADING_SR';
export const GET_ALL_LEAGUE = 'GET_ALL_LEAGUE';
export const SET_ALL_LEAGUE = 'SET_ALL_LEAGUE';
export const SET_ALL_TEAMS = 'SET_ALL_TEAMS';
export const GET_ALL_TEAMS = 'SET_ALL_TEAMS'
export const GET_SR_PREDICTION = 'GET_SR_PREDICTION';
export const SET_SR_PREDICTION = 'SET_SR_PREDICTION';
export const GET_ROUNDS = 'GET_ROUNDS';
export const SET_ROUNDS = 'SET_ROUNDS';
export const GET_SEASON = 'GET_SEASON';
export const SET_SEASON = 'SET_SEASON'

export const setUsersList = (list) => ({
  type: SET_USERS_LIST,
  list,
});
export const getUsersList = () => ({
  type: GET_USERS_LIST,
});
export const setIsLoading = () => ({
  type: SET_IS_LOADING,
});
export const setIsLoadingSR = () => ({
  type: SET_IS_LOADING_SR,
});
export const getAllLeague = () => ({
  type: GET_ALL_LEAGUE,
});
export const setAllLeague = (leaguesList) => ({
  type: SET_ALL_LEAGUE,
  leaguesList
});
export const getAllTeams = () => ({
  type: GET_ALL_TEAMS,
});
export const setAllTeams = (teamsList) => ({
  type: SET_ALL_TEAMS,
  teamsList
});
export const getSRPrediction = (id) => ({
  type: GET_SR_PREDICTION,
  id
});
export const setSRPrediction = (prediction) => ({
  type: SET_SR_PREDICTION,
  prediction
});
export const getRounds = () => ({
  type: GET_ROUNDS,
});
export const setRounds = (roundsInfos) => ({
  type: SET_ROUNDS,
  roundsInfos 
});
export const getSeason = () => ({
  type: GET_SEASON,
});
export const setSeason = (seasonInfos) => ({
  type: SET_SEASON,
  seasonInfos
});
