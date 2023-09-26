import Wrapper from '../Wrapper/Wrapper';

import data from '../../data/data';

import './Rankings.scss';

const Rankings = () => {

  let sortedPlayersList = data.User.sort((user1, user2) => (user1.Score < user2.Score) ? 1 : (user1.Score > user2.Score) ? -1 : 0);

  const playerList = sortedPlayersList.map(({Username, Role, Score, OldPosition} , index) => {
    if (Role !== "DMFC") {
      const progress = parseInt(OldPosition) - (index+1);
      return (
        <tr key={Username}>
            <th>{Username}</th>
            <th>{Score}</th>
            <th className="progress">{progress}</th>
        </tr>
      )
    }
  })

  return (
    <Wrapper>
      <h2>Classement Général</h2>
      <table>
        <thead>
          <tr>
            <th>Nom du Joueur</th>
            <th>Score actuel</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {playerList}
        </tbody>
      </table>
    </Wrapper>
  )};
export default Rankings;