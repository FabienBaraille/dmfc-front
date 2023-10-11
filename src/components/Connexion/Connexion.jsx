/* eslint-disable react/no-unescaped-entities */
import { useDispatch, useSelector } from "react-redux";

import { checkLogin, createLeague, createUser, setErrorMessage, setInputValue, setMailError, setPasswordError, toggleCreationMode } from "../../actions/user";

import Wrapper from "../Wrapper/Wrapper";
import Input from "../Utils/Input";

import './Connexion.scss';
import Strength from "./AddOn/Strength";
import { verifyMail, verifyPassword } from "../../Utils/filters/usersFilter";

const Connexion = () => {

  const dispatch = useDispatch();

  const leaguesList = useSelector((state) => state.datas.allLeague);
  const pseudo = useSelector((state) => state.user.pseudo);
  const email = useSelector((state) => state.user.email);
  const password = useSelector((state) => state.user.password);
  const DMFC = useSelector((state) => state.user.DMFC);
  const league = useSelector((state) => state.user.league);
  const league_name = useSelector((state) => state.user.league_name);
  const isCreationMode = useSelector((state) => state.user.isCreationMode);

  const errorMessage = useSelector((state) => state.user.errorMessage);
  const mailError = useSelector((state) => state.user.mailError);
  const passwordError = useSelector((state) => state.user.passwordError);

  const leagueOptions = leaguesList.map(({id, leagueName}) => {
    return(
      <option key={id} value={leagueName}>{leagueName}</option>
    )
  });

  const handleInput = (event) => {
    const inputValue = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    dispatch(setInputValue(event.target.id, inputValue));
    dispatch(setErrorMessage(''));
    if (passwordError || mailError) {
      dispatch(setPasswordError(false));
      dispatch(setMailError(false));
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isCreationMode) {
      const isErrorMail = verifyMail(email);
      const isErrorPassword = verifyPassword(password);
      dispatch(setPasswordError(isErrorPassword));
      dispatch(setMailError(isErrorMail));
      if (!isErrorMail && !isErrorPassword) {
        console.log('test');
        if (DMFC) {
          dispatch(createLeague());
        } else {
          dispatch(createUser());
        }
      }
    } else {
      dispatch(checkLogin());
    }
  }
  return (
    <Wrapper name="connexion">
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
          <Input label="Login :" htmlFor="pseudo" id="pseudo" type="text" onChange={handleInput} value={pseudo} placeholder="Pseudo" isRequired={true}/>
          {isCreationMode &&
            <div className="special-input">
              <Input label="Mail :" htmlFor="mail" id="email" type="email" onChange={handleInput} value={email} placeholder="exemple@email.com" isRequired={true}/>
              {mailError && <p className="error-message">Le format du mail n'est pas correct.</p>}
            </div>
          }
          <div className="special-input">
            <Input label="Mot de passe :" htmlFor="password" id="password" type="password" onChange={handleInput} value={password} placeholder="Mot de passe" isRequired={true} />
            {isCreationMode && <Strength password={password} /> }
            {(isCreationMode && passwordError) && <p className="error-message">Le mot de passe doit avoir au moins 8 caractères dont 1 majuscule, 1 minuscule et 1 caractère spécial.</p>}
          </div>
          {isCreationMode &&
            <>
              <div className="dmfc-opt">
                <label htmlFor="dmfc">DMFC</label>
                <input 
                  type="checkbox" 
                  id="DMFC" 
                  onChange={handleInput}
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
              onClick={() => dispatch(toggleCreationMode(!isCreationMode))}
              >
              {isCreationMode ? "J'ai déjà un compte" : "Créer un compte"}
            </button>
            {/* {!isCreationMode && <button type="button">J'ai oublié mon mot de passe</button>} */}
            {/* Faire formulaire rappel identifiant */}
          </div>
      </form>
      {errorMessage !== '' && <p className="error-message">{errorMessage}</p>}
    </Wrapper>
  )
};

export default Connexion;