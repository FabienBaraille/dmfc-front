import { Route, Routes } from "react-router-dom";

import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';

import ExtendedRules from '../Rules/ExtendedRules.jsx';
import UpButton from './UpButton/UpButton.jsx';
import SimpleRules from "../Rules/SimpleRules";
import Connexion from '../Connexion/Connexion.jsx';
import Error from '../Error/Error.jsx';
import Terms from '../Terms/Terms.jsx';
import RsBetCreation from '../BetCreation/RsBetCreation';
import Profil from "../Profil/Profil";
import Footer from '../Footer/Footer';

import './App.scss';
import { useSelector } from "react-redux";
import Home from "../Home/Home";
import Rankings from "../Rankings/Rankings";

import BetResult from "../BetResult/BetResult";
import PlayerBet from "../PlayerBet/PlayerBet";

const App = () => {
  const isLogged = useSelector((state) => state.user.isLogged); 
  return (
    <>
      <Header />
      {isLogged && <Navbar />}
      <Navbar />
      <main>
        <Routes>
          <Route path='/' element={
            <>
              <Connexion />
              <SimpleRules />
            </>
          } />
          <Route path='/profil' element={<Profil />} />
          <Route path='/connexion' element={<Connexion />} />
          <Route path='/player-bet' element={<PlayerBet />} />
          <Route path='/infos' element={<Home />} />
          <Route path='/creation/SR' element={<RsBetCreation />} />
          <Route path='/rankings' element={<Rankings />} />
          <Route path='/rules' element={<ExtendedRules />} />
          <Route path='/terms-and-conditions' element={<Terms />} />
          <Route path='/player-bet' element={<PlayerBet />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </main>
      <UpButton />
      <Footer />
    </>
  )
}

export default App;
