export const teamByTrigram = (array, trigram) => {
  return array.filter((team) => team.Trigram === trigram)
}

export const sortTeams = (teams, order) => {
  return [teams[0].id == order[0] ? teams[0] : teams[1], teams[0].id == order[1] ? teams[0] : teams[1]];
}