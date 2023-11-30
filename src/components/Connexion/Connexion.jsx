/* eslint-disable react/no-unescaped-entities */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import Wrapper from "../Wrapper/Wrapper";
import Input from "../Utils/Input";
import Strength from "./AddOn/Strength";
import { toastWarning } from "../Toast/ToastSuccess";

import { checkLogin, createDmfc, createUser, setErrorMessage, setInputValue, setMailError, setPasswordError, toggleCreationMode } from "../../actions/user";
import { verifyMail, verifyPassword } from "../../Utils/filters/usersFilter";

import './Connexion.scss';

const Connexion = () => {

  const dispatch = useDispatch();

  const leaguesList = useSelector((state) => state.datas.allLeague);
  const {pseudo, email, password, password2, DMFC, league, league_name, isCreationMode, errorMessage, mailError, passwordError} = useSelector((state) => state.user);

  const leagueOptions = leaguesList.map(({id, leagueName}) => {
    return(
      <option key={id} value={id}>{leagueName}</option>
    )
  });

  useEffect(() => {
    if (password2 !== password) {
      dispatch(setPasswordError('Les mots de passe ne correspondent pas'));
    }
  }, [password, password2]);

  const handleInput = (event) => {
    dispatch(setInputValue(event.target.id, event.target.value));
    dispatch(setErrorMessage(''));
    if (passwordError !== '' || mailError) {
      dispatch(setPasswordError(''));
      dispatch(setMailError(false));
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isCreationMode) {
      if (pseudo !== '') {
        const isErrorMail = verifyMail(email);
        const isErrorPassword = verifyPassword(password);
        if (isErrorPassword) {dispatch(setPasswordError("Le mot de passe doit avoir au moins 8 caractères dont 1 majuscule, 1 minuscule et 1 caractère spécial."));}
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
        <h2>{isCreationMode ? "Créer mon compte" : "Connexion"}</h2>
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
            {(isCreationMode && password !== "") && <Strength password={password} />}
          </div>
          {isCreationMode && <Input className='password' label="Confirmer :" id="password2" type="password" onChange={handleInput} value={password2} placeholder="Confirmation mot de passe" isRequired={true} /> }
          {(isCreationMode && passwordError !== '' ) && <p className="error-message">{passwordError}</p>}
          {isCreationMode &&
          <div className="dmfc-opt">
            <div className="role-opt">
              <div className="check-opt">
                <label htmlFor="player">Joueur :</label>
                <input 
                  type="radio" 
                  id="0" 
                  name="user-role-choice"
                  defaultChecked={true}
                  onChange={() => {dispatch(setInputValue('DMFC', false))}}
                />
              </div>
              {!DMFC && <div className="leagueChoice">
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
              </div> }
            </div>
            <div className="role-opt">
              <div className="check-opt">
                <label htmlFor="dmfc">DMFC :</label>
                <input
                  type="radio" 
                  id="1" 
                  name="user-role-choice"
                  onChange={() => {
                    dispatch(setInputValue('DMFC', true));
                    toast.warning('En tant que DMFC, tu vas gérer une ligue, consulte les règles pour être sûr de ton choix.', toastWarning);
                  }}
                />
              </div>
              {DMFC && <Input 
                label="Nom de ta ligue :"
                id="league_name"
                className="leagueCreation"
                type="league_name"
                onChange={handleInput}
                value={league_name}
                placeholder="Nom de la league"
                isRequired={true} /> }
            </div>
          </div>
          }
          {errorMessage !== '' && <p className="error-message">{errorMessage}</p>}
          <div className="form-btn">
            <button className="validation-btn" type="submit" disabled={isCreationMode ? password2 !== password : false} >{isCreationMode ? "Créer" : "Connexion"} </button>
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