import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { toastSuccess } from "../Toast/ToastDMFC";
import Wrapper from '../Wrapper/Wrapper';
import TopTenList from '../TopTen/TopTenList';
import LoadElmt from '../Loader/LoadElmt';
import EmptyBetPlayer from '../PlayerBetSR/EmptyBetPlayer';

import { teamsByConf } from '../../Utils/filters/teamFilter';
import { phaseFilter } from '../../Utils/filters/roundFilter';
import { betByTopId } from '../../Utils/filters/predictionFilter';
import { transformDate } from '../../Utils/stats/calcDate';

import { getToptenBet } from '../../actions/datas';
import { setIsBet } from '../../actions/bet';

import './PlayerBetTop.scss';

const PlayerBetTop = () => {

  const dispatch = useDispatch();

  const rounds = phaseFilter(useSelector((state) => state.datas.rounds), 'TOP');
  const {allTeams, isLoadingSR, topTenBet} = useSelector((state) => state.datas);
  const loggedUserId = useSelector((state) => state.user.loggedUser.id);
  const {isLoadingGame, isBet, betStatus} = useSelector((state) => state.bet);

  const eastTeams = teamsByConf(allTeams, 'Eastern');
  const westTeams = teamsByConf(allTeams, 'Western');

  let currentRound = [];
  let toptens = [];
  let eastBet = [];
  let westBet = [];
  let topDeadline = '';

  if (rounds.length !== 0) {
    currentRound = rounds[rounds.length-1];
    if (currentRound.topTens.length !== 0) {
      toptens = currentRound.topTens;
      eastBet = betByTopId(toptens, topTenBet, 'Eastern');
      westBet = betByTopId(toptens, topTenBet, 'Western');
      topDeadline = transformDate(toptens[0].deadline, 'bet');
    }
  }

  useEffect(() => {
    dispatch(getToptenBet(loggedUserId));
  }, [])

  useEffect(() => {
    if (!isLoadingGame && isBet) {
      toast.success(`Pronostic ${betStatus} avec succès.`, toastSuccess);
        setTimeout(() => {
          dispatch(setIsBet(false, ''));
        }, 2001);
    }
  }, [isBet])

  if (isLoadingSR || isLoadingGame) {
    return <LoadElmt />
  }

  if (rounds.length === 0 || currentRound.topTens.length === 0) {
    return (
      <EmptyBetPlayer />
    )
  }

  return (
    <section className='bet-top'>
      <Wrapper name="title-top" >
        <h5>{`Nom du Round : ${currentRound.name}`}</h5>
        <h5>{`Deadline : ${topDeadline}`}</h5>
      </Wrapper>
      {toptens.length !== 0 &&
        <div className='topten-all'>
          <TopTenList topten={toptens[1]} teams={westTeams} conference={'Ouest'} betTop={westBet} isBet={true} />
          <TopTenList topten={toptens[0]} teams={eastTeams} conference={'Est'} betTop={eastBet} isBet={true} />
        </div>
      }
    </section>
  )};
export default PlayerBetTop;