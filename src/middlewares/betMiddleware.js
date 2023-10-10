import axios from 'redaxios';

// Import de la fonction permettant de récupérer les cookies
import { 
  CREATE_BET,
  CREATE_GAME,
  CREATE_ROUND,
  GET_GAMES_ROUND,
  GET_PREDICTION_BY_GAME,
  UPDATE_BET,
  UPDATE_BET_POINTS,
  UPDATE_GAME,
  getPredictionByGame,
  setGamesRound,
  setIsCreatedMatch,
  setIsLoadingBet,
  setIsLoadingGame,
  setPredictionByGame,
  setUpdatedGame,
  toggleCreationMode
} from '../actions/bet';
import { getRounds, getSRPrediction } from '../actions/datas';

const betMiddleware = (store) => (next) => async (action) => {
  switch (action.type) {
    case GET_GAMES_ROUND:
      store.dispatch(setIsLoadingBet(true));
      try {
        const { data } = await axios.get(`/api/games/round/${action.roundId}`);
        store.dispatch(setGamesRound(data));
      } catch (error) {
        console.log(error);
      }
    break;
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
    case CREATE_ROUND: {
      store.dispatch(setIsLoadingBet(true));
      try {
        const { data } = await axios.post(`/api/round/new`,
          {
            season: {
              id: store.getState().datas.allSeasons[store.getState().datas.allSeasons.length - 1].id,
              year:store.getState().datas.allSeasons[store.getState().datas.allSeasons.length - 1].year,
            },
            name: store.getState().bet.roundName,
            category: store.getState().bet.roundCat,
            user_id: store.getState().user.loggedUser.id,
            league_id: store.getState().user.loggedUser.league_id.id
          }
        );
        store.dispatch(setIsLoadingBet(false));
        store.dispatch(getRounds());
        store.dispatch(toggleCreationMode(false));
      } catch (error) {
        console.log(error);
      }
    }
    break;
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
    case UPDATE_GAME: {
      store.dispatch(setIsLoadingGame(true));
      try {
        const { data } = await axios.put(`/api/game/${action.gameId}`,
          {
            homeScore: action.homeScore,
            visitorScore: action.visitorScore,
            homeOdd: action.homeOdd,
            visitorOdd: action.visitorOdd,
            winner: action.winner
          }
        );
        store.dispatch(setUpdatedGame(data.game));
        store.dispatch(getPredictionByGame(action.gameId));
      } catch (error) {
        console.log(error);
      }
    }
    break;
    case GET_PREDICTION_BY_GAME:
      store.dispatch(setIsLoadingGame(true));
      try {
        const { data } = await axios.get(`/api/game/${action.gameId}/srprediction`);
        store.dispatch(setPredictionByGame(data));
      } catch (error) {
        console.log(error);
      }
    break;
    case UPDATE_BET_POINTS:
      store.dispatch(setIsLoadingGame(true));
      try {
        const { data } = await axios.put(`/api/prediction/${action.betId}/dmfc`,
          {
            pointScored: action.winningPoints,
            bonusPointsErned: action.difPoints,
            bonusBookie: action.bookiesPoints
          }
        );
        store.dispatch(setIsLoadingGame(false));
      } catch (error) {
        console.log(error);
      }
    break;
    default:
  }
  next(action);
};

export default betMiddleware;
