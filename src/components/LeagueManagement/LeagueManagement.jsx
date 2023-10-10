import LeagueTitle from "./LeagueTitle"
import PlayerInLeague from "./PlayerInLeague";
import PlayerPending from "./PlayerPending";
import { useSelector } from "react-redux";

import './LeagueManagement.scss'

const LeagueManagement = () => {
  const allUsers = useSelector((state) => state.datas.allUsers);

  const players = allUsers.filter(({roles}) => roles.includes('ROLE_JOUEUR'));
  const playersNA = allUsers.filter(({roles}) => roles.includes('ROLE_JOUEUR_NA'));

  const isConfirmationVisible = useSelector((state) => state.league.isConfirmationVisible)

  if (isConfirmationVisible) {
    document.body.classList.add('modal-open');
  } else {
    document.body.classList.remove('modal-open');
  }

  return (
      <div className="league-management">
        <LeagueTitle />
        <div className="league-management_player">
          <PlayerInLeague players={players} />
          <PlayerPending playersNA={playersNA}/>
        </div>
      </div>
  )
};

export default LeagueManagement;
