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
import Page from '../Page/Page';
import EmptyBet from "./EmptyBet";

import './BetResult.scss';
import { getUsersList } from "../../actions/datas";
import { positionFinder } from "../../Utils/filters/usersFilter";
import { calcBetPoint } from "../../Utils/stats/calcStats";

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
    predictionByGame.forEach(({id, predictedWinnigTeam, predictedPointDifference, validationStatus}) => {
      const updateInfos = calcBetPoint(updatedGame, predictedWinnigTeam, predictedPointDifference, validationStatus);
      dispatch(updateBetPoints(id, updateInfos));
    })
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
    <Page>
      <Wrapper name="bet_result">
        <h2>Saisie des résultats</h2>
        <p>Sélectionner le round :</p>
        <RoundSelector />
        {gamesToEdit}
      </Wrapper>
    </Page>
  )
};

export default BetResult;