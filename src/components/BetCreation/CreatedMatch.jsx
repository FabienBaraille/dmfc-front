import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { deleteGame, updateGame } from '../../actions/bet';

import { transformDate } from '../../Utils/stats/calcDate';
import Input from '../Utils/Input';

const CreatedMatch = ({gameId, dateAndTimeOfMatch, team, isPredicted}) => {

  const dispatch = useDispatch();

  const [isEdited, setIsEdited] = useState(false);

  const matchDate = new Date(dateAndTimeOfMatch);
  const transformedDate = transformDate(matchDate, 'bet');

  const [newMatchDate, setNewMatchDate] = useState(dateAndTimeOfMatch.slice(0, 16));
  const [newVisitor, setNewVisitor] = useState(team[0].id);
  const [newHome, setNewHome] = useState(team[1].id);
  const [errorMessage, setErrorMessage] = useState('');

  const teamsList = useSelector((state) => state.datas.allTeams);

  const teamsOptions = teamsList.map(({id, trigram, name}, index) => <option key={`${index}team${id}`} value={id} disabled={newVisitor === newHome} >{trigram} - {name}</option> );

  const handleUpdate = (event) => {
    event.preventDefault();
    if (newVisitor != newHome) {
      const body = {
        dateAndTimeOfMatch : newMatchDate,
        teams : [newHome, newVisitor]
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
              <p><img className='small-logo visitor-logo' src={`/assets/logos/${team[0].logo}`} alt="" />{team[0].trigram}</p>
              <p>{team[0].name}</p>
            </div>
            <div className="at">@</div>
            <div className='teams-infos'>
              <p>{team[1].trigram}<img className='small-logo home-logo' src={`/assets/logos/${team[1].logo}`} alt="" /></p>
              <p>{team[1].name}</p>
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
            setNewVisitor(team[0].id);
            setNewHome(team[1].id);
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
}
export default CreatedMatch;