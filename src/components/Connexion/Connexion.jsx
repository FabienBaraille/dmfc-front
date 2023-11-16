/* eslint-disable react/no-unescaped-entities */
import { useDispatch, useSelector } from "react-redux";

import Wrapper from "../Wrapper/Wrapper";
import Input from "../Utils/Input";
import Strength from "./AddOn/Strength";

import { checkLogin, createDmfc, createUser, setErrorMessage, setInputValue, setMailError, setPasswordError, toggleCreationMode } from "../../actions/user";
import { verifyMail, verifyPassword } from "../../Utils/filters/usersFilter";

import './Connexion.scss';

const Connexion = () => {

  const dispatch = useDispatch();

  const leaguesList = useSelector((state) => state.datas.allLeague);
  const {pseudo, email, password, DMFC, league, league_name, isCreationMode, errorMessage, mailError, passwordError} = useSelector((state) => state.user);

  const leagueOptions = leaguesList.map(({id, leagueName}) => {
    return(
      <option key={id} value={id}>{leagueName}</option>
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
      if (pseudo !== '') {
        const isErrorMail = verifyMail(email);
        const isErrorPassword = verifyPassword(password);
        dispatch(setPasswordError(isErrorPassword));
        dispatch(setMailError(isErrorMail));
        if (!isErrorMail && !isErrorPassword) {
          if (DMFC) {
            if (!league_name !== '') {
              dispatch(createDmfc());
            } else {
              dispatch(setErrorMessage('Veuillez renseigner tous les champs'));
            }
          } else {
            dispatch(createUser());
          }
        }
      } else {
        dispatch(setErrorMessage('Veuillez renseigner tous les champs'));
      }
    } else {
      dispatch(checkLogin());
    }
  }

  return (
      <Wrapper name="connexion">
        <h2>Connexion</h2>
        <form onSubmit={handleSubmit}>
            <Input label="Login :" id="pseudo" className="login" type="text" onChange={handleInput} value={pseudo} placeholder="Pseudo" isRequired={true}/>
            {isCreationMode &&
              <div className="special-input mailContainer">
                <Input label="Mail :" id="email" type="email" onChange={handleInput} value={email} placeholder="exemple@email.com" isRequired={true}/>
                {mailError && <p className="error-message">Le format du mail n'est pas correct.</p>}
              </div>
            }
          <div className="special-input" id="passwordInput">
            <Input className='password' label="Mot de passe :" id="password" type="password" onChange={handleInput} value={password} placeholder="Mot de passe" isRequired={true} />
            {(isCreationMode && password !== "") && <Strength password={password} /> }
          </div>
          {(isCreationMode && passwordError) && <p className="error-message">Le mot de passe doit avoir au moins 8 caractères dont 1 majuscule, 1 minuscule et 1 caractère spécial.</p>}
          {isCreationMode &&
            <>
              <div className="dmfc-opt">
                <label htmlFor="dmfc">DMFC :</label>
                <input 
                  type="checkbox" 
                  id="DMFC" 
                  onChange={handleInput}
                  value={DMFC}
                  checked={DMFC}
                />
              </div>
              {!DMFC ? 
              <div className="leagueChoice">
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
              <Input 
                label="Créer ma ligue :"
                id="league_name"
                className="leagueCreation"
                type="league_name"
                onChange={handleInput}
                value={league_name}
                placeholder="Nom de la league"
                isRequired={true} />}
            </>
          }
          {errorMessage !== '' && <p className="error-message">{errorMessage}</p>}
          <div className="form-btn">
            <button type="submit">{isCreationMode ? "Créer" : "Connexion"} </button>
            <button 
              type="button" 
              onClick={() => dispatch(toggleCreationMode(!isCreationMode))}
              >
              {isCreationMode ? "J'ai déjà un compte" : "Créer un compte"}
            </button>
            {!isCreationMode && <a className="forgotten" href="https://api.dmfc-game.fr/public/reset-password">Mot de passe oublié</a>}
          </div>
      </form>
    </Wrapper>
  )
};

export default Connexion;