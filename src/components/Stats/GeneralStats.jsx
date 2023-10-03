import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getSRPrediction } from '../../actions/datas';

import Wrapper from '../Wrapper/Wrapper';
import Retour from '../Retour/Retour';
import LoadElmt from '../Loader/LoadElmt';

import { userByUsername } from '../../Utils/filters/usersFilter';

import './GeneralStats.scss';

const GeneralStats = () => {

  const { playerName } = useParams();
  const dispatch = useDispatch();
  const usersList = useSelector((state) => state.datas.allUsers);
  const isLoading = useSelector((state) => state.datas.isLoadingSR);
  const {0 : {id, username, title, score, position, team : {name, logo}}} = userByUsername(usersList, playerName);

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
        <h4>Titre : {title}</h4>
        <div className='team-infos'>
          <h4>{name} - </h4><img className='logo' src={`/src/assets/logos/${logo}`} alt="" />
        </div>
      </div>
      <div className='prediction-stats'>
        <p>Score : {score} - Classement actuel : {position}</p>
        <p>Nombre de round joué(s) :</p>
        <p>Score moyen par round :</p>
        <p>Prono d'équipe réussi :</p>
        <p>Bonus score :</p>
        <p>Bonus bookie :</p>
      </div>
      <div className='return-btn'>
        <Retour where="au classement" link="/rankings" />
      </div>
    </Wrapper>
  )
};

export default GeneralStats;