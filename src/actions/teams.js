export const FETCH_TEAMS = 'FETCH_TEAMS';
export const FETCH_FAVORITE_TEAMS  = 'FETCH_FAVORITE_TEAMS';
export const SAVE_FAVORITE_TEAMS = 'SAVE_FAVORITE_TEAMS';

export const fetchTeams = () => ({
  type: FETCH_TEAMS,
});

export const fetchFavoriteTeams = () => ({
  type: FETCH_FAVORITE_TEAMS,
});

export const saveFavoriteTeams = (favoriteTeams) => ({
  type: SAVE_FAVORITE_TEAMS,
  favoriteTeams,
});