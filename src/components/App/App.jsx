import { Route, Routes } from "react-router-dom";

import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';

import ExtendedRules from '../Rules/ExtendedRules.jsx';
import UpButton from './UpButton/UpButton.jsx';
import SimpleRules from "../Rules/SimpleRules";
import Connexion from '../Connexion/Connexion.jsx';
import Error from '../Error/Error.jsx';
import Terms from '../Terms/Terms.jsx';

import Footer from '../Footer/Footer';

import './App.scss';
import { useSelector } from "react-redux";

const App = () => {
  const isLogged = useSelector((state) => state.user.isLogged);
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
            </>} />
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
