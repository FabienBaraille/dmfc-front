import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { usersSortByScore } from '../../filters/usersFilter';

import Wrapper from '../Wrapper/Wrapper';

import './Rankings.scss';
import { positionDisplay } from '../../display/positionDisplay';

const Rankings = () => {

  const usersList = useSelector((state) => state.datas.allUsers);

  const sortedPlayersList = usersSortByScore(usersList);

  const playerList = sortedPlayersList.map(({id, username, role, score, position} , index) => {
    const userRole = role[0];
    if (userRole !== "ROLE_DMFC" && userRole !== "ROLE_ADMIN") {
      const changePos = parseInt(position) - (index + 1);
      const posMark = positionDisplay(changePos);

      return (
        <tr key={id} className='users-row'>
            <th><Link to={`/player/${id}`}>{`#${index + 1}`}</Link></th>
            {<th className={changePos > 0 ? "green" : changePos < 0 ? "red" : ""}>
              <Link to={`/player/${id}`}>
                {posMark}
              </Link>
            </th>}
            <th className="player"><Link to={`/player/${id}`}>{username}</Link></th>
            <th><Link to={`/player/${id}`}>{score}</Link></th>
        </tr>
      )
    }
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