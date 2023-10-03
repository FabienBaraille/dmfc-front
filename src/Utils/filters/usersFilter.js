export const usersSortByScore = (array) => {
  return array.sort((user1, user2) => (user1.score < user2.score) ? 1 : (user1.score > user2.score) ? -1 : 0)
};

export const userByUsername = (array, username) => {
  return array.filter((user) => user.username == username)
};

export const roleName = (DMFC) => {
  return DMFC ? ['ROLE_DMFC'] : ['ROLE_JOUEUR'];
};
