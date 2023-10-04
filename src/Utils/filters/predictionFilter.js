export const predictionByGameId = (gameId, predictionList) => {
  return predictionList.find((prediction) => prediction.Game.id === gameId);
}