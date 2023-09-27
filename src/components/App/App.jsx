import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


import { getAllLeague, getUsersList } from "../../actions/datas";

import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';

import Home from "../Home/Home";
import Rankings from "../Rankings/Rankings";
import GeneralStats from "../Stats/GeneralStats";
import ExtendedRules from '../Rules/ExtendedRules.jsx';
import UpButton from './UpButton/UpButton.jsx';
import SimpleRules from "../Rules/SimpleRules";
import Connexion from '../Connexion/Connexion.jsx';
import Error from '../Error/Error.jsx';
import Terms from '../Terms/Terms.jsx';
import RsBetCreation from '../BetCreation/RsBetCreation';
import BetResult from "../BetResult/BetResult";
import PlayerBet from "../PlayerBet/PlayerBet";
import Loader from '../Loader/Loader';
import Profil from "../Profil/Profil";
import Footer from '../Footer/Footer';

import './App.scss';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.datas.isLoading);
  const isLogged = useSelector((state) => state.user.isLogged);

  useEffect(() => {
    dispatch(getAllLeague());
    if (isLogged) {
      navigate('/infos');
      dispatch(getUsersList(1));
    } else {
      navigate('/');
    }
  }, [isLogged]);

  if (isLoading) {
    return (
      <Loader />
    )
  }

  return (
    <>
      <Header />
      {isLogged && <Navbar />}
      <main>
        <Routes>
          <Route path='/' element={
            <>
              <Connexion />
              <SimpleRules />
            </>
          } />
          <Route path='/infos' element={<Home />} />
          <Route path='/creation/SR' element={<RsBetCreation />} />
          <Route path='/scores/SR' element={<BetResult />} />
          <Route path='/rankings' element={<Rankings />} />
          <Route path='/player/:playerId' element={<GeneralStats />} />
          <Route path='/rules' element={<ExtendedRules />} />
          <Route path='/terms-and-conditions' element={<Terms />} />
          <Route path='/player-bet' element={<PlayerBet />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </main>
      <UpButton />
      <Footer />
      <Routes>
        <Route path="/profil" element={<Profil />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/rules" element={<SimpleRules />} />
      </Routes>
    </>
  )
}

export default App;
