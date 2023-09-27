import Wrapper from "../Wrapper/Wrapper";
import PlayerBetMatch from "./PlayerBetMatch"
import './PlayerBet.scss'

const PlayerBet = () => {
  return (
    <Wrapper>
      <div className="player_bet">
        <h2>Pronostique SR : Round 2</h2>
        <PlayerBetMatch />
        <PlayerBetMatch />
        <button type="submit">Valider mes choix</button>
      </div>
    </Wrapper>
  )
};

export default PlayerBet;