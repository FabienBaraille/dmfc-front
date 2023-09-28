export const usersSortByScore = (array) => {
  return array.sort((user1, user2) => (user1.score < user2.score) ? 1 : (user1.score > user2.score) ? -1 : 0)
};

export const userById = (array, id) => {
  return array.filter((user) => user.id == id)
};

export const roleName = (DMFC) => {
  return DMFC ? ['ROLE_DMFC'] : ['ROLE_JOUEUR'];
};

export const findUserRole = (usersList, userName) => {
  const userDetail = usersList.find(user => user.username === userName);
  return userDetail.roles;
}

export const usersFromLeague = (usersList, userName) => {
  const userDetail = usersList.find(user => user.username === userName);
 return usersList.filter(user => user.league.id === userDetail.league.id);
}
