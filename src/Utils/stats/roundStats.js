export const goodPrediction = (predictionList) => {
  return predictionList.filter(({validationStatus}) => validationStatus !== 'Saved');
}
export const countRoundPlayed = (roundsList, predictionList) => {
  let count = 0;
  roundsList.forEach(({games}) => {
    let gamesCount = 0;
    if (games.length > 0) {
      games.forEach(({id}) => {
        const result = predictionList.find(({Game}) => Game.id === id);
        if (result !== undefined) {
          gamesCount ++
        }
      })
    }
    if (gamesCount > 0 ) {
      count ++
    }
  })
  return count;
}
export const countWinningTeam = (predictionList) => {
  let countWin = 0;
  predictionList.forEach(({pointScored}) => {
    if (pointScored > 0) {
      countWin += pointScored
    }
  });
  return countWin;
}
export const countBonusScore = (predictionList) => {
  let countWin = 0;
  predictionList.forEach(({bonusPointsErned}) => {
    if (bonusPointsErned > 0) {
      countWin += bonusPointsErned
    }
  });
  return countWin;
}
export const countBonusBookie = (predictionList) => {
  let countWin = 0;
  predictionList.forEach(({bonusBookie}) => {
    if (bonusBookie > 0) {
      countWin += bonusBookie
    }
  });
  return countWin;
}