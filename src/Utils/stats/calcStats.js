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

export const calcBetPoint = (updatedGame, predictedWinnigTeam, predictedPointDifference, validationStatus) => {
  const {winner, visitorScore, homeScore, visitorOdd, homeOdd, team} = updatedGame;
  let teamEarnedPoints = 0;
  let diffEarnedPoints = 0;
  let bookiesEarnedPoints = 0;
  if (validationStatus !== "Saved") {
    teamEarnedPoints = predictedWinnigTeam === winner ? 10 : 0;
    const predictedPts = parseInt(predictedPointDifference);
    diffEarnedPoints = predictedPts === Math.abs(visitorScore - homeScore) ? 20 : Math.abs(Math.abs(visitorScore - homeScore) - predictedWinnigTeam) <= 5 ? 10 : 0;
    if (visitorOdd !== 0 && homeOdd !== 0) {
      const bookiesChoice = visitorOdd > homeOdd ? team[0].name : team[1].name;
      bookiesEarnedPoints = (predictedWinnigTeam === bookiesChoice && predictedWinnigTeam === updatedGame.winner) ? 10 : 0;
    }
  }
  
  return {
    pointScored: teamEarnedPoints,
    bonusPointsErned: diffEarnedPoints,
    bonusBookie: bookiesEarnedPoints
  }
}

export const calcActualPosition = (playerList, playerName) => {
  let actualPosition = 0;
  playerList.forEach(({username}, index) => {
    if (username === playerName) {
      actualPosition = index + 1;
    }
  });
  return actualPosition;
}