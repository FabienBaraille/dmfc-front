import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Wrapper from '../Wrapper/Wrapper';
import Retour from '../Retour/Retour';

import { userByUsername } from '../../Utils/filters/usersFilter';
import { teamByTrigram } from '../../Utils/filters/teamFilter';

import data from '../../data/data';
import './GeneralStats.scss';


const GeneralStats = () => {

  const { playerName } = useParams();
  const usersList = useSelector((state) => state.datas.allUsers);

  const {0 : {username, title, score}} = userByUsername(usersList, playerName);
  const {0: {Trigram, Name, Logo}} = teamByTrigram(data.team, 'LAL');

  return (
    <Wrapper name='GeneralStats'>
      <h2>Statistiques saison en cours</h2>
      <h3>{username}</h3>
      <h3>{title}</h3>
      <h3>{Trigram} - {Name} - <img className='logo' src={`/src/assets/logos/${Logo}`} alt="" /></h3>
      <h4>{`Score : ${score}`}</h4>
      <div>
        <h4>Classement acuel</h4>
      </div>
      <div className='return-btn'>
        <Retour where="au classement" link="/rankings" />
      </div>
    </Wrapper>
  )
};

export default GeneralStats;