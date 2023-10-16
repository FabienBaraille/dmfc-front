import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from 'react-toastify';

import { getCookies } from "../../Utils/cookies/getCookies";

import { setInputValue, setIsCreated, setIsLogged, setUserInfos, toggleCreationMode } from "../../actions/user";
import { getAllLeague, getDatasStart } from "../../actions/datas";

import DMFCRoute from "./ProtectedRoute/DMFCRoute";
import PlayerRoute from "./ProtectedRoute/PlayerRoute";
import PlayerNARoute from "./ProtectedRoute/PlayerNARoute";

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
import RoundStats from "../Stats/RoundsStats";
import EmptyBet from "../BetResult/EmptyBet";
import CheatSheets from '../CheatSheets/CheatSheets';

import 'react-toastify/dist/ReactToastify.css';

import './App.scss'

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
  const isLoadingStart = useSelector((state) => state.datas.isLoadingStart);
  const targetKick = useSelector((state) => state.datas.targetKick);
  const isLogged = useSelector((state) => state.user.isLogged);
  const isCreated = useSelector((state) => state.user.created);
  const isConfirmationVisible = useSelector((state) => state.league.isConfirmationVisible);
  const rounds = useSelector((state) => state.datas.rounds);
  const userRole = useSelector((state) => state.user.loggedUser);

  useEffect(() => {
    dispatch(getAllLeague());
    if (isLogged) {
      if (userRole.roles[0] === "ROLE_JOUEUR_NA") {
        navigate('/profil');
      } else {
        navigate('/');
        dispatch(setInputValue('password', ''));
        dispatch(getDatasStart());
      }
    } else {
      navigate('/login');
      dispatch(toggleCreationMode(false));
    }
  }, [isLogged, isCreated]);

  if (isLoading || isLoadingStart) {
    return (
      <LoadElmt />
    )
  }

  return (
    <>
      <Header />
      {isLogged && <Navbar />}
      <main>
      {isConfirmationVisible && <Modal player={targetKick} />}
        <Routes>
          <Route path='/login' element={
            <>
              <Connexion />
              <SimpleRules />
            </>
          } />
          <Route path='/profil' element={<Profil />} />
          <Route element={<PlayerNARoute />}>
            <Route path='/' element={<Home />} />
            <Route path='/rankings' element={<Rankings />} />
            <Route path='/player/:playerName' element={<GeneralStats />} />
            <Route element={<PlayerRoute />}>
              {/* Rajouter ici les routes concernant que le joueur */}
              <Route path='/player-bet' element={<PlayerBet />} />
            </Route>
            <Route element={<DMFCRoute />}>
              {/* Rajouter ici les routes concernant uniquement le DMFC */}
              <Route path='/creation/SR' element={<RsBetCreation />} />
              <Route path='/scores/SR' element={rounds.length == 0 ? <EmptyBet /> : <BetResult />} />
              <Route path='/league-management' element={<LeagueManagement />} />
            </Route>
            <Route path='/roundsStat' element={<RoundStats />} />
            <Route path='/cheatsheets' element={<CheatSheets />} />
          </Route>
          <Route path='/rules' element={<ExtendedRules isLogged={isLogged} />} />
          <Route path='/terms-and-conditions' element={<Terms isLogged={isLogged} />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/Error403' element={<Error403 />} />
          <Route path='*' element={<Error404 />} />
        </Routes>
      </main>
      <ToastContainer />
      <UpButton />
      <Footer />
    </>
  )
}

export default App;
