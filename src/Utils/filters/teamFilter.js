export const teamByTrigram = (array, trigram) => {
  return array.filter((team) => team.Trigram === trigram)
}

export const sortTeams = (teams, order) => {
  return order !== null ? [teams[0].id == order[0] ? teams[0] : teams[1], teams[0].id == order[1] ? teams[0] : teams[1]] : [teams[0], teams[1]];
}

export const teamLogo = (array, teamId) => {
  const team = array.find(({id}) => id == teamId);
  return team.logo;
}

export const teamsByConf = (array, conf) => {
  const newArray = [];
  array.forEach(element => {
    if (element.teams.conference === conf) {
      newArray.push(element.teams);
    }
  });
  return newArray;
}