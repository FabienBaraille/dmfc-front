export const predictedGame = (gameId, predictionList) => {
  const isPredict = predictionList.find(prediction => prediction.Game.id === gameId)
  return isPredict === undefined ? 'Not done' : isPredict.validationStatus;
}

export const gameById = (gameId, gamesList) => {
  return gamesList.find((game) => game.id === gameId)
}