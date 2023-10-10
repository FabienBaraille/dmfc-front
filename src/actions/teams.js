export const SAVE_FAVORITE_TEAM = 'SAVE_FAVORITE_TEAM';

export const saveFavoriteTeam = (teamName) => ({
  type: SAVE_FAVORITE_TEAM,
  teamName,
});