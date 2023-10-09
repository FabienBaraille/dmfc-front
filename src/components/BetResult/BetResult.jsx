import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { getGamesRound, setInputValueBet, setIsUpdated, updateBetPoints } from "../../actions/bet";

import Wrapper from "../Wrapper/Wrapper";
import GameBetResult from "./GameBetResult";
import RoundSelector from "../BetCreation/Element/RoundSelector";
import LoadElmt from "../Loader/LoadElmt";

import { gameById } from "../../Utils/filters/gamesFilter";

import './BetResult.scss';

const BetResult = () => {

  const dispatch = useDispatch();

  const roundNumber = useSelector((state) => state.bet.roundNumber);
  const roundsList = useSelector((state) => state.datas.rounds);
  const gamesList = useSelector((state) => state.bet.games);
  const isLoadingGame = useSelector((state) => state.bet.isLoadingGame);
  const isUpdated = useSelector((state) => state.bet.isUpdated);
  const predictionList = useSelector((state) => state.bet.predictionByGame);
  const gameId = useSelector((state) => state.bet.gameId);

  useEffect(() => {
    if (roundNumber === '') {
      dispatch(setInputValueBet('roundNumber', roundsList[roundsList.length-1].id));
      dispatch(getGamesRound(roundsList[roundsList.length-1].id));
    } else {
      console.log('test', gamesList)
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
    console.log('calc', gamesList)
    const game = gameById(gameId, gamesList);
    predictionList.forEach((prediction) => {
      const teamEarnedPoints = prediction.predictedWinnigTeam === game.winner ? 10 : 0;
      const diffEarnedPoints = prediction.predictedPointDifference === Math.abs(game.visitorScore - game.homeScore) ? 20 : Math.abs(Math.abs(game.visitorScore - game.homeScore) - prediction.predictedWinnigTeam) <= 5 ? 10 : 0;
      const bookiesChoice = game.visitorOdd > game.homeOdd ? game.team[0].name : game.team[1].name;
      const bookiesEarnedPoints = (prediction.predictedWinnigTeam === bookiesChoice && prediction.predictedWinnigTeam === game.winner) ? 10 : 0;
      dispatch(updateBetPoints(prediction.id, teamEarnedPoints, diffEarnedPoints, bookiesEarnedPoints));
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