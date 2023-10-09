/* eslint-disable react/no-unescaped-entities */
import PropTypes from 'prop-types';
import Input from "../Utils/Input";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateGame } from '../../actions/bet';

const GameBetResult = ({gameId, visitorScore, homeScore, visitorOdd, homeOdd, team}) => {

  const dispatch = useDispatch();

  const [visitorPoints, setVisitorPoints] = useState(visitorScore);
  const [homePoints, setHomePoints] = useState(homeScore);
  const [visitorCote, setVisitorCote] = useState(visitorOdd);
  const [homeCote, setHomeCote] = useState(homeOdd);

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(updateGame(
        gameId,
        parseInt(visitorPoints),
        parseInt(homePoints),
        parseFloat(visitorCote),
        parseFloat(homeCote)
      )
    );
  }
  console.log(gameId)
  return (
      <form className="bet_result" onSubmit={handleSubmit}>
        <div className="team-result">
          <p>{`${team[0].trigram} - ${team[0].name}`}</p>
          <div className="score">
            <Input label="Score" htmlFor="score" id="score" placeholder="000" type="number" value={visitorPoints} onChange={(event) => setVisitorPoints(event.target.value)}/>
            <Input label="Cote bookie" placeholder="0.00" htmlFor="bookie1" id="bookie1" value={visitorCote} onChange={(event) => setVisitorCote(event.target.value)}/>
          </div>
        </div>
        <div className="at">@</div>
        <div className="team-result">
          <p>{`${team[1].trigram} - ${team[1].name}`}</p>
          <div className="score">
            <Input label="Score" htmlFor="score" id="score" placeholder="000" type="number" value={homePoints} onChange={(event) => setHomePoints(event.target.value)} />
            <Input label="Cote bookie" placeholder="0.00" htmlFor="bookie2" id="bookie2" value={homeCote} onChange={(event) => setHomeCote(event.target.value)}/>
          </div>
        </div>
        <button type="submit">Valider</button>
      </form>
  )
};

GameBetResult.propTypes = {
  gameId: PropTypes.number,
  visitorScore: PropTypes.number,
  homeScore: PropTypes.number,
  visitorOdd: PropTypes.number,
  homeOdd: PropTypes.number,
  team: PropTypes.array,
}

export default GameBetResult;