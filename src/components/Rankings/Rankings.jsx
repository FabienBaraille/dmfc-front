import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Wrapper from '../Wrapper/Wrapper';

import { positionDisplay } from '../../Utils/display/positionDisplay';

import './Rankings.scss';

const Rankings = () => {

  const usersList = useSelector((state) => state.datas.allUsers);
  const userPlaying = usersList.filter(({roles}) => !roles.includes('ROLE_ADMIN') && !roles.includes('ROLE_DMFC') && !roles.includes('ROLE_JOUEUR_NA'));

  const playerList = userPlaying.map(({id, username, score, scoreTOP, oldPosition} , index) => {
    const changePos = oldPosition === null ? 0 : parseInt(oldPosition) - (index + 1);
    const posMark = positionDisplay(changePos);

    return (
      <tr key={id} className='users-row'>
          <th><Link to={`/player/${username}`}>{`#${index + 1}`}</Link></th>
          {<th className={changePos > 0 ? "green" : changePos < 0 ? "red" : "grey"}>
            <Link to={`/player/${username}`}>
              {posMark}
            </Link>
          </th>}
          <th className="player"><Link to={`/player/${username}`}>{username}</Link></th>
          <th><Link to={`/player/${username}`}>{score != null ? score + scoreTOP : 0}</Link></th>
      </tr>
    )
  });

  return (
    <Wrapper name={'rankings'}>
      <h2>Classement Général</h2>
      {playerList.length === 0 ? 
      <h3>{`Il n'y a actuellement personne dans la ligue`}</h3>
        :
      <table className="ranking-table">
        <thead>
          <tr>
            <th colSpan={2}>Classement</th>
            <th>Joueur</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {playerList}
        </tbody>
      </table>
      }
    </Wrapper>
  )};

export default Rankings;