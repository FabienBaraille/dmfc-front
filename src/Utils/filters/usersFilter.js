export const usersSortByScore = (array) => {
  return array.sort((user1, user2) => (user1.score < user2.score) ? 1 : (user1.score > user2.score) ? -1 : 0)
};

export const userByUsername = (array, username) => {
  return array.filter((user) => user.username == username)
};

export const positionFinder = (usersList, userId) => {
  let position = 0;
  usersList.forEach(({id}, index) => {
    // For each user of the global list we check the given id
    if (id === userId) {
      position = index;
    }
  });
  return position + 1;
}

export const verifyMail = (mail) => {
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return !regex.test(mail);
}

export const verifyPassword = (password) => {
  const regex = /^(?:(?=.*[a-z])(?:(?=.*[A-Z])(?=.*[\d\W])|(?=.*\W)(?=.*\d))|(?=.*\W)(?=.*[A-Z])(?=.*\d)).{8,}$/;
  return !regex.test(password);
}

