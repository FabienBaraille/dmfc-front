import axios from 'redaxios';

// Import de la fonction permettant de récupérer les cookies
import { getCookies } from "../Utils/cookies/getCookies";
import { GET_GAMES_ROUND, setGamesRound, setIsLoadingBet } from '../actions/bet';

const betMiddleware = (store) => (next) => async (action) => {
  const token = getCookies('token');
  switch (action.type) {
    case GET_GAMES_ROUND:
      store.dispatch(setIsLoadingBet());
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
    default:
  }
  next(action);
};

export default betMiddleware;
