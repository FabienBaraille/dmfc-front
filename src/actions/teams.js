export const SAVE_FAVORITE_TEAM = 'SET_FAVORITE_TEAM';

export const saveFavoriteTeam = (name) => ({
  type: SAVE_FAVORITE_TEAM,
  name,
});