import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import {
  getAllPredictions,
  getGamesRound,
  resetCountBet,
  resetScoreUpdate,
  setInputValueBet,
  setIsLoadingGame,
  setIsUpdated,
  setUpdatedMessage,
  updateBetPoints,
  updatePlayerScore
} from "../../actions/bet";

import Wrapper from "../Wrapper/Wrapper";
import GameBetResult from "./GameBetResult";
import RoundSelector from "../BetCreation/Element/RoundSelector";
import LoadElmt from "../Loader/LoadElmt";

import './BetResult.scss';
import { getUsersList } from "../../actions/datas";

const BetResult = () => {

  const dispatch = useDispatch();

  const roundNumber = useSelector((state) => state.bet.roundNumber);
  const roundsList = useSelector((state) => state.datas.rounds);
  const gamesList = useSelector((state) => state.bet.games);
  const isLoading = useSelector((state) => state.bet.isLoading);
  const isLoadingGame = useSelector((state) => state.bet.isLoadingGame);
  const isUpdated = useSelector((state) => state.bet.isUpdated);
  const predictionList = useSelector((state) => state.bet.predictionByGame);
  const updatedGame = useSelector((state) => state.bet.updatedGame);
  const countBet = useSelector((state) => state.bet.countBet);
  const allUsers = useSelector((state) => state.datas.allUsers);
  const userPlaying = allUsers.filter(({roles}) => roles.includes('ROLE_JOUEUR'));
  const countPred = useSelector((state) => state.bet.countPred);
  const allPredictions = useSelector((state) => state.bet.allPredictions);
  const updatedMessage = useSelector((state) => state.bet.updatedMessage);

  useEffect(() => {
    if (roundNumber === '') {
      dispatch(setInputValueBet('roundNumber', roundsList[roundsList.length-1].id));
      dispatch(getGamesRound(roundsList[roundsList.length-1].id));
    } else {
      dispatch(getGamesRound(roundNumber));
    }
    if (!isLoading && isUpdated === true) {
      setTimeout(() => {
        dispatch(setIsLoadingGame(true));
        calculatePoints();
        dispatch(setIsUpdated(false));
      }, 2000);
    }
    if (predictionList.length > 0 && countBet === predictionList.length) {
      userPlaying.forEach(({id}) => dispatch(getAllPredictions(id)));
      dispatch(resetCountBet());
    }
    if (allPredictions.length != 0 && userPlaying.length === countPred) {
      updateScore();
      dispatch(resetScoreUpdate());
      dispatch(setIsUpdated(false));
    }
    if (!isLoading && updatedMessage !== '') {
      dispatch(setIsLoadingGame(false));
      setTimeout(() => {
        dispatch(setUpdatedMessage(''));
        dispatch(getUsersList());
      }, 2000);
    }
  }, [roundNumber, isUpdated, countBet, countPred, updatedMessage])

  const gamesToEdit = gamesList.map(({id, ...rest}) => <GameBetResult key={id} gameId={id} {...rest} />);
  const calculatePoints = () =>  {
    const {winner, visitorScore, homeScore, visitorOdd, homeOdd, team} = updatedGame;
    predictionList.forEach(({id, predictedWinnigTeam, predictedPointDifference, validationStatus}) => {
      let teamEarnedPoints = 0;
      let diffEarnedPoints = 0;
      let bookiesEarnedPoints = 0;
      if (validationStatus !== "Saved") {
        teamEarnedPoints = predictedWinnigTeam === winner ? 10 : 0;
        const predictedPts = parseInt(predictedPointDifference);
        diffEarnedPoints = predictedPts === Math.abs(visitorScore - homeScore) ? 20 : Math.abs(Math.abs(visitorScore - homeScore) - predictedWinnigTeam) <= 5 ? 10 : 0;
        const bookiesChoice = visitorOdd > homeOdd ? team[0].name : team[1].name;
        bookiesEarnedPoints = (predictedWinnigTeam === bookiesChoice && predictedWinnigTeam === updatedGame.winner) ? 10 : 0;
      }
      dispatch(updateBetPoints(id, teamEarnedPoints, diffEarnedPoints, bookiesEarnedPoints));
    })
  }
  const updateScore = () => {
    allPredictions.forEach((userPrediction) => {
      if (userPrediction.length != 0) {
        let userScore = 0;
        userPrediction.forEach(({pointScored, bonusPointsErned, bonusBookie}) => {
          userScore += pointScored + bonusPointsErned + bonusBookie
        })
        dispatch(updatePlayerScore(userPrediction[0].User.id, userScore));
      }
    })
  }
  if (isLoading || isLoadingGame) {
    return <LoadElmt />
  }
  if (isUpdated) {
    return (
      <Wrapper>
        <h2>Match mis à jour avec succès !</h2>
        <h4>Les scores des joueurs vont maintenant être recalculés</h4>
        <h4>Merci de patienter.</h4>
      </Wrapper>
    )
  }
  if (updatedMessage !== '') {
    return (
      <Wrapper>
        <h2>{updatedMessage}</h2>
      </Wrapper>
    )
  }
  return (
    <Wrapper name="bet_result">
      <h2>Saisie des résultats</h2>
      <RoundSelector />
      {gamesToEdit}
    </Wrapper>
  )
};

export default BetResult;