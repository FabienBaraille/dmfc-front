export const teamByTrigram = (array, trigram) => {
  return array.filter((team) => team.Trigram === trigram)
}