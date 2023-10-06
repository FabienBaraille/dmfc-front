import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCookies } from "../../Utils/cookies/getCookies";

import { setIsCreated, setIsLogged, setUserInfos, toggleCreationMode } from "../../actions/user";
import { getAllLeague, getRounds, getSeason, getAllTeams, getUsersList } from "../../actions/datas";

import DMFCRoute from "./ProtectedRoute/DMFCRoute";
import PlayerRoute from "./ProtectedRoute/PlayerRoute";

import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';
import LoadElmt from '../Loader/LoadElmt';

import Home from "../Home/Home";
import Rankings from "../Rankings/Rankings";
import GeneralStats from "../Stats/GeneralStats";
import ExtendedRules from '../Rules/ExtendedRules.jsx';
import UpButton from './UpButton/UpButton.jsx';
import SimpleRules from "../Rules/SimpleRules";
import Connexion from '../Connexion/Connexion.jsx';
import Terms from '../Terms/Terms.jsx';
import RsBetCreation from '../BetCreation/RsBetCreation';
import BetResult from "../BetResult/BetResult";
import PlayerBet from "../PlayerBet/PlayerBet";
import Profil from "../Profil/Profil";
import Logout from "../Connexion/Logout";
import Error404 from '../Error/Error404.jsx';
import Error403 from '../Error/Error403.jsx';
import Footer from '../Footer/Footer';
import LeagueManagement from "../LeagueManagement/LeagueManagement";
import Modal from "../Utils/Modal/Modal";

import './App.scss';
import { getNews } from "../../actions/news";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logStatus = getCookies('isLogged') === 'true';
  
  useEffect(() => {
    dispatch(setIsCreated(false));
    dispatch(setIsLogged(logStatus));
    if (logStatus) {
      const userInfos = getCookies('userInfos');
      dispatch(setUserInfos(JSON.parse(userInfos)));
    }
  }, []);

  const isLoading = useSelector((state) => state.datas.isLoading);
  const isLogged = useSelector((state) => state.user.isLogged);
  const isCreated = useSelector((state) => state.user.created);
  const isConfirmationVisible = useSelector((state) => state.league.isConfirmationVisible);

  useEffect(() => {
    dispatch(getAllLeague());
    if (isLogged) {
      navigate('/');
      dispatch(getAllTeams());
      dispatch(getUsersList());
      dispatch(getNews());
      dispatch(getRounds());
      dispatch(getSeason());
    } else {
      navigate('/login');
      dispatch(toggleCreationMode(false));
    }
  }, [isLogged, isCreated]);

  if (isLoading) {
    return (
      <LoadElmt />
    )
  }

  return (
    <>
      <Header />
      {isLogged && <Navbar />}
      <main>
      {isConfirmationVisible && <Modal player="Tocard" />}
        <Routes>
          <Route path='/login' element={
            <>
              <Connexion />
              <SimpleRules />
            </>
          } />
          <Route path='/' element={<Home />} />
          <Route path='/profil' element={<Profil />} />
          <Route path='/rankings' element={<Rankings />} />
          <Route path='/player/:playerName' element={<GeneralStats />} />
          <Route path='/rules' element={<ExtendedRules isLogged={isLogged} />} />
          <Route path='/terms-and-conditions' element={<Terms isLogged={isLogged} />} />
          <Route element={<PlayerRoute />}>
            {/* Rajouter ici les routes concernant que le joueur */}
            <Route path='/player-bet' element={<PlayerBet />} />
          </Route>
          <Route element={<DMFCRoute />}>
            {/* Rajouter ici les routes concernant uniquement le DMFC */}
            <Route path='/creation/SR' element={<RsBetCreation />} />
            <Route path='/scores/SR' element={<BetResult />} />
            <Route path='/league-management' element={<LeagueManagement />} />
          </Route>
          <Route path='/rules' element={<SimpleRules />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/Error403' element={<Error403 />} />
          <Route path='*' element={<Error404 />} />
        </Routes>
      </main>
      <UpButton />
      <Footer />
    </>
  )
}

export default App;
