/* eslint-disable react/no-unescaped-entities */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Wrapper from "../Wrapper/Wrapper"
import BetTpl  from "./BetMatch";
import Input from "../Utils/Input";
import LoadElmt from "../Loader/LoadElmt";
import RoundSelector from "./Element/RoundSelector";

import { addBetToList, createGame, createRound, setInputValueBet, setIsCreatedMatch } from "../../actions/bet";
import { toggleCreationMode } from "../../actions/bet";
import { transformDate } from "../../Utils/stats/calcDate";

import './RsBetCreation.scss';

const RsBetCreation = () => {

  const dispatch = useDispatch();
  const {isCreatedMatch, betList, roundCreationMode, roundName, roundCat, roundNumber, isLoadingGame} = useSelector((state) => state.bet);

  useEffect(() => {
    if (!isLoadingGame && isCreatedMatch) {
      setTimeout(() => {
        dispatch(addBetToList([]));
        dispatch(setInputValueBet('roundNumber', ''));
        dispatch(setIsCreatedMatch(false));
      }, 1500);
    }
  }, [isCreatedMatch])

  const betTpl = BetTpl()

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
      dispatch(createRound());
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
      if (visitorId !== homeTeamId) {
        dispatch(createGame(transformedDeadline, [homeTeamId, visitorId]));
      }
    })
    }
  }
  if (isLoadingGame) {
    return <LoadElmt />
  }
  if (isCreatedMatch) {
    return (
      <Wrapper>
        <h2>Match(s) créé(s) avec succès !</h2>
      </Wrapper>
    )
  }
  return (
      <Wrapper name="rsbetcreation">
        <div className="round-choice">
          <h4>Pronostic saison régulière</h4>
          {!roundCreationMode &&
            <RoundSelector isCreationMatch={true}/>
          }
        </div>
        <form onSubmit={handleSubmit}>
          {betList.length == 0 ?
            <>
              <button type="button" onClick={handleRoundCreation}>{!roundCreationMode ? "Création d'un nouveau round" : "Round existant"}</button>
              {roundCreationMode &&
                <div className="round-creation">
                  <Input 
                    label="Nom du Round :" 
                    id="roundName" 
                    type="text" 
                    placeholder="Nom du round"
                    value={roundName}
                    onChange={handleInput}
                  />
                  <p>Phase :</p>
                  <select id="roundCat" placeholder="Catégorie Round" onChange={handleInput} value={roundCat} >
                    <option value='SR'>SR</option>
                    <option value='PO' disabled>PO</option>
                  </select>
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
  )
};

export default RsBetCreation;