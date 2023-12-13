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
  resetIsAllGet,
  resetScoreUpdate,
  setInputValueBet,
  setIsLoadingGame,
  setIsUpdatedBet,
  setIsUpdatedResults,
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
    isUpdatedResults,
    isUpdatedBet,
    predictionByGame,
    updatedGame,
    isAllGet,
    allPredictions,
    updatedMessageScore
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
    if (!isLoading && isUpdatedResults === true) {
      toast.info('Résultats du match à jour, les scores vont être recalculés', toastInfo);
      setTimeout(() => {
        dispatch(setIsLoadingGame(true));
        calculatePoints();
        dispatch(setIsUpdatedResults(false));
      }, 2001);
    }

    // When the count for updated Bet is the same as the total number of bet made
    // Get all updated predictions
    if (predictionByGame.length > 0 && isUpdatedBet) {
      const idsList = [];
      userPlaying.forEach(({id}) => idsList.push(id));
      dispatch(getAllPredictions(JSON.stringify(idsList)));
      dispatch(setIsUpdatedBet(false));
    }
    // When the count for getting all updated predictions is the same as the total number of users
    // Continu the score calculation process
    if (allPredictions.length != 0 && isAllGet) {
      updateScore();
      dispatch(resetIsAllGet());
    }
    // Ajouter le traitement d'erreur de mise à jour
    if (updatedMessageScore !== '') {
      dispatch(setIsLoadingGame(false));
      toast.success('Scores recalculés avec succès, merci de ta patience.', toastSuccess);
      setTimeout(() => {
        dispatch(resetScoreUpdate());
        dispatch(getUsersList());
      }, 2501);
    }
  }, [roundNumber, isUpdatedResults, isUpdatedBet, isAllGet, updatedMessageScore])

  const gamesToEdit = games.map(({id, ...rest}) => <GameBetResult key={id} gameId={id} {...rest} />);

  const calculatePoints = () =>  {
    // Before starting the update, we verify if there is some predictions made for the game
    if (predictionByGame.length > 0) {
      const idsList = [];
      const pointScored = [];
      const bonusPoints = [];
      const bonusBookie = [];
      // We make a loop on the prediction array where we calculate point and update database
      predictionByGame.forEach(({id, predictedWinnigTeam, predictedPointDifference, validationStatus}) => {
        idsList.push(id);
        const updateInfos = calcBetPoint(updatedGame, predictedWinnigTeam, predictedPointDifference, validationStatus);
        pointScored.push(updateInfos.pointScored);
        bonusPoints.push(updateInfos.bonusPointsErned);
        bonusBookie.push(updateInfos.bonusBookie);
      })
      const body = {
        idsList: idsList,
        pointScore: pointScored,
        bonusPointsErned: bonusPoints,
        bonusBookie: bonusBookie
      }
      dispatch(updateBetPoints(body));
    } else {
      dispatch(setIsLoadingGame(false));
    }
  }

  const updateScore = () => {
    const idsList = [];
    const scores = [];
    const oldPositions = [];
    allPredictions.forEach((userPrediction) => {
      if (userPrediction.length != 0) {
        idsList.push(userPrediction[0].User.id);
        let userScore = 0;
        // Adding all points earned with each prediction
        userPrediction.forEach(({pointScored, bonusPointsErned, bonusBookie}) => {
          userScore += pointScored + bonusPointsErned + bonusBookie
        })
        scores.push(userScore);
        // Calculation of the user position before update
        oldPositions.push(positionFinder(userPlaying, userPrediction[0].User.id));
      }
    })
    const body = {
      idsList: idsList,
      scores: scores,
      oldPositions: oldPositions
    }
    dispatch(updatePlayerScore(body));
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