export const leagueByName = (leaguesList, leagueName) => {
  if (leagueName === "Choisis ta ligue") {
    return null;
  }
  const leagueDescr = leaguesList.find(league => league.leagueName === leagueName);
  return leagueDescr.id;
}