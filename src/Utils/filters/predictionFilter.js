export const predictionByGameId = (gameId, predictionList) => {
  return predictionList.length > 0 ? predictionList.find((prediction) => prediction.Game.id === gameId) : {} ;
}

export const unableBet = (currentDate, gameDate, predictionStatus) => {
  const isDeadlinePassed = currentDate > gameDate;
  if (isDeadlinePassed) {
    if (predictionStatus === 'Not done' || predictionStatus === 'Saved') {
      return 'Trop tard pour le pronostique';
    }
  } else {
    return 'Pronostique déjà validé' ;
  }
}