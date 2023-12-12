import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { toastInfo, toastSuccess } from "../Toast/ToastDMFC";


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
  updateBetPoints,
  updatePlayerScore
} from "../../actions/bet";
import { getUsersList } from "../../actions/datas";

import { positionFinder } from "../../Utils/filters/usersFilter";
import { phaseFilter } from "../../Utils/filters/roundFilter";
import { calcBetPoint } from "../../Utils/stats/calcStats";

import './BetResult.scss';

const BetResult = () => {

  const dispatch = useDispatch();

  const roundsList = phaseFilter(useSelector((state) => state.datas.rounds), 'SR');
  const {allUsers} = useSelector((state) => state.datas);

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
    countUpdate
  } = useSelector((state) => state.bet);
  
  const userPlaying = allUsers.filter(({roles}) => roles.includes('ROLE_JOUEUR'));

  useEffect(() => {
    // Check if a round is selected, if not the default round will be the last created
    if (roundNumber === '') {
      dispatch(setInputValueBet('roundNumber', roundsList[roundsList.length-1].id));
      dispatch(getGamesRound(roundsList[roundsList.length-1].id));
    } else {
      dispatch(getGamesRound(roundNumber));
    }
    // If the update of a game is ended, continu the score calculation process
    if (!isLoading && isUpdated === true) {
      toast.info('Résultats du match à jour, les scores vont être recalculés', toastInfo);
      setTimeout(() => {
        dispatch(setIsLoadingGame(true));
        calculatePoints();
        dispatch(setIsUpdated(false));
      }, 2001);
    }

    // When the count for updated Bet is the same as the total number of bet made
    // Get all updated predictions
    if (predictionByGame.length > 0 && countBet === predictionByGame.length) {
      userPlaying.forEach(({id}) => dispatch(getAllPredictions(id)));
      dispatch(resetCountBet());
    }
    // When the count for getting all updated predictions is the same as the total number of users
    // Continu the score calculation process
    if (allPredictions.length != 0 && userPlaying.length === countPred) {
      updateScore();
      dispatch(resetScoreUpdate());
      dispatch(setIsUpdated(false));
    }
    // Ajouter le traitement d'erreur de mise à jour
    if (!isLoading && countUpdate === userPlaying.length) {
      dispatch(setIsLoadingGame(false));
      toast.success('Scores recalculés avec succès, merci de ta patience.', toastSuccess);
      setTimeout(() => {
        dispatch(resetScoreUpdate());
        dispatch(getUsersList());
      }, 2501);
    }
  }, [roundNumber, isUpdated, countBet, countPred, countUpdate])

  const gamesToEdit = games.map(({id, ...rest}) => <GameBetResult key={id} gameId={id} {...rest} />);

  const calculatePoints = () =>  {
    // Before starting the update, we verify if there is some predictions made for the game
    if (predictionByGame.length > 0) {
      // We make a loop on the prediction array where we calculate point and update database
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
        // Adding all points earned with each prediction
        userPrediction.forEach(({pointScored, bonusPointsErned, bonusBookie}) => {
          userScore += pointScored + bonusPointsErned + bonusBookie
        })
        // Calculation of the user position before update
        const oldPosition = positionFinder(userPlaying, userPrediction[0].User.id);
        // Updating user score and oldPosition with an API request
        const body = {
          score: userScore,
          oldPosition: oldPosition
        }
        dispatch(updatePlayerScore(userPrediction[0].User.id, body));
      }
    })
  }

  if (isLoading || isLoadingGame) {
    return <LoadElmt />
  }

  return (
      <Wrapper name="bet_result">
        <h2>Saisie des résultats</h2>
        <p>Sélectionne le round :</p>
        <RoundSelector phase={"SR"} />
        {gamesToEdit}
      </Wrapper>
  )
};

export default BetResult;