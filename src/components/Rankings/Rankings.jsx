import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { usersSortByScore } from '../../Utils/filters/usersFilter';

import Wrapper from '../Wrapper/Wrapper';

import './Rankings.scss';
import { positionDisplay } from '../../Utils/display/positionDisplay';

const Rankings = () => {

  const usersList = useSelector((state) => state.datas.allUsers);
  const sortedPlayersList = usersSortByScore(usersList);
  const userPlaying = sortedPlayersList.filter(({roles}) => !roles.includes('ROLE_ADMIN') && !roles.includes('ROLE_DMFC'));

  const playerList = userPlaying.map(({id, username, score, oldPosition} , index) => {
  const position = oldPosition === null ? userPlaying.length : oldPosition;
  const changePos = parseInt(position) - (index + 1);
  const posMark = positionDisplay(changePos);

    return (
      <tr key={id} className='users-row'>
          <th><Link to={`/player/${username}`}>{`#${index + 1}`}</Link></th>
          {<th className={changePos > 0 ? "green" : changePos < 0 ? "red" : ""}>
            <Link to={`/player/${username}`}>
              {posMark}
            </Link>
          </th>}
          <th className="player"><Link to={`/player/${username}`}>{username}</Link></th>
          <th><Link to={`/player/${username}`}>{score != null ? score : 0}</Link></th>
      </tr>
    )
  })

  return (
    <Wrapper name={'rankings'}>
      <h2>Classement Général</h2>
      <table className="ranking-table">
        <thead>
          <tr>
            <th colSpan={2}>Classement</th>
            <th>Nom du Joueur</th>
            <th>Score actuel</th>
          </tr>
        </thead>
        <tbody>
          {playerList}
        </tbody>
      </table>
    </Wrapper>
  )};
export default Rankings;