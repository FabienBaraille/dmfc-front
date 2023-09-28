import Wrapper from "../Wrapper/Wrapper";
import PlayerBetMatch from "./PlayerBetMatch"
import './PlayerBet.scss'

const PlayerBet = () => {
  return (
    <Wrapper name="player_bet">
    <h2>Pronostique SR : Round 2</h2>
      <div className="player_bet">
        <PlayerBetMatch number="1" />
        <PlayerBetMatch number="2" />
        <PlayerBetMatch number="3" />
        <PlayerBetMatch number="4" />
        <PlayerBetMatch number="5" />
        <PlayerBetMatch number="6" />
      </div>
      <button type="submit">Valider mes choix</button>
    </Wrapper>
  )
};

export default PlayerBet;