import { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteGame } from '../../actions/bet';

import { transformDate } from '../../Utils/stats/calcDate';

const CreatedMatch = ({gameId, dateAndTimeOfMatch, team, isPredicted}) => {

  const dispatch = useDispatch();

  const [isEdited, setIsEdited] = useState(false);

  const matchDate = new Date(dateAndTimeOfMatch);
  const transformedDate = transformDate(matchDate, 'bet');

  const handleDelete = (event) => {
    event.preventDefault;
    dispatch(deleteGame(gameId));
  }
  if (!isEdited) {
    return (
      <div className='existing-match'>
        <div className='match-infos'>
          <div className="bloc-infos">
            <div className='teams-infos'>
              <p><img className='small-logo' src={`/src/assets/logos/${team[0].logo}`} alt="" />{team[0].trigram}</p>
              <p>{team[0].name}</p>
            </div>
            <div className="at">@</div>
            <div className='teams-infos'>
              <p><img className='small-logo' src={`/src/assets/logos/${team[1].logo}`} alt="" />{team[1].trigram}</p>
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
    // Copier/Coder BetMatch
    return (
      <div>a éditer</div>
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