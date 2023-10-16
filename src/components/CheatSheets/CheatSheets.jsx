import Wrapper from '../Wrapper/Wrapper';
import { useState } from "react";
import './CheatSheets.scss';

const CheatSheets = () => {

  const [isRosterPopUpOpen, setRosterPopUpOpen] = useState(false);
  const [isSchedulesPopUpOpen, setSchedulesPopUpOpen] = useState(false);
  const [isRosterWestPopUpOpen, setRosterWestPopUpOpen] = useState(false);
  const [isSchedulesWestPopUpOpen, setSchedulesWestPopUpOpen] =useState(false);

  const toggleRosterPopUp = () => {
    setRosterPopUpOpen(!isRosterPopUpOpen);
  };

  const toggleSchedulesPopUp = () => {
    setSchedulesPopUpOpen(!isSchedulesPopUpOpen)
  };

  const toggleRosterWestPopUp = () => {
    setRosterWestPopUpOpen(!isRosterWestPopUpOpen);
  };

  const toggleSchedulesWestPopUp = () => {
    setSchedulesWestPopUpOpen(!isSchedulesWestPopUpOpen);
  };
 

  const openLinkInNewWindow = (url) => {
    window.open(url, '_blank');
  };

  return (
    <Wrapper>
      <h2>Cheat Sheets</h2>
      <p className="paragraph">
        Tu trouveras ici en ensemble de liens te permettant de glaner des informations utiles pour t'aider dans tes pronostics
      </p>
      <div className='pop-up-boxes'>
        <div className="rosters">
          <h2>Roster</h2>
          <div className="roster-east">
            <h5 className='pop-up-click' onClick={toggleRosterPopUp}>EAST</h5>
            {isRosterPopUpOpen && (
              <div>
                <ul className='column'>
                  <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/hawks/roster')}>ATL</a></li>
                  <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/celtics/roster')}>BOS</a></li>
                  <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/nets/roste')}>BKN</a></li>
                  <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/hornets/roster')}>CHA</a></li>
                  <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/bulls/roster')}>CHI</a></li>
                </ul>
                <ul className='column'>
                  <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/cavaliers/roster')}>CLE</a></li>
                  <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/pistons/roster')}>DET</a></li>
                  <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/pacers/roster')}>IND</a></li>
                  <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/heat/roster')}>MIA</a></li>
                  <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/bucks/roster')}>MIL</a></li>
                </ul>
                <ul className='column'>
                  <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/knicks/roster')}>NYK</a></li>
                  <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/magic/roster')}>ORL</a></li>
                  <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/sixers/roster')}>PHI</a></li>
                  <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/raptors/roster')}>TOR</a></li>
                  <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/wizards/roster')}>WAS</a></li>
                </ul>
              </div>
            )}
          </div>
          <div className="roster-west">
            <h5 className='pop-up-click' onClick={toggleRosterWestPopUp}>WEST</h5>
            {isRosterWestPopUpOpen && (
              <div>
                <ul className='column'>
                  <li><a onClick={() => openLinkInNewWindow('https://www.mavs.com/team/roster/')}>DAL</a></li>
                  <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/nuggets/roster')}>DEN</a></li>
                  <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/warriors/roster')}>GSW</a></li>
                  <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/rockets/roster')}>HOU</a></li>
                  <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/clippers/roster')}>LAC</a></li>
                </ul>
                <ul className='column'>
                  <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/lakers/team/roster')}>LAL</a></li>
                  <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/grizzlies/roster')}>MEM</a></li>
                  <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/timberwolves/roster')}>MIN</a></li>
                  <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/pelicans/roster')}>NOP</a></li>
                  <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/thunder/roster')}>OKC</a></li>
                </ul>
                <ul className='column'>
                  <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/suns/roster')}>PHX</a></li>
                  <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/blazers/roster')}>POR</a></li>
                  <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/kings/roster')}>SAC</a></li>
                  <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/spurs/roster')}>SAS</a></li>
                  <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/jazz/roster')}>UTA</a></li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="schedules">
          <h2>Schedules</h2>
          <div className="schedules-east">
            <h5 className='pop-up-click' onClick={toggleSchedulesPopUp}>EAST</h5>
            {isSchedulesPopUpOpen && (
              <div>
                <ul className='column'>
                  <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/hawks/schedule')}>ATL</a></li>
                  <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/celtics/schedule')}>BOS</a></li>
                  <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/nets/schedule')}>BKN</a></li>
                  <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/hornets/schedule')}>CHA</a></li>
                  <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/bulls/schedule')}>CHI</a></li>
                </ul>
                <ul className='column'>
                  <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/cavaliers/schedule')}>CLE</a></li>
                  <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/pistons/schedule')}>DET</a></li>
                  <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/pacers/schedule')}>IND</a></li>
                  <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/heat/schedule')}>MIA</a></li>
                  <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/bucks/schedule')}>MIL</a></li>
                </ul>
                <ul className='column'>
                  <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/knicks/schedule')}>NYK</a></li>
                  <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/magic/schedule')}>ORL</a></li>
                  <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/sixers/schedule/')}>PHI</a></li>
                  <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/raptors/schedule')}>TOR</a></li>
                  <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/wizards/schedule')}>WAS</a></li>
                </ul>
              </div>
            )}
          </div>
          <div className="schedules-west">
            <h5 className='pop-up-click' onClick={toggleSchedulesWestPopUp}>WEST</h5>
            {isSchedulesWestPopUpOpen && (
              <div>
                <ul className='column'>
                  <li><a onClick={() => openLinkInNewWindow('https://www.mavs.com/schedule/full-schedule/')}>DAL</a></li>
                  <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/nuggets/schedule')}>DEN</a></li>
                  <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/warriors/schedule')}>GSW</a></li>
                  <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/rockets/schedule')}>HOU</a></li>
                  <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/clippers/schedule')}>LAC</a></li>
                </ul>
                <ul className='column'>
                  <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/lakers/schedule?ls=nav_schedule')}>LAL</a></li>
                  <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/grizzlies/schedule')}>EM</a></li>
                  <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/timberwolves/schedule')}>MIN</a></li>
                  <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/pelicans/schedule')}>NOP</a></li>
                  <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/thunder/schedule')}>OKC</a></li>
                </ul>
                <ul className='column'>
                  <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/suns/schedule')}>PHX</a></li>
                  <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/blazers/schedule')}>POR</a></li>
                  <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/kings/schedule')}>SAC</a></li>
                  <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/spurs/schedule')}>SAS</a></li>
                  <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/jazz/schedule')}>UTA</a></li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <h3 className ='usefull-links'>Liens Utiles</h3> 
      <div className='links'>  
        <div>
          <a onClick={() => openLinkInNewWindow('https://www.youtube.com/channel/UCcMGbm0EYWh1SZZ8MsM75tw')}>
            <h4>NBA Extra</h4>
          </a>
        </div>
        <div>
          <a onClick={() => openLinkInNewWindow('http://www.beinsports.com/france/programmes')}>
            <h4>BeinSport</h4>
          </a>
        </div>
        <div>
          <a onClick={() => openLinkInNewWindow('https://www.basketsession.com/')}>
            <h4>Basket Session</h4>
          </a>
        </div>
        <div>
        <a onClick={() => openLinkInNewWindow('https://www.basketusa.com/')}>
            <h4>Basket USA</h4>
          </a>
        </div>
        <div>
          <a onClick={() => openLinkInNewWindow('http://www.espn.com/nba/injuries')}>
            <h4>Injured Players</h4>
          </a>
        </div>
        <div>
          <a onClick={() => openLinkInNewWindow('https://www.nba.com/standings')}>
            <h4>NBA Standings</h4>
          </a>
        </div>
      </div>
    </Wrapper>
  );
};

export default CheatSheets;