import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import Wrapper from "../Wrapper/Wrapper";

import { createBetTop, setIsLoadingTop, updateBetTop, updateTopResults } from "../../actions/bet";
import { unableBet } from "../../Utils/filters/predictionFilter";

import InputTop from "./InputTop";

const TopTenList = ({topten = '', teams, idsList = [], conference, betTop = {}, isBet = false}) => {

  const dispatch = useDispatch();
  const [button, setButton] = useState('');
  const loggedUserId = useSelector((state) => state.user.loggedUser.id);

  const teamInfo = (topten !== '' && !isBet) ? topten.team : teams;
  // Verify if betTop is an empty object
  const isUpdate = Object.keys(betTop).length > 0;
  const results = (topten !== '' && !isBet) ? topten.results : isUpdate ? betTop.predictedRanking : [];

  const currentDate = new Date();
  let unableMessage = '';
  let deadlineTop = '';

  if (isBet) {
    deadlineTop = new Date(topten.deadline);
    unableMessage = unableBet(currentDate, topten.deadline, betTop.validationStatus);
  }
  

  const [team1, setTeam1] = useState(results.length !== 0 ? parseInt(results[0]) : teams[0].id);
  const [team2, setTeam2] = useState(results.length !== 0 ? parseInt(results[1]) : teams[0].id);
  const [team3, setTeam3] = useState(results.length !== 0 ? parseInt(results[2]) : teams[0].id);
  const [team4, setTeam4] = useState(results.length !== 0 ? parseInt(results[3]) : teams[0].id);
  const [team5, setTeam5] = useState(results.length !== 0 ? parseInt(results[4]) : teams[0].id);
  const [team6, setTeam6] = useState(results.length !== 0 ? parseInt(results[5]) : teams[0].id);
  const [team7, setTeam7] = useState(results.length !== 0 ? parseInt(results[6]) : teams[0].id);
  const [team8, setTeam8] = useState(results.length !== 0 ? parseInt(results[7]) : teams[0].id);
  const [team9, setTeam9] = useState(results.length !== 0 ? parseInt(results[8]) : teams[0].id);
  const [team10, setTeam10] = useState(results.length !== 0 ? parseInt(results[9]) : teams[0].id);

  const newResult = [team1, team2, team3, team4, team5, team6, team7, team8, team9, team10];
  
  const disableSelect = isBet && (currentDate > deadlineTop || betTop.validationStatus == 'Validated' || betTop.validationStatus == 'Published');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isBet) {
      const body = {
        "results": newResult
      };
      idsList.forEach(id => {
        dispatch(setIsLoadingTop(true));
        dispatch(updateTopResults(id, body, true));
      });
    } else if (!isUpdate) {
      const body =
      {
        "user": loggedUserId,
        "topten": topten.id,
        "predictedRanking": newResult,
        "validationStatus": button
      }
      dispatch(createBetTop(body, button));
    } else {
      const body =
      {
        "predictedRanking": newResult,
        "validationStatus": button
      }
      dispatch(updateBetTop(betTop.id, body, button));
    }
  }

  return (
    <Wrapper name="topten-list">
      <h5>{`Top 10 Conférence ${conference}`}</h5>
      <form onSubmit={handleSubmit}>
        <InputTop 
          team={teamInfo}
          name="first"
          label="1er :"
          change={(event) => setTeam1(parseInt(event.target.value))}
          value={team1}
          test={newResult}
          disabled={disableSelect}
        />
        <InputTop 
          team={teamInfo}
          name="second"
          label="2ème :"
          change={(event) => setTeam2(parseInt(event.target.value))}
          value={team2}
          test={newResult}
          disabled={disableSelect}
        />
        <InputTop 
          team={teamInfo}
          name="third"
          label="3ème :"
          change={(event) => setTeam3(parseInt(event.target.value))}
          value={team3}
          test={newResult}
          disabled={disableSelect}
        />
        <InputTop 
          team={teamInfo}
          name="forth"
          label="4ème :"
          change={(event) => setTeam4(parseInt(event.target.value))}
          value={team4}
          test={newResult}
          disabled={disableSelect}
        />
        <InputTop 
          team={teamInfo}
          name="fifth"
          label="5ème :"
          change={(event) => setTeam5(parseInt(event.target.value))}
          value={team5}
          test={newResult}
          disabled={disableSelect}
        />
        <InputTop 
          team={teamInfo}
          name="sixth"
          label="6ème :"
          change={(event) => setTeam6(parseInt(event.target.value))}
          value={team6}
          test={newResult}
          disabled={disableSelect}
        />
        <InputTop 
          team={teamInfo}
          name="seventh"
          label="7ème :"
          change={(event) => setTeam7(parseInt(event.target.value))}
          value={team7}
          test={newResult}
          disabled={disableSelect}
        />
        <InputTop 
          team={teamInfo}
          name="eigth"
          label="8ème :"
          change={(event) => setTeam8(parseInt(event.target.value))}
          value={team8}
          test={newResult}
          disabled={disableSelect}
        />
        <InputTop 
          team={teamInfo}
          name="ninth"
          label="9ème :"
          change={(event) => setTeam9(parseInt(event.target.value))}
          value={team9}
          test={newResult}
          disabled={disableSelect}
        />
        <InputTop 
          team={teamInfo}
          name="tenth"
          label="10ème :"
          change={(event) => setTeam10(parseInt(event.target.value))}
          value={team10}
          test={newResult}
          disabled={disableSelect}
        />
        {!isBet && <button type="submit">Mettre à jour</button>}
        {/* Reprendre le principe de bouton de playerbetmatch */}
        {currentDate < deadlineTop && betTop.validationStatus !== 'Validated' && betTop.validationStatus !== 'Published' && 
          <div className='button-group' >
            <button type="submit" onClick={() => setButton('Saved')} >Sauvegarder</button>
            <button type="submit" onClick={() => setButton('Validated')} >Valider</button>
          </div>}
        {(currentDate > deadlineTop || betTop.validationStatus == 'Validated' || betTop.validationStatus == 'Published') && <h5>{unableMessage}</h5>}
      </form>
    </Wrapper>
  )
};
TopTenList.propTypes = {
  topten: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ]),
  teams: PropTypes.array,
  idsList: PropTypes.array,
  conference: PropTypes.string,
  betTop: PropTypes.object,
  isBet: PropTypes.bool,
  deadline: PropTypes.string
}
export default TopTenList;