/* eslint-disable react/no-unescaped-entities */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';

import { toastSuccess } from "../Toast/ToastDMFC";
import Wrapper from "../Wrapper/Wrapper";
import BetTpl  from "./BetMatch";
import Input from "../Utils/Input";
import LoadElmt from "../Loader/LoadElmt";
import RoundSelector from "./Element/RoundSelector";
import CreatedMatch from "./CreatedMatch";

import { addBetToList, createGame, createRound, getGamesRound, setInputValueBet, setIsCreatedMatch, setIsCreatedRound, setIsDeleted, setIsUpdated } from "../../actions/bet";
import { getAllTeams } from "../../actions/datas";
import { toggleCreationMode } from "../../actions/bet";
import { transformDate } from "../../Utils/stats/calcDate";

import './RsBetCreation.scss';

const RsBetCreation = () => {

  const dispatch = useDispatch();
  const {
    isCreatedMatch,
    betList,
    roundCreationMode,
    roundName,
    roundNumber,
    isLoadingGame,
    games,
    isPred,
    isDeleted,
    isUpdated,
    isCreatedRound
  } = useSelector((state) => state.bet);
  useEffect(() => {
    dispatch(setInputValueBet('roundNumber', ''));
  }, []);

  useEffect(() => {
    if (!isLoadingGame && isCreatedRound) {
      toast.success('Round avec succès.', toastSuccess);
        setTimeout(() => {
          dispatch(setIsCreatedRound(false));
        }, 2001);
    }
    if (!isLoadingGame && isCreatedMatch) {
      toast.success('Match(s) créé(s) avec succès.', toastSuccess);
      setTimeout(() => {
        dispatch(getAllTeams());
        dispatch(setInputValueBet('betList', []));
        dispatch(setIsCreatedMatch(false));
      }, 2001);
    }
    if (!isLoadingGame && isUpdated) {
      toast.success('Match mis à jour avec succès', toastSuccess);
      setTimeout(() => {
        dispatch(setIsUpdated(false));
      }, 2001);
    }
    if (!isLoadingGame && isDeleted) {
      toast.success('Match supprimé avec succès', toastSuccess);
      setTimeout(() => {
        dispatch(getAllTeams());
        dispatch(setIsDeleted(false));
        dispatch(getGamesRound(roundNumber));
      }, 2001);
    }
    if (roundNumber !== '') {
      dispatch(getGamesRound(roundNumber));
    }
  }, [isCreatedMatch, roundNumber, isDeleted, isUpdated, isCreatedRound])

  const betTpl = BetTpl()

  const createdGames = games.map(({id, ...rest}) => <CreatedMatch key={id} gameId={id} {...rest} isPredicted={isPred[id]} />);

  const handleAddBet = () => {
    dispatch(addBetToList(betTpl))
  }

  const handleRoundCreation = () => {
    roundCreationMode ? dispatch(toggleCreationMode(false)) : dispatch(toggleCreationMode(true))
  }
  const handleInput = (event) => {
    dispatch(setInputValueBet(event.target.id, event.target.value));
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    if (roundCreationMode) {
      dispatch(createRound('SR'));
    } else {
    const formData = new FormData(event.currentTarget);
    const visitors = formData.getAll('visitor');
    const homeTeams = formData.getAll('home-team');
    const deadlines = formData.getAll('deadline');
    visitors.forEach((team, index) => {
      const visitorId = team;
      const homeTeamId = homeTeams[index];
      const deadline = deadlines[index];
      const transformedDeadline = transformDate(deadline, 'create');
      // Finir de traiter une erreur si 2 équipes sont identiques
      if (visitorId !== homeTeamId) {
        dispatch(createGame(transformedDeadline, [visitorId, homeTeamId]));
      }
    })
    }
  }
  if (isLoadingGame) {
    return <LoadElmt />
  }

  return (
    <section className="dmfc-creation">
      <Wrapper name="rsbetcreation">
        <div className="round-choice">
          <h4>Pronostic saison régulière</h4>
          {!roundCreationMode &&
            <RoundSelector isCreationMatch={true} phase={"SR"} />
          }
        </div>
        <form onSubmit={handleSubmit}>
          {betList.length == 0 ?
            <>
              <button type="button" onClick={handleRoundCreation}>
                {!roundCreationMode ? "Nouveau round" : "Round existant"}
              </button>
              {roundCreationMode &&
                <div className="round-creation">
                  <Input 
                    label="Nom du Round" 
                    id="roundName" 
                    type="text" 
                    placeholder="Nom du round"
                    value={roundName}
                    onChange={handleInput}
                  />
                </div>
              }
            </>
          : null }
          {roundNumber !== '' &&  betList}
          {(!roundCreationMode && roundNumber !== '') && <button type="button" className="addBet" onClick={handleAddBet}>Ajouter un match</button> }
          {(betList.length !== 0 || roundCreationMode) ?
              <button type="submit">Créer {roundCreationMode ? 'le round' : 'le(s) match(s)' }</button>
          : null}
        </form>
      </Wrapper>
      {(!roundCreationMode && games.length !== 0 && roundNumber != '') && 
        <Wrapper name={"created-game"}>
          <h4>Liste des matchs du round</h4>
          {createdGames}
        </Wrapper>}
    </section>
  )
};

export default RsBetCreation;