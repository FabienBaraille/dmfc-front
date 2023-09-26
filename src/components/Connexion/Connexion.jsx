import { useDispatch, useSelector } from "react-redux";
import { setInputValue, toggleCreationMode } from "../../actions/user";
import Wrapper from "../Wrapper/Wrapper";

import data from "../../data/data";

import './Connexion.scss';

/* eslint-disable react/no-unescaped-entities */
const Connexion = () => {
  const dispatch = useDispatch();

  const pseudo = useSelector((state) => state.user.pseudo);
  const email = useSelector((state) => state.user.email);
  const password = useSelector((state) => state.user.password);
  const DMFC = useSelector((state) => state.user.DMFC);
  const league = useSelector((state) => state.user.league);
  const isCreationMode = useSelector((state) => state.user.isCreationMode)

  const leagueOptions = data.League.map(league => {
    return(
      <option key={league["League name"]} value={league["League name"]}>{league["League name"]}</option>
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

  const handleConnexion = () => {
    isCreationMode ? dispatch(toggleCreationMode(false)) : dispatch(toggleCreationMode(true))
  }
  
  return (
    <Wrapper name="connexion">
      <h2>Connexion</h2>
      <form>
          {/* Création de compte */}
          {isCreationMode &&
            <>
              <div className="dmfc-opt">
                <label htmlFor="dmfc">DMFC</label>
                <input 
                  type="checkbox" 
                  id="DMFC" 
                  onChange={handleInputCheckbox} 
                  value={DMFC}
                />
              </div>
              <div>
                <label htmlFor="league_name">Ligue :</label>
                <select 
                  id="league" 
                  placeholder="Nom de la ligue" 
                  onChange={handleInput} 
                  value={league}
                >
                <option>Choisis ta ligue</option>
                {leagueOptions}
                </select>
              </div>
              <div>
                <label htmlFor="mail">Mail :</label>
                <input 
                  id="email" 
                  type="email" 
                  placeholder="exemple@email.com" 
                  onChange={handleInput} 
                  value={email}
                />
              </div>
            </>
          }
          {/* Fin de création */}
          <div>
            <label htmlFor="pseudo">Login :</label>
            <input 
              id="pseudo" 
              placeholder="Pseudo" 
              type="text" 
              onChange={handleInput} 
              value={pseudo} />
          </div>
          <div>
            <label htmlFor="password">Mot de Passe :</label>
            <input 
              id="password" 
              placeholder="Mot de passe" 
              type="password" 
              onChange={handleInput} 
              value={password} />
          </div>
          <div className="form-btn">
            <button type="submit">{isCreationMode ? "Créer" : "Connexion"} </button>
            <button type="button" onClick={handleConnexion}>{isCreationMode ? "J'ai déjà un compte" : "Créer un compte"}</button>
            {!isCreationMode && <button type="button">J'ai oublié mon mot de passe</button>}
            {/* Faire formulaire rappel identifiant */}
          </div>
      </form>
    </Wrapper>
  )
};

export default Connexion;