import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Wrapper from '../Wrapper/Wrapper';

import { userById } from '../../filters/usersFilter';
import { teamByTrigram } from '../../filters/teamFilter';

import data from '../../data/data';
import './GeneralStats.scss';


const GeneralStats = () => {

  const { playerId } = useParams();
  const usersList = useSelector((state) => state.datas.allUsers);

  const {0 : {Username, Title, Score, Team}} = userById(usersList, playerId);
  const {0: {Trigram, Name, Logo}} = teamByTrigram(data.Team, Team)

  return (
    <Wrapper name='GeneralStats'>
      <h2>Statistiques saison en cours</h2>
      <h3>{Username}</h3>
      <h3>{Title}</h3>
      <h3>{Trigram} - {Name} - <img src={`/src/assets/logos/${Logo}`} alt="" /></h3>
      <h4>{`Score : ${Score}`}</h4>
      <div>
        <h4>Classement acuel</h4>
      </div>
    </Wrapper>
  )
};

export default GeneralStats;