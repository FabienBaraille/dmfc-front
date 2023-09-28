import Wrapper from "../Wrapper/Wrapper";
import PlayerBetMatch from "./PlayerBetMatch"
import './PlayerBet.scss'

const PlayerBet = () => {
  return (
    <Wrapper name="player_bet">
    <h2>Pronostique SR : Round 2</h2>
      <div className="player_bet">
        <PlayerBetMatch />
      </div>
      <button type="submit">Valider mes choix</button>
    </Wrapper>
  )
};

export default PlayerBet;