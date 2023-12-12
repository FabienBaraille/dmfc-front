export const predictionByGameId = (gameId, predictionList) => {
  return predictionList.length > 0 ? predictionList.find((prediction) => prediction.Game.id === gameId) : {} ;
}

export const unableBet = (currentDate, gameDate, predictionStatus) => {
  const isDeadlinePassed = currentDate > gameDate;
  if (isDeadlinePassed) {
    if (predictionStatus === 'Not done' || predictionStatus === 'Saved') {
      return 'Deadline passée';
    }
  } else {
    return 'Pronostic déjà validé' ;
  }
}

export const betByTopId = (toptens, betTop, conference) => {
  const {id} = toptens.find((topten) => topten.conference === conference);
  const betDone = betTop.find((bet) => bet.topten.id == id)
  return betDone ? betDone : {};
}