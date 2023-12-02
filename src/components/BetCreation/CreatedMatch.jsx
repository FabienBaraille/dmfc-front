import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { deleteGame, updateGame } from '../../actions/bet';

import { transformDate } from '../../Utils/stats/calcDate';
import Input from '../Utils/Input';
import { sortTeams } from '../../Utils/filters/teamFilter';

const CreatedMatch = ({gameId, dateAndTimeOfMatch, team, isPredicted, teamOrder = []}) => {

  const dispatch = useDispatch();

  const [isEdited, setIsEdited] = useState(false);

  const matchDate = new Date(dateAndTimeOfMatch);
  const transformedDate = transformDate(matchDate, 'bet');

  const orederedTeams = sortTeams(team, teamOrder);

  const [newMatchDate, setNewMatchDate] = useState(dateAndTimeOfMatch.slice(0, 16));
  const [newVisitor, setNewVisitor] = useState(orederedTeams[0].id);
  const [newHome, setNewHome] = useState(orederedTeams[1].id);
  const [errorMessage, setErrorMessage] = useState('');

  const teamsList = useSelector((state) => state.datas.allTeams);

  const teamsOptions = teamsList.map(({selectedAway, selectedHome, teams: {id, trigram, name}}, index) => <option key={`${index}team${id}`} value={id} disabled={newVisitor === newHome} >{trigram} - {name} - V:{selectedAway} - H:{selectedHome}</option> );

  const handleUpdate = (event) => {
    event.preventDefault();
    if (newVisitor != newHome) {
      const body = {
        dateAndTimeOfMatch : newMatchDate,
        teams : [newVisitor, newHome]
      }
      dispatch(updateGame(gameId, body, true));
    } else {
      setErrorMessage('Les équipes doivent être différentes !');
    }
  }
  const handleDelete = (event) => {
    event.preventDefault();
    dispatch(deleteGame(gameId));
  }
  if (!isEdited) {
    return (
      <div className='existing-match'>
        <div className='match-infos'>
          <div className="bloc-infos">
            <div className='teams-infos'>
              <p><img className='small-logo visitor-logo' src={`/src/assets/logos/${orederedTeams[0].logo}`} alt="" />{orederedTeams[0].trigram}</p>
              <p>{orederedTeams[0].name}</p>
            </div>
            <div className="at">@</div>
            <div className='teams-infos'>
              <p>{orederedTeams[1].trigram}<img className='small-logo home-logo' src={`/src/assets/logos/${orederedTeams[1].logo}`} alt="" /></p>
              <p>{orederedTeams[1].name}</p>
            </div>
          </div>
          <div className="bloc-infos">
            <h5>Match Time :</h5>
            <p>{transformedDate}</p>
          </div>
        </div>
        {(isPredicted) ?
          <div className='button-grp'>
            <button className='trash-button' onClick={() => setIsEdited(!isEdited)}><div className='edit-logo'> </div></button>
            <button className='trash-button' onClick={handleDelete}><div className='trash-logo'></div></button>
          </div> :
          <p>Non éditable, pronostic(s) existant(s)</p>
        }
      </div>
    )
  } else {
    return (
      <div className='edit-match'>
        <form className="existing-match" onSubmit={handleUpdate}>
          <select name="visitor" defaultValue={newVisitor} onChange={(event) => {
              setNewVisitor(event.target.value);
              if (errorMessage !== '') {
                setErrorMessage('');
              }
            }
          }>
            {teamsOptions}
          </select>
          <div className="at">@</div>
          <select name="home-team" defaultValue={newHome} onChange={(event) => {
              setNewHome(event.target.value);
              if (errorMessage !== '') {
                setErrorMessage('');
              }
            }
          }>
            {teamsOptions}
          </select>
          <Input
            inputName="deadline"
            label="Deadline :"
            id="pronostic-limit"
            type="datetime-local"
            value={newMatchDate}
            onChange={event => setNewMatchDate(event.target.value)} 
            isRequired={true}
          />
          {errorMessage !== '' && <p className='error-message'>{errorMessage}</p> }
          <button type="submit" >
            Valider
          </button>
        </form>
        <button type='button' onClick={() => {
            setIsEdited(!isEdited);
            setNewVisitor(orederedTeams[0].id);
            setNewHome(orederedTeams[1].id);
            setNewMatchDate(dateAndTimeOfMatch.slice(0, 16));
          }
        }>
          Annuler
        </button>
      </div>
    )
  }
  
};
CreatedMatch.propTypes = {
  gameId: PropTypes.number,
  dateAndTimeOfMatch: PropTypes.string,
  team: PropTypes.array,
  isPredicted: PropTypes.bool,
  teamOrder: PropTypes.array,
}
export default CreatedMatch;