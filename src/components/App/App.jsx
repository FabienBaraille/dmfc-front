import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

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

import Footer from '../Footer/Footer';

import './App.scss';

import BetResult from "../BetResult/BetResult";

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
              <BetResult />
              {/* <Connexion />
              <SimpleRules /> */}
            </>
          } />
          <Route path='/infos' element={<Home />} />
          <Route path='/creation/SR' element={<RsBetCreation />} />
          <Route path='/rankings' element={<Rankings />} />
          <Route path='/player/:playerName' element={<GeneralStats />} />
          <Route path='/rules' element={<ExtendedRules />} />
          <Route path='/terms-and-conditions' element={<Terms />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </main>
      <UpButton />
      <Footer />
    </>
  )
}

export default App;
