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
    setSchedulesPopUpOpen(false);
    setRosterWestPopUpOpen(false);
    setSchedulesWestPopUpOpen(false);
  };

  const toggleSchedulesPopUp = () => {
    setSchedulesPopUpOpen(!isSchedulesPopUpOpen);
    setRosterPopUpOpen(false);
    setRosterWestPopUpOpen(false);
    setSchedulesWestPopUpOpen(false);
  };

  const toggleRosterWestPopUp = () => {
    setRosterWestPopUpOpen(!isRosterWestPopUpOpen);
    setRosterPopUpOpen(false);
    setSchedulesPopUpOpen(false);
    setSchedulesWestPopUpOpen(false);
  };

  const toggleSchedulesWestPopUp = () => {
    setSchedulesWestPopUpOpen(!isSchedulesWestPopUpOpen);
    setRosterPopUpOpen(false);
    setSchedulesPopUpOpen(false);
    setRosterWestPopUpOpen(false);
  };
 

  const openLinkInNewWindow = (url) => {
    window.open(url, '_blank');
  };

  return (
    <Wrapper>
      <h2>Infos NBA</h2>
      <p className="paragraph">
        Tu trouveras ici un ensemble de liens te permettant de rassembler des informations utiles pour t'aider dans tes pronostics.
      </p>
        <div className='titles'>
          <h2>Roster</h2>
          <h2>Calendriers</h2>
        </div>
        <div className='pop-up-boxes'>
            <div className="rosters">
              <div className="roster-east">
                <button className='pop-up-click' onClick={toggleRosterPopUp}>EAST</button>
                {isRosterPopUpOpen && (
                  <div className='pop-up-container'>
                    <button className='close-button' onClick={toggleRosterPopUp}>X</button>
                    <ul>
                      <div className='left-column-re'>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/hawks/roster')}>ATL</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/celtics/roster')}>BOS</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/nets/roste')}>BKN</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/hornets/roster')}>CHA</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/bulls/roster')}>CHI</a></li>
                      </div>
                    </ul>
                    <ul>
                      <div className='middle-column-re'>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/cavaliers/roster')}>CLE</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/pistons/roster')}>DET</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/pacers/roster')}>IND</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/heat/roster')}>MIA</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/bucks/roster')}>MIL</a></li>
                      </div>
                    </ul>
                    <ul>
                      <div className='right-column-re'>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/knicks/roster?icmp=int_knicks_roster_parent_nav_190514')}>NYK</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/magic/roster')}>ORL</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/sixers/roster')}>PHI</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/raptors/roster')}>TOR</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/wizards/roster')}>WAS</a></li>
                      </div>
                    </ul>
                  </div>
                )}
              </div>
              <div className="roster-west">
                <button className='pop-up-click' onClick={toggleRosterWestPopUp}>WEST</button>
                {isRosterWestPopUpOpen && (
                  <div className='pop-up-container'>
                    <button className='close-button' onClick={toggleRosterWestPopUp}>X</button>
                    <ul>
                      <div className='left-column-rw'>
                        <li><a onClick={() => openLinkInNewWindow('https://www.mavs.com/team/roster/')}>DAL</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/nuggets/roster')}>DEN</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/warriors/roster')}>GSW</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/rockets/roster')}>HOU</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/clippers/roster')}>LAC</a></li>
                      </div>
                    </ul>
                    <ul>
                      <div className='middle-column-rw'>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/lakers/team/roster-coaches?ls=nav_team')}>LAL</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/grizzlies/roster')}>MEM</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/timberwolves/roster')}>MIN</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/pelicans/roster')}>NOP</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/thunder/roster')}>OKC</a></li>
                      </div>
                    </ul>
                    <ul>
                      <div className='right-column-rw'>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/suns/roster')}>PHX</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/blazers/roster')}>POR</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/kings/roster')}>SAC</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/spurs/roster')}>SAS</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/jazz/roster')}>UTA</a></li>
                      </div>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          <div className='pop-up-boxes'>
            <div className="schedules">
              <div className="schedules-east">
                <button className='pop-up-click' onClick={toggleSchedulesPopUp}>EAST</button>
                {isSchedulesPopUpOpen && (
                  <div className='pop-up-container'>
                    <button className='close-button' onClick={toggleSchedulesPopUp}>X</button>
                    <ul>
                      <div className='left-column-se'>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/hawks/schedule')}>ATL</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/celtics/schedule')}>BOS</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/nets/schedule')}>BKN</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/hornets/schedule')}>CHA</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/bulls/schedule')}>CHI</a></li>
                      </div>
                    </ul>
                    <ul>
                      <div className='middle-column-se'>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/cavaliers/schedule')}>CLE</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/pistons/schedule')}>DET</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/pacers/schedule')}>IND</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/heat/schedule')}>MIA</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/bucks/schedule')}>MIL</a></li>
                      </div>
                    </ul>
                    <ul>
                      <div className='right-column-se'>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/knicks/schedule')}>NYK</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/magic/schedule')}>ORL</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/sixers/schedule/')}>PHI</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/raptors/schedule')}>TOR</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/wizards/schedule')}>WAS</a></li>
                      </div>
                    </ul>
                  </div>
                )}
              </div>
              <div className="schedules-west">
                <button className='pop-up-click' onClick={toggleSchedulesWestPopUp}>WEST</button>
                {isSchedulesWestPopUpOpen && (
                  <div className='pop-up-container'>
                <button className='close-button' onClick={toggleSchedulesWestPopUp}>X</button>
                    <ul>
                      <div className='left-column-sw'>
                        <li><a onClick={() => openLinkInNewWindow('https://www.mavs.com/schedule/full-schedule/')}>DAL</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/nuggets/schedule')}>DEN</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/warriors/schedule')}>GSW</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/rockets/schedule')}>HOU</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/clippers/schedule')}>LAC</a></li>
                      </div>
                    </ul>
                    <ul>
                      <div className='middle-column-sw'>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/lakers/schedule?ls=nav_schedule')}>LAL</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/grizzlies/schedule')}>EM</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/timberwolves/schedule')}>MIN</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/pelicans/schedule')}>NOP</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/thunder/schedule')}>OKC</a></li>
                      </div>
                    </ul>
                    <ul>
                      <div className='right-column-sw'>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/suns/schedule')}>PHX</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/blazers/schedule')}>POR</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/kings/schedule')}>SAC</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/spurs/schedule')}>SAS</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/jazz/schedule')}>UTA</a></li>
                      </div>
                    </ul>
                  </div>
                )}
              </div>
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