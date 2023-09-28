import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCookies } from "../../Utils/cookies/getCookies";

import { setIsLogged } from "../../actions/user";
import { getAllLeague, getUsersList } from "../../actions/datas";

import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';
import Loader from '../Loader/Loader';

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
import Error from '../Error/Error.jsx';
import Footer from '../Footer/Footer';

import './App.scss';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logStatus = getCookies('isLogged');
  
  useEffect(() => {
    dispatch(setIsLogged(logStatus));
  }, []);

  const isLoading = useSelector((state) => state.datas.isLoading);
  const isLogged = useSelector((state) => state.user.isLogged);

  useEffect(() => {
    dispatch(getAllLeague());
    if (isLogged) {
      navigate('/');
      dispatch(getUsersList(1));
    } else {
      navigate('/login');
    }
  }, [isLogged]);

  const userRole = getCookies('role');

  if (isLoading) {
    return (
      <Loader />
    )
  }

  return (
    <>
      <Header />
      {isLogged && <Navbar userRole={userRole} />}
      <main>
        <Routes>
          <Route path='/login' element={
            <>
              <Connexion />
              <SimpleRules />
            </>
          } />
          <Route path='/' element={<Home />} />
          <Route path='/profil' element={<Profil />} />
          <Route path='/creation/SR' element={<RsBetCreation />} />
          <Route path='/scores/SR' element={<BetResult />} />
          <Route path='/rankings' element={<Rankings />} />
          <Route path='/player/:playerId' element={<GeneralStats />} />
          <Route path='/rules' element={<ExtendedRules />} />
          <Route path='/terms-and-conditions' element={<Terms />} />
          <Route path='/player-bet' element={<PlayerBet />} />
          <Route path='/rules' element={<SimpleRules />} />
          <Route path='logout' element={<Logout />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </main>
      <UpButton />
      <Footer />
    </>
  )
}

export default App;
