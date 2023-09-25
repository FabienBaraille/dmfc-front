import ExtendedRules from '../Rules/ExtendedRules.jsx';
import UpButton from './UpButton/UpButton.jsx';
import Connexion from '../Connexion/Connexion.jsx'
import Creation from '../UserCreation/UserCreation.jsx'
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>  
      <Routes>
      </Routes>
      <Connexion />
      <Creation />
    </>
  )
}

export default App;
