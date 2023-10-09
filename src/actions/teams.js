export const SAVE_FAVORITE_TEAM = 'SET_FAVORITE_TEAM';

export const saveFavoriteTeam = (teamName) => ({
  type: SAVE_FAVORITE_TEAM,
  teamName,
});