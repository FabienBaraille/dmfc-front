export const usersSortByScore = (array) => {
  return array.sort((user1, user2) => (user1.Score < user2.Score) ? 1 : (user1.Score > user2.Score) ? -1 : 0)
};

export const userByName = (array, name) => {
  return array.filter((user) => user.Username === name)
};