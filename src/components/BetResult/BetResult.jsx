import Wrapper from "../Wrapper/Wrapper";
import GameBetResult from "./GameBetResult";

import './BetResult.scss';

const BetResult = () => {

  
  return (
    <Wrapper name="bet_result">
      <h2>Saisie des résultats</h2>
      <form>
        <GameBetResult />
        <GameBetResult />
        <GameBetResult />
        <button>Envoyer les résultats</button>
      </form>
    </Wrapper>
  )
};

export default BetResult;