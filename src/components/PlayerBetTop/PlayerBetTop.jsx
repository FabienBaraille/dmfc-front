import { useDispatch, useSelector } from 'react-redux';
import { phaseFilter } from '../../Utils/filters/roundFilter';
import Wrapper from '../Wrapper/Wrapper';
import './PlayerBetTop.scss';
import TopTenList from '../TopTen/TopTenList';
import { teamsByConf } from '../../Utils/filters/teamFilter';
import { useEffect } from 'react';
import { getToptenBet } from '../../actions/datas';
import LoadElmt from '../Loader/LoadElmt';
import { betByTopId } from '../../Utils/filters/predictionFilter';
import { transformDate } from '../../Utils/stats/calcDate';

const PlayerBetTop = () => {

  const dispatch = useDispatch();

  const rounds = phaseFilter(useSelector((state) => state.datas.rounds), 'TOP');
  const {allTeams, isLoadingSR, topTenBet} = useSelector((state) => state.datas);
  const loggedUserId = useSelector((state) => state.user.loggedUser.id);
  const {isLoadingGame} = useSelector((state) => state.bet);

  const currentRound = rounds[rounds.length-1];
  const toptens = currentRound.topTens;

  const eastTeams = teamsByConf(allTeams, 'Eastern');
  const westTeams = teamsByConf(allTeams, 'Western');

  const eastBet = betByTopId(toptens, topTenBet, 'Eastern');
  const westBet = betByTopId(toptens, topTenBet, 'Western');

  const topDeadline = transformDate(toptens[0].deadline, 'bet');

  useEffect(() => {
    dispatch(getToptenBet(loggedUserId));
  }, [])

  if (isLoadingSR || isLoadingGame) {
    return <LoadElmt />
  }

  return (
    <section className='bet-top'>
      <Wrapper name="title-top" >
        <h5>{`Nom du Round : ${currentRound.name}`}</h5>
        <h5>{ toptens.length !== 0 ? `Deadline : ${topDeadline}` : "Les tops 10 n'ont pas été crées pour ce round." }</h5>
      </Wrapper>
      {toptens.length !== 0 &&
        <div className='topten-all'>
          <TopTenList topten={toptens[0]} teams={eastTeams} conference={'Est'} betTop={eastBet} isBet={true} />
          <TopTenList topten={toptens[1]} teams={westTeams} conference={'Ouest'} betTop={westBet} isBet={true} />
        </div>
      }
    </section>
  )};
export default PlayerBetTop;