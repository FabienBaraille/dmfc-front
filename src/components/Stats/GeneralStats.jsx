import { NavLink, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getSRPrediction } from '../../actions/datas';

import Wrapper from '../Wrapper/Wrapper';
import Retour from '../Retour/Retour';
import LoadElmt from '../Loader/LoadElmt';

import { Link } from 'react-router-dom';

import { userByUsername } from '../../Utils/filters/usersFilter';
import { countBonusBookie, countBonusScore, countRoundPlayed, countWinningTeam, goodPrediction } from '../../Utils/stats/roundStats';
import { averageScore, scoreMax } from '../../Utils/stats/calcStats';

import './GeneralStats.scss';

const GeneralStats = () => {

  const { playerName } = useParams();
  const dispatch = useDispatch();
  const usersList = useSelector((state) => state.datas.allUsers);
  const isLoading = useSelector((state) => state.datas.isLoadingSR);
  const {0 : {id, title, username,score, position, team}} = userByUsername(usersList, playerName);

  const roundsList = useSelector((state) => state.datas.rounds);
  const predictionsList = useSelector((state) => state.datas.SRPrediction);
  const loggedUser = useSelector((state) => state.user.loggedUser)

  const validatedPrediction = goodPrediction(predictionsList);

  const totalWinScore = countWinningTeam(validatedPrediction);
  const totalBonusScore = countBonusScore(validatedPrediction);
  const totalBookieScore = countBonusBookie(validatedPrediction);

  const averageRoundScore = averageScore(roundsList.length, totalWinScore, totalBonusScore, totalBookieScore);
  const maxPoints = scoreMax(roundsList);
  const playedRound = countRoundPlayed(roundsList, validatedPrediction);  

  const [playerIndex, setPlayerIndex] = useState(0);

  const userDataList = usersList.map((user) => ({
    title: user.title,
    score: user.score,
    position: user.position,
    team: user.team,
    username: user.username,
  }));

  const nextPlayerIndex = (playerIndex + 1) % userDataList.length;
  const previousPlayerIndex = (playerIndex - 1 + userDataList.length) % userDataList.length;

  useEffect(() => {
    const index = userDataList.findIndex((user) => user.username === playerName);
    if (index !== -1) {
      setPlayerIndex(index);
    }
  }, [playerName, userDataList]);

  const nextPlayer = () => {
    const nextIndex = (playerIndex + 1) % userDataList.length;
    setPlayerIndex(nextIndex);
  };

  const previousPlayer = () => {
    const previousIndex = (playerIndex - 1 + userDataList.length) % userDataList.length;
    setPlayerIndex(previousIndex);
  };

  useEffect(() => {
    dispatch(getSRPrediction(id));
  }, [])

  if (isLoading) {
    return <LoadElmt />
  }
  return (
    <Wrapper name='GeneralStats'>
      <div className='title-stats'>
        <h2>Saison en cours : </h2>
        <h3>Stats de {username}</h3>
        <h4>Titre : {title ? title : "Pas de titre"}</h4>
        <div className='team-infos'>
          <h4>{team ? team.name : "Pas d'équipe favorite"} - </h4><img className='logo' src={team ? `/src/assets/logos/${team.logo}` : ''} alt="" />
        </div>
      </div>
      <div className='prediction-stats'>
        <p>{`Classement actuel : ${position ? position : " -"}`}</p>
        <p>{`Nombre de round joué(s) : ${playedRound} / ${roundsList.length}`}</p>
        <h4>Score :</h4>
        <p>{`Score : ${score ? score : 0} / ${maxPoints}`}</p>
        <p>{`Moyen par round : ${averageRoundScore}`}</p>
        <p>{`Prono d'équipe réussi : ${totalWinScore}`}</p>
        <p>{`Bonus score : ${totalBonusScore}`}</p>
        <p>{`Bonus bookie : ${totalBookieScore}`}</p>
      </div>
      <div className='return-btn'>
        {(playerName === loggedUser.username || loggedUser.roles[0] === "ROLE_DMFC") && <button type='button'><NavLink to="/roundsStat">Historique des rounds</NavLink></button> }
        <Retour where="au classement" link="/rankings" />
      </div>
      <div className='arrow'>
      <Link to={`/player/${userDataList[previousPlayerIndex].username}`}>
      <button className='arrow-right' onClick={previousPlayer}>&lt;</button>
      </Link>
      <Link to={`/player/${userDataList[nextPlayerIndex].username}`}>
      <button className='arrow-left' onClick={nextPlayer}>&gt;</button>
      </Link>
</div>
    </Wrapper>
  )
};

export default GeneralStats;