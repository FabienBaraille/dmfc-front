import Wrapper from "../Wrapper/Wrapper";
import GameBetResult from "./GameBetResult";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { getGamesRound, setInputValueBet, setIsUpdated } from "../../actions/bet";

import RoundSelector from "../BetCreation/Element/RoundSelector";
import LoadElmt from "../Loader/LoadElmt";

import './BetResult.scss';

const BetResult = () => {

  const dispatch = useDispatch();

  const roundNumber = useSelector((state) => state.bet.roundNumber);
  const roundsList = useSelector((state) => state.datas.rounds);
  const gamesList = useSelector((state) => state.bet.games);
  const isLoadingGame = useSelector((state) => state.bet.isLoadingGame);
  const isUpdated = useSelector((state) => state.bet.isUpdated);

  useEffect(() => {
    if (roundNumber === '') {
      dispatch(setInputValueBet('roundNumber', roundsList[roundsList.length-1].id));
      dispatch(getGamesRound(roundsList[roundsList.length-1].id));
    } else {
      dispatch(getGamesRound(roundNumber));
    }
    if (!isLoadingGame && isUpdated === true) {
      setTimeout(() => {
        dispatch(setIsUpdated(false));
      }, 1500);
    }
  }, [roundNumber, isUpdated])

  const gamesToEdit = gamesList.map(({id, ...rest}) => <GameBetResult key={id} gameId={id} {...rest} />)
  
  if (isLoadingGame) {
    return <LoadElmt />
  }
  if (isUpdated) {
    return (
      <Wrapper>
        <h2>Match mis à jour avec succès !</h2>
      </Wrapper>
    )
  }
  return (
    <Wrapper name="bet_result">
      <h2>Saisie des résultats</h2>
      <RoundSelector />
      {gamesToEdit}
    </Wrapper>
  )
};

export default BetResult;