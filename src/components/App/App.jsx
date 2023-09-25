// import ExtendedRules from '../Rules/ExtendedRules.jsx';
import UpButton from './UpButton/UpButton.jsx';
import SimpleRules from '../Rules/ExtendedRules.jsx';
import Connexion from '../Connexion/Connexion.jsx'
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>  
      <Routes>
        <Route path='/' element={
          <>
            <Connexion />
            <SimpleRules />
          </>} />
      </Routes>
      <UpButton />
    </>
  )
}

export default App;
