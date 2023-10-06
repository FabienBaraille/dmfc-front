import axios from 'redaxios';

// Import de la fonction permettant de récupérer les cookies
import { getCookies } from "../Utils/cookies/getCookies";
import { CREATE_BET, CREATE_ROUND, GET_GAMES_ROUND, UPDATE_BET, setGamesRound, setIsLoadingBet } from '../actions/bet';
import { getRounds, getSRPrediction } from '../actions/datas';

const betMiddleware = (store) => (next) => async (action) => {
  const token = getCookies('token');
  switch (action.type) {
    case GET_GAMES_ROUND:
      store.dispatch(setIsLoadingBet(true));
      try {
        const { data } = await axios.get(`/api/games/round/${action.roundId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      store.dispatch(setIsLoadingBet(false));
      store.dispatch(getSRPrediction(store.getState().user.loggedUser.id));
    } catch (error) {
      console.log(error);
    }
    break;
    case CREATE_ROUND:{
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
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        store.dispatch(setIsLoadingBet(false));
        store.dispatch(getRounds());
      } catch (error) {
        console.log(error);
      }
    }
    break;
    default:
  }
  next(action);
};

export default betMiddleware;
