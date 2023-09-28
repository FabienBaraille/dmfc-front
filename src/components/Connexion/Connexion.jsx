import { useDispatch, useSelector } from "react-redux";
import { setInputValue, toggleCreationMode } from "../../actions/user";
import Wrapper from "../Wrapper/Wrapper";
import Input from "../Utils/Input";

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
              <Input className="dmfc-opt" label="DMFC" htmlFor="dmfc" type="checkbox" id="DMFC" onChange={handleInputCheckbox} value={DMFC} />
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
              </div>
                <Input label="Mail :" htmlFor="mail" id="email" type="email" onChange={handleInput} value={email} placeholder="exemple@email.com"/>
            </>
          }
          {/* Fin de création */}
            <Input label="Login :" htmlFor="pseudo" id="pseudo" type="text" onChange={handleInput} value={pseudo} placeholder="Pseudo"/>
            <Input label="Mot de Passe :" htmlFor="password" id="password" type="password" onChange={handleInput} value={password} placeholder="Mot de passe"/>
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