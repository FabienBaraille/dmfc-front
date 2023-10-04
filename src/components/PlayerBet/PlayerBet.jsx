import { useDispatch, useSelector } from "react-redux";

import LoadElmt from "../Loader/LoadElmt";
import Wrapper from "../Wrapper/Wrapper";
import PlayerBetMatch from "./PlayerBetMatch";

import './PlayerBet.scss';
import { useEffect } from "react";
import { getGamesRound } from "../../actions/bet";
import { getSRPrediction } from "../../actions/datas";
import { predictedGame } from "../../Utils/filters/gamesFilter";
import { predictionByGameId } from "../../Utils/filters/predictionFilter";

const PlayerBet = () => {

  const dispatch = useDispatch();

  const loggedUserId = useSelector((state) => state.user.loggedUser.id);
  const rounds = useSelector((state) => state.datas.rounds);
  const isLoadingBet = useSelector((state) => state.bet.isLoading);
  const isLoadingSR = useSelector((state) => state.datas.isLoadingSR);
  const gamesOfRound = useSelector((state) => state.bet.games);
  const predictionsList = useSelector((state) => state.datas.SRPrediction);

  const betList = gamesOfRound.map(({ id, ...rest}) => {
    const predictStatus = predictedGame(id, predictionsList);
    const prediction = predictionsList.length !== 0 ? predictionByGameId(id, predictionsList) : {};
    return <PlayerBetMatch key={id} id={id} {...rest} predictStatus={predictStatus} userId={loggedUserId} prediction={prediction} />;
  })

  useEffect(() => {
    dispatch(getGamesRound(rounds.length));
    dispatch(getSRPrediction(loggedUserId));
  }, [])

  if (isLoadingSR || isLoadingBet) {
    return <LoadElmt />
  }
  return (
    <Wrapper name="player_bet">
    <h2>{`Pronostique SR : Round ${rounds.length}`}</h2>
      <div className="player_bet">
        {betList}
      </div>
    </Wrapper>
  )
};

export default PlayerBet;