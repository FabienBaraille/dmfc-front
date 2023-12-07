import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import LoadElmt from "../Loader/LoadElmt";
import Wrapper from "../Wrapper/Wrapper";
import PlayerBetMatchSR from "./PlayerBetMatchSR";

import { getGamesRound } from "../../actions/bet";
import { getSRPrediction } from "../../actions/datas";

import { predictedGame } from "../../Utils/filters/gamesFilter";
import { predictionByGameId } from "../../Utils/filters/predictionFilter";
import { phaseFilter } from "../../Utils/filters/roundFilter";

import './PlayerBetSR.scss';

const PlayerBetSR = () => {

  const dispatch = useDispatch();

  const loggedUserId = useSelector((state) => state.user.loggedUser.id);
  const rounds = phaseFilter(useSelector((state) => state.datas.rounds), 'SR');
  const isLoadingBet = useSelector((state) => state.bet.isLoading);
  const isLoadingSR = useSelector((state) => state.datas.isLoadingSR);
  const gamesOfRound = useSelector((state) => state.bet.games);
  const predictionsList = useSelector((state) => state.datas.SRPrediction);
  
  useEffect(() => {
    dispatch(getGamesRound(rounds[rounds.length-1].id));
    dispatch(getSRPrediction(loggedUserId));
  }, [])
  
  const betList = gamesOfRound.map(({ id, ...rest}) => {
    const predictStatus = predictedGame(id, predictionsList);
    const prediction = predictionByGameId(id, predictionsList);
    return <PlayerBetMatchSR key={id} id={id} {...rest} predictStatus={predictStatus} prediction={prediction} />;
  })
  
  if (isLoadingSR || isLoadingBet) {
    return <LoadElmt />
  }
  return (
    <Wrapper name="player_bet">
      <h2>Pronostics SR</h2>
      <h2>{`${rounds[rounds.length-1].name}`}</h2>
      <div className="player_bet">
        {betList}
      </div>
    </Wrapper>
  )
};

export default PlayerBetSR;
