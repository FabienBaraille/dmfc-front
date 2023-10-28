import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Wrapper from "../Wrapper/Wrapper";
import GameBetResult from "./GameBetResult";
import RoundSelector from "../BetCreation/Element/RoundSelector";
import LoadElmt from "../Loader/LoadElmt";

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
import { getUsersList } from "../../actions/datas";

import { positionFinder } from "../../Utils/filters/usersFilter";
import { calcBetPoint } from "../../Utils/stats/calcStats";

import './BetResult.scss';

const BetResult = () => {

  const dispatch = useDispatch();

  const roundsList = useSelector((state) => state.datas.rounds);
  const allUsers = useSelector((state) => state.datas.allUsers);

  const {
    roundNumber,
    games,
    isLoading,
    isLoadingGame,
    isUpdated,
    predictionByGame,
    updatedGame,
    countBet,
    countPred,
    allPredictions,
    updatedMessage
  } = useSelector((state) => state.bet);
  
  const userPlaying = allUsers.filter(({roles}) => roles.includes('ROLE_JOUEUR'));

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
    if (predictionByGame.length > 0 && countBet === predictionByGame.length) {
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

  const gamesToEdit = games.map(({id, ...rest}) => <GameBetResult key={id} gameId={id} {...rest} />);

  const calculatePoints = () =>  {
    // Before starting the update, we verify if there is prediction made for the game
    if (predictionByGame.length > 0) {
      // we made a loop on the prediction array where we calculate point and update database
      predictionByGame.forEach(({id, predictedWinnigTeam, predictedPointDifference, validationStatus}) => {
        const updateInfos = calcBetPoint(updatedGame, predictedWinnigTeam, predictedPointDifference, validationStatus);
        // Action dispatch to update database with an API request
        dispatch(updateBetPoints(id, updateInfos));
      })
    } else {
      dispatch(setIsLoadingGame(false));
    }
  }

  const updateScore = () => {
    allPredictions.forEach((userPrediction) => {
      if (userPrediction.length != 0) {
        let userScore = 0;
        userPrediction.forEach(({pointScored, bonusPointsErned, bonusBookie}) => {
          userScore += pointScored + bonusPointsErned + bonusBookie
        })
        const oldPosition = positionFinder(userPlaying, userPrediction[0].User.id);
        dispatch(updatePlayerScore(userPrediction[0].User.id, userScore, oldPosition));
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
        <p>Sélectionne le round :</p>
        <RoundSelector />
        {gamesToEdit}
      </Wrapper>
  )
};

export default BetResult;