import { useDispatch, useSelector } from "react-redux";

import LoadElmt from "../Loader/LoadElmt";
import Wrapper from "../Wrapper/Wrapper";
import PlayerBetMatch from "./PlayerBetMatch";

import './PlayerBet.scss';
import { useEffect } from "react";
import { getGamesRound } from "../../actions/bet";

const PlayerBet = () => {

  const dispatch = useDispatch();

  const rounds = useSelector((state) => state.datas.rounds);
  const isLoading = useSelector((state) => state.bet.isLoading);
  const gamesOfRound = useSelector((state) => state.bet.games);

  const betList = gamesOfRound.map(({ id, ...rest}) => <PlayerBetMatch key={id} id={id} {...rest} />)

  useEffect(() => {
    dispatch(getGamesRound(rounds.length));
  }, [])

  if (isLoading) {
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