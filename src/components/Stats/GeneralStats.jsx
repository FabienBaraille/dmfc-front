import Wrapper from '../Wrapper/Wrapper';

import { userByName } from '../../filters/usersFilter';
import { teamByTrigram } from '../../filters/teamFilter';

import data from '../../data/data';
import './GeneralStats.scss';
import { useParams } from 'react-router-dom';


const GeneralStats = () => {

  const {playerName} = useParams();

  const {Username, Title, Score, Team} = userByName(playerName);
  const {Trigram, Name, Logo} = teamByTrigram(data.Team, Team)

  return (
    <Wrapper name={GeneralStats}>
      <h2>Statistiques saison en cours</h2>
      <h3>{Username}</h3>
      <h3>{Title}</h3>
      <h3>{Trigram} - {Name} - <img src={Logo} alt="" /></h3>
      <h4>{`Score : ${Score}`}</h4>
      <div>
        <h4>Classement acuel</h4>
      </div>
    </Wrapper>
  )
};

export default GeneralStats;