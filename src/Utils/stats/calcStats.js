export const averageScore = (numberRound, winScore, bonusScore, bookieScore) => {
  return ((winScore + bonusScore + bookieScore) / numberRound);
}

export const scoreMax = (roundsList) => {
  let countMatch = 0;
  roundsList.forEach(round => {
    countMatch += round.games.length
  });
  return countMatch*5;
}

export const calcBetPoint = (updatedGame, predictedWinningTeam, predictedPointDifference, validationStatus) => {
  const {winner, visitorScore, homeScore, visitorOdd, homeOdd, team} = updatedGame;
  let teamEarnedPoints = 0;
  let diffEarnedPoints = 0;
  let bookiesEarnedPoints = 0;
  // Check the status of the pronostic
  if (validationStatus !== "Saved") {
    // If the predicted winning team is the good one -> 2 pts
    teamEarnedPoints = predictedWinningTeam === winner ? 2 : 0;
    const predictedPts = parseInt(predictedPointDifference);
    if (teamEarnedPoints !== 0) {
      // If the predicted winning team is the good one and difference points too -> 2 pts more
      diffEarnedPoints = predictedPts === Math.abs(visitorScore - homeScore) ?
      2 : 
      Math.abs(Math.abs(visitorScore - homeScore) - predictedPointDifference) <= 5 ? 1 : 0;
      if (visitorOdd !== 0 && homeOdd !== 0) {
        // If the predicted winning team is the good one and bookie ok with you -> 1 pts more
        const bookiesChoice = visitorOdd < homeOdd ? team[0].name : team[1].name;
        bookiesEarnedPoints = predictedWinningTeam === bookiesChoice ? 1 : 0;
      }
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

export const calcTopBetPoints = (predicted, status, results) => {
  let pointsEarned = 0;
  if (status !== "Saved") {
    predicted.forEach((teamId, index) => {
      if (teamId == results[index]) {
        pointsEarned ++
      }
    })
  }
  return pointsEarned;
}

export const calcScoreTop = (playerBets) => {
  let score = 0;
  playerBets.forEach((bet) => score += bet.pointsEarned);

  return score;
}