import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersList } from '../../actions/stats';

import Loader from '../Loader/Loader';
import Wrapper from '../Wrapper/Wrapper';

import './Rankings.scss';

const Rankings = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersList());
  }, [])

  const isLoading = useSelector((state) => state.stats.isLoading);
  const usersList = useSelector((state) => state.stats.allUsers);

  let sortedPlayersList = usersList.sort((user1, user2) => (user1.Score < user2.Score) ? 1 : (user1.Score > user2.Score) ? -1 : 0);

  const playerList = sortedPlayersList.map(({Username, Role, Score, OldPosition} , index) => {
    if (Role !== "DMFC") {
      const progress = parseInt(OldPosition) - (index+1);
      return (
        <Link key={Username} to="/" className='table-row'>
          <th>{`#${index+1}`}</th>
          <th className={progress > 0 ? "green" : progress < 0 ? "red" : ""}>{progress > 0 ? `▲ ${progress}` : progress < 0 ? `▼ ${Math.abs(progress)}` : {progress}}</th>
          <th className="player">{Username}</th>
          <th>{Score}</th>
        </Link>
      )
    }
  })

  if (isLoading) {
    return (
      <Loader />
    )
  }

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