export const averageScore = (numberRound, winScore, bonusScore, bookieScore) => {
  return ((winScore + bonusScore + bookieScore) / numberRound);
}

export const scoreMax = (roundsList) => {
  let countMatch = 0;
  roundsList.forEach(round => {
    countMatch += round.games.length
  });
  return countMatch*20;
}