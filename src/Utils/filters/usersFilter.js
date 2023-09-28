export const usersSortByScore = (array) => {
  return array.sort((user1, user2) => (user1.score < user2.score) ? 1 : (user1.score > user2.score) ? -1 : 0)
};

export const userById = (array, id) => {
  return array.filter((user) => user.id == id)
};