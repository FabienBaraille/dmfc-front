/* eslint-disable react/no-unescaped-entities */
import { useDispatch, useSelector } from "react-redux";
import { checkLogin, createUser, setInputValue, toggleCreationMode } from "../../actions/user";

import Wrapper from "../Wrapper/Wrapper";
import Input from "../Utils/Input";

import './Connexion.scss';

const Connexion = () => {

  const dispatch = useDispatch();
  const leaguesList = useSelector((state) => state.datas.allLeague);

  // Get all inputs content for controlled inputs
  const pseudo = useSelector((state) => state.user.pseudo);
  const email = useSelector((state) => state.user.email);
  const password = useSelector((state) => state.user.password);
  const DMFC = useSelector((state) => state.user.DMFC);
  const league = useSelector((state) => state.user.league);
  const league_name = useSelector((state) => state.user.league_name);
  const isCreationMode = useSelector((state) => state.user.isCreationMode);

  const leagueOptions = leaguesList.map(({id, leagueName}) => {
    return(
      <option key={id} value={leagueName}>{leagueName}</option>
    )
  });

  const handleInput = (event) => {
    const inputName = event.target.id;
    const inputValue = event.target.value;
    dispatch(setInputValue(inputName, inputValue));
  }

  const handleInputCheckbox = (event) => {
    const inputName = event.target.id;
    const inputValue = event.target.checked;
    dispatch(setInputValue(inputName, inputValue));
  }

  const toggleMode = () => {
    isCreationMode ? dispatch(toggleCreationMode(false)) : dispatch(toggleCreationMode(true))
  }

  const handleCreation = (event) => {
    event.preventDefault();
    dispatch(createUser());
  }

  const handleConnexion = (event) => {
    event.preventDefault();
    dispatch(checkLogin());
  }
  
  return (
    <Wrapper name="connexion">
      <h2>Connexion</h2>
      <form onSubmit={isCreationMode ? handleCreation : handleConnexion}>
          <Input label="Login :" htmlFor="pseudo" id="pseudo" type="text" onChange={handleInput} value={pseudo} placeholder="Pseudo"/>
          {isCreationMode &&
            <Input label="Mail :" htmlFor="mail" id="email" type="email" onChange={handleInput} value={email} placeholder="exemple@email.com"/>
          }
          <Input label="Mot de Passe :" htmlFor="password" id="password" type="password" onChange={handleInput} value={password} placeholder="Mot de passe"/>
          {isCreationMode &&
            <>
              <div className="dmfc-opt">
                <label htmlFor="dmfc">DMFC</label>
                <input 
                  type="checkbox" 
                  id="DMFC" 
                  onChange={handleInputCheckbox}
                  value={DMFC}
                  checked={DMFC}
                />
              </div>
              {!DMFC ? 
              <div>
                <label htmlFor="league">Ligue :</label>
                <select 
                  id="league" 
                  placeholder="Nom de la ligue" 
                  onChange={handleInput} 
                  value={league}
                >
                <option>Choisis ta ligue</option>
                {leagueOptions}
                </select>
              </div> :
              <Input label="Créer ma ligue :" htmlFor="league_name" id="league_name" type="league_name" onChange={handleInput} value={league_name} placeholder="Nom de la league"/>}
            </>
          }
          <div className="form-btn">
            <button type="submit">{isCreationMode ? "Créer" : "Connexion"} </button>
            <button 
              type="button" 
              onClick={toggleMode}
            >
              {isCreationMode ? "J'ai déjà un compte" : "Créer un compte"}
            </button>
            {!isCreationMode && <button type="button">J'ai oublié mon mot de passe</button>}
            {/* Faire formulaire rappel identifiant */}
          </div>
      </form>
    </Wrapper>
  )
};

export default Connexion;