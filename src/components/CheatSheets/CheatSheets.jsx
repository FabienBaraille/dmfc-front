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
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/hawks/roster')} rel="noopener noreferrer">ATL</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/celtics/roster')} rel="noopener noreferrer">BOS</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/nets/roste')} rel="noopener noreferrer">BKN</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/hornets/roster')} rel="noopener noreferrer">CHA</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/bulls/roster')} rel="noopener noreferrer">CHI</a></li>
                      </div>
                    </ul>
                    <ul>
                      <div className='middle-column-re'>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/cavaliers/roster')} rel="noopener noreferrer">CLE</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/pistons/roster')} rel="noopener noreferrer">DET</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/pacers/roster')}  rel="noopener noreferrer">IND</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/heat/roster')} rel="noopener noreferrer">MIA</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/bucks/roster')} rel="noopener noreferrer">MIL</a></li>
                      </div>
                    </ul>
                    <ul>
                      <div className='right-column-re'>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/knicks/roster?icmp=int_knicks_roster_parent_nav_190514')}   rel="noopener noreferrer">NYK</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/magic/roster')} rel="noopener noreferrer">ORL</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/sixers/roster')} rel="noopener noreferrer">PHI</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/raptors/roster')} rel="noopener noreferrer">TOR</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/wizards/roster')} rel="noopener noreferrer">WAS</a></li>
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
                        <li><a onClick={() => openLinkInNewWindow('https://www.mavs.com/team/roster/')} rel="noopener noreferrer">DAL</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/nuggets/roster')} rel="noopener noreferrer">DEN</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/warriors/roster')} rel="noopener noreferrer">GSW</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/rockets/roster')} rel="noopener noreferrer">HOU</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/clippers/roster')} rel="noopener noreferrer">LAC</a></li>
                      </div>
                    </ul>
                    <ul>
                      <div className='middle-column-rw'>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/lakers/team/roster-coaches?ls=nav_team')}   rel="noopener noreferrer">LAL</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/grizzlies/roster')} rel="noopener noreferrer">MEM</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/timberwolves/roster')} rel="noopener noreferrer">MIN</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/pelicans/roster')} rel="noopener noreferrer">NOP</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/thunder/roster')} rel="noopener noreferrer">OKC</a></li>
                      </div>
                    </ul>
                    <ul>
                      <div className='right-column-re'>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/knicks/roster?icmp=int_knicks_roster_parent_nav_190514')}   rel="noopener noreferrer">NYK</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/magic/roster')} rel="noopener noreferrer">ORL</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/sixers/roster')} rel="noopener noreferrer">PHI</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/raptors/roster')} rel="noopener noreferrer">TOR</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/wizards/roster')} rel="noopener noreferrer">WAS</a></li>
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
                    <li><a onClick={() => openLinkInNewWindow('https://www.mavs.com/team/roster/')} rel="noopener noreferrer">DAL</a></li>
                    <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/nuggets/roster')} rel="noopener noreferrer">DEN</a></li>
                    <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/warriors/roster')} rel="noopener noreferrer">GSW</a></li>
                    <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/rockets/roster')} rel="noopener noreferrer">HOU</a></li>
                    <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/clippers/roster')} rel="noopener noreferrer">LAC</a></li>
                  </div>
                </ul>
                <ul>
                  <div className='middle-column-rw'>
                    <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/lakers/team/roster-coaches?ls=nav_team')} rel="noopener noreferrer">LAL</a></li>
                    <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/grizzlies/roster')} rel="noopener noreferrer">MEM</a></li>
                    <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/timberwolves/roster')} rel="noopener noreferrer">MIN</a></li>
                    <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/pelicans/roster')} rel="noopener noreferrer">NOP</a></li>
                    <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/thunder/roster')} rel="noopener noreferrer">OKC</a></li>
                  </div>
                </ul>
                <ul>
                  <div className='right-column-rw'>
                    <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/suns/roster')} rel="noopener noreferrer">PHX</a></li>
                    <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/blazers/roster')} rel="noopener noreferrer">POR</a></li>
                    <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/kings/roster')} rel="noopener noreferrer">SAC</a></li>
                    <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/spurs/roster')} rel="noopener noreferrer">SAS</a></li>
                    <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/jazz/roster')} rel="noopener noreferrer">UTA</a></li>
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
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/hawks/schedule')} rel="noopener noreferrer">ATL</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/celtics/schedule')} rel="noopener noreferrer">BOS</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/nets/schedule')} rel="noopener noreferrer">BKN</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/hornets/schedule')} rel="noopener noreferrer">CHA</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/bulls/schedule')} rel="noopener noreferrer">CHI</a></li>
                      </div>
                    </ul>
                    <ul>
                      <div className='middle-column-se'>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/cavaliers/schedule')} rel="noopener noreferrer">CLE</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/pistons/schedule')} rel="noopener noreferrer">DET</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/pacers/schedule')} rel="noopener noreferrer">IND</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/heat/schedule')} rel="noopener noreferrer">MIA</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/bucks/schedule')} rel="noopener noreferrer">MIL</a></li>
                      </div>
                    </ul>
                    <ul>
                      <div className='right-column-se'>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/knicks/schedule')} rel="noopener noreferrer">NYK</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/magic/schedule')} rel="noopener noreferrer">ORL</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/sixers/schedule/')} rel="noopener noreferrer">PHI</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/raptors/schedule')} rel="noopener noreferrer">TOR</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/wizards/schedule')} rel="noopener noreferrer">WAS</a></li>
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
                        <li><a onClick={() => openLinkInNewWindow('https://www.mavs.com/schedule/full-schedule/')} rel="noopener noreferrer">DAL</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/nuggets/schedule')} rel="noopener noreferrer">DEN</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/warriors/schedule')} rel="noopener noreferrer">GSW</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/rockets/schedule')} rel="noopener noreferrer">HOU</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/clippers/schedule')} rel="noopener noreferrer">LAC</a></li>
                      </div>
                    </ul>
                    <ul>
                      <div className='middle-column-sw'>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/lakers/schedule?ls=nav_schedule')} rel="noopener noreferrer">LAL</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/grizzlies/schedule')} rel="noopener noreferrer">EM</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/timberwolves/schedule')} rel="noopener noreferrer">MIN</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/pelicans/schedule')} rel="noopener noreferrer">NOP</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/thunder/schedule')} rel="noopener noreferrer">OKC</a></li>
                      </div>
                    </ul>
                    <ul>
                      <div className='right-column-sw'>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/suns/schedule')} rel="noopener noreferrer">PHX</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/blazers/schedule')} rel="noopener noreferrer">POR</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/kings/schedule')} rel="noopener noreferrer">SAC</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/spurs/schedule')} rel="noopener noreferrer">SAS</a></li>
                        <li><a onClick={() => openLinkInNewWindow('https://www.nba.com/jazz/schedule')} rel="noopener noreferrer">UTA</a></li>
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
              <a onClick={() => openLinkInNewWindow('https://www.youtube.com/channel/UCcMGbm0EYWh1SZZ8MsM75tw')} rel="noopener noreferrer">
                <h4>NBA Extra</h4>
              </a>
            </div>
            <div>
              <a onClick={() => openLinkInNewWindow('http://www.beinsports.com/france/programmes')} rel="noopener noreferrer">
                <h4>BeinSport</h4>
              </a>
            </div>
            <div>
              <a onClick={() => openLinkInNewWindow('https://www.basketsession.com/')} rel="noopener noreferrer">
                <h4>Basket Session</h4>
              </a>
            </div>
            <div>
             <a onClick={() => openLinkInNewWindow('https://www.basketusa.com/')} rel="noopener noreferrer">
                <h4>Basket USA</h4>
              </a>
            </div>
            <div>
              <a onClick={() => openLinkInNewWindow('http://www.espn.com/nba/injuries')} rel="noopener noreferrer">
                <h4>Injured Players</h4>
              </a>
            </div>
            <div>
              <a onClick={() => openLinkInNewWindow('https://www.nba.com/standings')} rel="noopener noreferrer">
                <h4>NBA Standings</h4>
              </a>
            </div>
        </div>
      </Wrapper>
    );
  };

export default CheatSheets;