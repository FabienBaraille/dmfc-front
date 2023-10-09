import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { getGamesRound, setInputValueBet, setIsUpdated, updateBetPoints } from "../../actions/bet";

import Wrapper from "../Wrapper/Wrapper";
import GameBetResult from "./GameBetResult";
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
  const predictionList = useSelector((state) => state.bet.predictionByGame);
  const updatedGame = useSelector((state) => state.bet.updatedGame);

  useEffect(() => {
    if (roundNumber === '') {
      dispatch(setInputValueBet('roundNumber', roundsList[roundsList.length-1].id));
      dispatch(getGamesRound(roundsList[roundsList.length-1].id));
    } else {
      dispatch(getGamesRound(roundNumber));
    }
    if (!isLoadingGame && isUpdated === true) {
      setTimeout(() => {
        calculatePoints()
        dispatch(setIsUpdated(false));
      }, 1500);
    }
  }, [roundNumber, isUpdated])

  const gamesToEdit = gamesList.map(({id, ...rest}) => <GameBetResult key={id} gameId={id} {...rest} />);
  const calculatePoints = () =>  {
    const {winner, visitorScore, homeScore, visitorOdd, homeOdd, team} = updatedGame;
    predictionList.forEach(({id, predictedWinnigTeam, predictedPointDifference}) => {
      const teamEarnedPoints = predictedWinnigTeam === winner ? 10 : 0;
      const predictedPts = parseInt(predictedPointDifference);
      const diffEarnedPoints = predictedPts === Math.abs(visitorScore - homeScore) ? 20 : Math.abs(Math.abs(visitorScore - homeScore) - predictedWinnigTeam) <= 5 ? 10 : 0;
      const bookiesChoice = visitorOdd > homeOdd ? team[0].name : team[1].name;
      const bookiesEarnedPoints = (predictedWinnigTeam === bookiesChoice && predictedWinnigTeam === updatedGame.winner) ? 10 : 0;
      dispatch(updateBetPoints(id, teamEarnedPoints, diffEarnedPoints, bookiesEarnedPoints));
    })
  }
  
  if (isLoadingGame) {
    return <LoadElmt />
  }
  if (isUpdated) {
    return (
      <Wrapper>
        <h2>Match mis à jour avec succès !</h2>
        <h2>Les scores des joueurs vont maintenant être recalculés</h2>
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