/* eslint-disable no-unused-vars */
import axios from 'redaxios';

import { 
  CREATE_BET,
  CREATE_GAME,
  CREATE_ROUND,
  CREATE_TOP_TEN,
  DELETE_GAME,
  GET_ALL_PREDICTIONS,
  GET_GAMES_ROUND,
  GET_PREDICTION_BY_GAME,
  GET_TOP_TEN,
  UPDATE_BET,
  UPDATE_BET_POINTS,
  UPDATE_GAME,
  UPDATE_PLAYER_SCORE,
  UPDATE_TOP_TEN,
  getPredictionByGame,
  setAllPredictions,
  setCountUpdate,
  setDeleteMessage,
  setErrorMessage,
  setGamesRound,
  setInputValueBet,
  setIsCreatedMatch,
  setIsLoadingBet,
  setIsLoadingGame,
  setIsPred,
  setIsUpdated,
  setPredictionByGame,
  setTopTen,
  setUpdatedGame,
  setUpdatedMessage,
  toggleCreationMode
} from '../actions/bet';

import { getRounds, getSRPrediction } from '../actions/datas';

const betMiddleware = (store) => (next) => async (action) => {
  switch (action.type) {
    /**
     * Action to create a round by the DMFC
     */
    case CREATE_ROUND: {
      store.dispatch(setIsLoadingGame(true));
      try {
        const { data } = await axios.post(`/api/round/new`,
          {
            season: store.getState().datas.allSeasons[store.getState().datas.allSeasons.length - 1].id,
            name: store.getState().bet.roundName,
            category: action.phase,
            user: store.getState().user.loggedUser.id,
            league: store.getState().user.loggedUser.league_id.id
          }
        );
        store.dispatch(setIsLoadingGame(false));
        store.dispatch(getRounds());
        store.dispatch(toggleCreationMode(false));
      } catch (error) {
        console.log(error);
      }
    }
    break;
    /**
     * Action to create a match by the DMFC
     */
    case CREATE_GAME: {
      store.dispatch(setIsLoadingGame(true));
      try {
        const { data } = await axios.post(`/api/game/new`,
          {
            dateAndTimeOfMatch : action.date,
            round : store.getState().bet.roundNumber,
            teams : action.teams,
          }
        );
        store.dispatch(setIsLoadingGame(false));
        store.dispatch(setIsCreatedMatch(true));
      } catch (error) {
        console.log(error);
      }
    }
    break;
    /**
     * Action to update the score of a match by the DMFC
     */
    case UPDATE_GAME: {
      !action.isUpdate ? store.dispatch(setIsLoadingBet(true)) : store.dispatch(setIsLoadingGame(true));
      try {
        const { data } = await axios.put(`/api/game/${action.gameId}`,
         action.body
        );
        if (!action.isUpdate) {
          store.dispatch(setUpdatedGame(data.game));
          store.dispatch(getPredictionByGame(action.gameId));
        } else {
          store.dispatch(setDeleteMessage(data.message));
        }
      } catch (error) {
        console.log(error);
      }
    }
    break;
    /**
     * Action to delete a match
     */
    case DELETE_GAME: {
      store.dispatch(setIsLoadingGame(true));
      try {
        const { data } = await axios.delete(`/api/game/${action.gameId}`);
        store.dispatch(setDeleteMessage(data.message));
      } catch (error) {
        store.dispatch(setDeleteMessage(error.data.message));
      }
    }
    break;
    /**
     * Action to get all games infos by a round ID
     */
    case GET_GAMES_ROUND:
      store.dispatch(setIsLoadingBet(true));
      try {
        const { data } = await axios.get(`/api/games/round/${action.roundId}`);
        store.dispatch(setGamesRound(data[0]));
        store.dispatch(setIsPred(data[1]));
      } catch (error) {
        console.log(error);
      }
    break;
    case GET_TOP_TEN:
      store.dispatch(setIsLoadingGame(true));
      try {
        const { data } = await axios.get(`/api/topten/round/${action.roundId}`);
        store.dispatch(setTopTen(data));
        if (data.length !== 0) {
          store.dispatch(setInputValueBet('toptenDate', data[0].deadline.slice(0, 16)))
        } else {
          store.dispatch(setInputValueBet('toptenDate', ''))
        }
      } catch (error) {
        console.log(error);
      }
    break;
    case CREATE_TOP_TEN:{
      store.dispatch(setIsLoadingGame(true));
      try {
        const { data } = await axios.post(`/api/topten/new`,
          {
            round : store.getState().bet.roundNumber,
            deadline : action.date,
          }
        );
        store.dispatch(setTopTen(data));
        store.dispatch(setIsCreatedMatch(true));
      } catch (error) {
        console.log(error);
      }
    }
    break;
    case UPDATE_TOP_TEN: {
      store.dispatch(setIsLoadingGame(true));
      try {
        const { data } = await axios.put(`/api/topten/${action.toptenId}`, 
          action.body
        )
        store.dispatch(setIsLoadingGame(false));
      } catch (error) {
        console.log(error);
      }
    }
    break;
    /**
     * Action to create et bet made by a player
     */
    case CREATE_BET:
      store.dispatch(setIsLoadingBet(true));
      try {
        const { data } = await axios.post(`/api/srprediction/new`,
          {
            gameId: action.matchId,
            validation_status: action.status,
            predicted_winnig_team: action.winningTeam,
            predicted_point_difference: action.winningDif,
            point_scored: 0,
            bonus_points_erned: 0,
            bonus_bookie: 0,
          }
        );
        store.dispatch(setIsLoadingBet(false));
        store.dispatch(getSRPrediction(store.getState().user.loggedUser.id));
      } catch (error) {
        console.log(error);
      }
    break;
    /**
     * Action to update a bet by a player
     */
    case UPDATE_BET:
      store.dispatch(setIsLoadingBet(true));
      try {
        const { data } = await axios.put(`/api/prediction/update/${action.betId}`,
          {
            validation_status: action.status,
            predicted_winnig_team: action.winningTeam,
            predicted_point_difference: action.winningDif,
          }
        );
        store.dispatch(setIsLoadingBet(false));
        store.dispatch(getSRPrediction(store.getState().user.loggedUser.id));
      } catch (error) {
        console.log(error);
      }
    break;
        /**
     * Action to get all predictions done for a match
     */
    case GET_PREDICTION_BY_GAME:
      store.dispatch(setIsLoadingBet(true));
      try {
        const { data } = await axios.get(`/api/game/${action.gameId}/srprediction`);
        store.dispatch(setPredictionByGame(data));
      } catch (error) {
        console.log(error);
      }
    break;
    /**
     * Action to update the points earned with a bet
     */
    case UPDATE_BET_POINTS:
      store.dispatch(setIsLoadingBet(true));
      try {
        const { data } = await axios.put(`/api/prediction/${action.betId}/dmfc`,
          action.updateInfos,
        );
        store.dispatch(setCountUpdate());
        store.dispatch(setIsLoadingBet(false));
      } catch (error) {
        store.dispatch(setErrorMessage(error.data.message));
      }
    break;
    /**
     * Action to get all predictions made by a player
     */
    case GET_ALL_PREDICTIONS:
      store.dispatch(setIsLoadingBet(true));
      try {
        const { data } = await axios.get(`/api/srprediction/${action.playerId}`);
        store.dispatch(setAllPredictions(data));
      } catch (error) {
        store.dispatch(setErrorMessage(error.data.message));
      }
    break;
    /**
     * Action to update player score and oldPosition
     */
    case UPDATE_PLAYER_SCORE:
      store.dispatch(setIsLoadingBet(true));
      try {
        const { data } = await axios.put(`/api/user/${action.playerId}/dmfc`,
          {
            score: action.playerScore,
            oldPosition: action.playerOldPosition,
          }
        );
        store.dispatch(setUpdatedMessage(data.message));
        store.dispatch(setIsLoadingBet(false));
      } catch (error) {
        store.dispatch(setErrorMessage(error.data.message));
      }
    break;
    default:
  }
  next(action);
};

export default betMiddleware;
