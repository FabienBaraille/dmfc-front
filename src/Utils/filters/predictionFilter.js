export const predictionByGameId = (gameId, predictionList) => {
  return predictionList.length > 0 ? predictionList.find((prediction) => prediction.Game.id === gameId) : {} ;
}