// import ExtendedRules from '../Rules/ExtendedRules.jsx';
import UpButton from './UpButton/UpButton.jsx';
import Header from '../Header/Header.jsx'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
import SimpleRules from '../Rules/ExtendedRules.jsx';
import Connexion from '../Connexion/Connexion.jsx'
import Profil from '../Profil/Profil.jsx'
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>  
      <Header />
      <Navbar />
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
