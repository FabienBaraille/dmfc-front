import PropTypes from 'prop-types';

import './ResultElmt.scss';
import { useSelector } from 'react-redux';

const ResultElmt = ({filteredPrediction, index}) => {

  const {predictedWinnigTeam, predictedPointDifference, pointScored, bonusPointsErned, bonusBookie, validationStatus} = filteredPrediction;
  const loggedUserRole = useSelector((state) => state.user.loggedUser.roles[0]);

  return (
    <div className="bet_result player-stat">
      <h5>{`Match ${index}`} </h5>
      <div className="team-stat">
        <p>{`Team choisie : ${predictedWinnigTeam}`} </p>
        {/* <p>{`Vainqueur réel : ${predictedWinnigTeam}`} </p> */}
      </div>
      <div className="score-stat">
        <p>{`Différence prédite : ${predictedPointDifference}`} </p>
        {/* <p>{`Différence réelle : ${predictedPointDifference}`} </p> */}
      </div>
      <div className="points">
        <p className="ul-title">Point marqué :</p>
        <ul>
          <li>{`Equipe gagnante : ${pointScored}`}</li>
          <li>{`Bonus différence : ${bonusPointsErned}`}</li>
          <li>{`Bonus bookies : ${bonusBookie}`}</li>
        </ul>
      </div>
      {loggedUserRole === "ROLE_DMFC" && <h5>{`Status : ${validationStatus}`}</h5> }
    </div>
  )
};

ResultElmt.propTypes = {
  filteredPrediction: PropTypes.object,
  index: PropTypes.number,
}

export default ResultElmt;