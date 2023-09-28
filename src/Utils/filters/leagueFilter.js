export const leagueByName = (leaguesList, leagueName) => {
  const leagueDescr = leaguesList.find(league => league.leagueName === leagueName);
  return leagueDescr.id;
}