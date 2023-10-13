import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { positionDisplay } from '../../Utils/display/positionDisplay';

import Page from '../Page/Page';
import Wrapper from '../Wrapper/Wrapper';

import './Rankings.scss';

const Rankings = () => {

  const usersList = useSelector((state) => state.datas.allUsers);
  const userPlaying = usersList.filter(({roles}) => !roles.includes('ROLE_ADMIN') && !roles.includes('ROLE_DMFC') && !roles.includes('ROLE_JOUEUR_NA'));

  const playerList = userPlaying.map(({id, username, score, oldPosition} , index) => {
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
          <th><Link to={`/player/${username}`}>{score != null ? score : 0}</Link></th>
      </tr>
    )
  });

  return (
    <Page>
      <Wrapper name={'rankings'}>
        <h2>Classement Général</h2>
        {playerList.length === 0 ? 
        <h3>Il n'y à actuellement personne dans la ligue</h3>
          :
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
        }
      </Wrapper>
    </Page>
  )};

export default Rankings;