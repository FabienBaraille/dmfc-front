import { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { createBet, updateBet } from '../../actions/bet';

import { unableBet } from '../../Utils/filters/predictionFilter';
import { transformDate } from "../../Utils/stats/calcDate";

const PlayerBetMatchSR = ({ id, dateAndTimeOfMatch, team, predictStatus, prediction }) => {

  const dispatch = useDispatch();

  const [button, setButton] = useState('');
  const [winTeam, setWinTeam] = useState(predictStatus !== 'Not done' ? prediction.predictedWinnigTeam : '');
  const [winDif, setWinDif] = useState(predictStatus !== 'Not done' ? prediction.predictedPointDifference : '');
  const [warning, setWarning] = useState('');

  const matchDate = new Date(dateAndTimeOfMatch);
  const currentDate = new Date();

  const transformedDate = transformDate(matchDate, 'bet');

  const unableMessage = unableBet(currentDate, matchDate, predictStatus);

  const handleSubmit = event => {
    event.preventDefault();
    if (winTeam !== '' && winDif !== '') {
      const predictedWinTeam = winTeam == 0 ? team[0].name : winTeam == 1 ? team[1].name : winTeam;
      predictStatus === 'Not done' ? 
        dispatch(createBet(
            predictedWinTeam,
            winDif,
            id,
            button,
          )
        ) : 
        dispatch(updateBet(
            predictedWinTeam,
            winDif,
            prediction.id,
            button
          )
        )
    } else {
      setWarning("Fait ton choix d'abord !");
    }
  }
  return (
    <div className='page'>
      <form className="match" onSubmit={handleSubmit} id={id}>
        <div className="teams">
          <div className="team-detail">
            <input 
              type="radio" 
              id="visitor" 
              name='winning-team' 
              defaultChecked={predictStatus !== 'Not done' ? prediction.predictedWinnigTeam === team[0].name : false} 
              disabled={(currentDate > matchDate || predictStatus === 'Published' || predictStatus === 'Validated')}
              onChange={() => {
                setWinTeam(0);
                if (warning) {
                  setWarning('');
                }
              }}
            />
            <label htmlFor="visitor" >
              {`${team[0].trigram} - ${team[0].name}`}
            </label>
            <img className='small-logo' src={`/src/assets/logos/${team[0].logo}`} alt="" />
          </div>
          <div className='at'>@</div>
          <div className="team-detail">
            <img className='small-logo' src={`/src/assets/logos/${team[1].logo}`} alt="" />
            <label htmlFor="home" >
              {`${team[1].trigram} - ${team[1].name}`}
            </label>
            <input 
              type="radio" 
              id="home" 
              name='winning-team' 
              defaultChecked={predictStatus !== 'Not done' ? prediction.predictedWinnigTeam === team[1].name : false} 
              disabled={(currentDate > matchDate || predictStatus === 'Published' || predictStatus === 'Validated')} 
              onChange={() => {
                setWinTeam(1);
                if (warning) {
                  setWarning('');
                }
              }}
            />
          </div>
        </div>
        <div>
          <label htmlFor="diff">Diff</label>
          <input 
            type="number" 
            id="diff" 
            onChange={(event) => {
              setWinDif(event.target.value);
              if (warning) {
                setWarning('');
              }
            }}
            min="0"
            defaultValue={winDif} 
            disabled={(currentDate > matchDate || predictStatus === 'Published' || predictStatus === 'Validated')} />
        </div>
        <div className="match_timer">
          <h5>Match Time :</h5>
          <p>{transformedDate}</p>
        </div>
        {warning && <p className='error-message'>{warning}</p> }
        {currentDate < matchDate && predictStatus !== 'Validated' && predictStatus !== 'Published' && 
          <div className='button-groupe' >
            <button type="submit" onClick={() => setButton('Saved')} >Sauvegarder</button>
            <button type="submit" onClick={() => setButton('Validated')} >Valider</button>
          </div>}
        {(currentDate > matchDate || predictStatus == 'Validated' || predictStatus == 'Published') && <h5>{unableMessage}</h5>}
      </form>
    </div>
  )
};

PlayerBetMatchSR.propTypes = {
  id: PropTypes.number,
  dateAndTimeOfMatch: PropTypes.string,
  team: PropTypes.array,
  predictStatus: PropTypes.string,
  userId: PropTypes.number,
  prediction: PropTypes.object,
}

export default PlayerBetMatchSR;