export const SET_USERS_LIST = 'SET_USERS_LIST';
export const GET_USERS_LIST = 'GET_USERS_LIST';
export const SET_IS_LOADING = 'SET_IS_LOADING';
export const GET_ALL_LEAGUE = 'GET_ALL_LEAGUE';
export const SET_ALL_LEAGUE = 'SET_ALL_LEAGUE';

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
export const getAllLeague = () => ({
  type: GET_ALL_LEAGUE,
});
export const setAllLeague = (leaguesList) => ({
  type: SET_ALL_LEAGUE,
  leaguesList
});
