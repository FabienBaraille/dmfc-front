/* eslint-disable react/no-unescaped-entities */
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import { updateUserProfile, setInputValue, setMailError, resetStore, updateUsername } from '../../actions/user';
import { saveFavoriteTeam } from '../../actions/teams';
import { verifyMail } from "../../Utils/filters/usersFilter";

import { toastSucess, toastWarning } from "../Toast/ToastSuccess";
import Wrapper from '../Wrapper/Wrapper';
import Input from "../Utils/Input";
import Strength from "../Connexion/AddOn/Strength";

import './Profil.scss';

function Profil() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const teamsList = useSelector((state) => state.datas.allTeams);
  const loggedUser = useSelector((state) => state.user.loggedUser);
  const team = useSelector((state) => state.teams.favoriteTeam);
  const leaguesList = useSelector((state) => state.datas.allLeague);
  const leagueName = loggedUser.league_id ? loggedUser.league_id.leagueName : 'N/A';
  const league = useSelector((state) => state.user.league);

  useEffect(() => {
    const favoriteTeam = localStorage.getItem('favoriteTeam');
    if (favoriteTeam) {
      dispatch(saveFavoriteTeam(favoriteTeam));
    }
    dispatch(setInputValue('pseudo', loggedUser.username));
    dispatch(setInputValue('email', loggedUser.email));
  }, []);

  const pseudo = useSelector((state) => state.user.pseudo);
  const email = useSelector((state) => state.user.email);
  const password = useSelector((state) => state.user.password);
  const mailError = useSelector((state) => state.user.mailError);

  const teamOptions = teamsList.map(({ id, name }) => {
    return (
      <option key={id} value={id}>
        {name}
      </option>
    );
  });
  const leagueOptions = leaguesList.map(({id, leagueName}) => {
    return(
      <option key={id} value={id}>{leagueName}</option>
    )
  });

  const handleInput = (event) => {
    dispatch(setInputValue(event.target.id, event.target.value));
  };

  const handleTeamChange = (event) => {
    const selectedTeam = event.target.value;
    dispatch(saveFavoriteTeam(selectedTeam));
    localStorage.setItem('favoriteTeam', selectedTeam);
  };

  const handleSubmit = async (event, paramName) => {
    event.preventDefault();
    let isErrorMail = false;
    if (email !== loggedUser.email) {
      isErrorMail = verifyMail(email);
      dispatch(setMailError(isErrorMail));
    }
    console.log(isErrorMail);
    if (!isErrorMail) {
      const updatedUserData = {
        username: pseudo,
        email: email,
        password: password,
        team: team,
      };
      console.log(updatedUserData)
      if (pseudo !== loggedUser.username) {
        toast.warning('Afin de changer de pseudo, vous allez être déconnecté !', toastWarning);
        setTimeout(() => {
          document.cookie = `isLogged=;expires=Thu, 01 Jan 1970 00:00:00 UTC`;
          document.cookie = `userInfos=;expires=Thu, 01 Jan 1970 00:00:00 UTC`;
          dispatch(updateUsername(pseudo));
          dispatch(resetStore());
          navigate('/');
        }, 2005);
      } else {
        const updateComplete = dispatch(updateUserProfile(updatedUserData));
        if (updateComplete) {
          toast.success(`${paramName} mis à jour avec succès`, toastSucess) 
        }
      }
    }
  };
  const handleLeagueChange = event => {
    event.preventDefault();
    dispatch(updateUserProfile({ league: league }));
  }

  if (loggedUser.roles[0] === "ROLE_JOUEUR_NA") {
    if (loggedUser.league_id === null) {
      return (
        <Wrapper name="profil-page">
          <h3>Vous n'avez pas de ligue, merci d'en choisir une pour pouvoir jouer.</h3>
          <form onSubmit={handleLeagueChange}>
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
            <button type="submit">Envoyer la demande</button>
          </form>
        </Wrapper>
      )
    }
    return (
      <Wrapper name="profil-page">
        <h3>En attente de validation de ton affiliation par le DMFC de la ligue {leagueName}.</h3>
      </Wrapper>
    )
  }

  return (
    <Wrapper name="profil-page">
      <div className ="profil">
        <h3>Profil</h3>
        <p>Email: <span className="perso">{loggedUser.email}</span></p>
        <p>Pseudo: <span className="perso">{loggedUser.username}</span></p>
        <p>Score: <span className="perso">{loggedUser.score || 'NULL'}</span></p>
        <p>Ma Ligue: <span className="perso">{leagueName}</span></p>
        <p>Équipe Préférée: <span className="perso">{loggedUser.team !== null ? loggedUser.team.name : 'Non choisi'}</span></p>
      </div>
      <form className="change-info" onSubmit={handleSubmit}>
        <h3>Changer Mes Paramètres</h3>
        <div>
          <div className="special-input">
            <Input label="Email:" htmlFor="email" id="email" type="email" name="email" value={email} onChange={handleInput} placeholder="changer ton email" isRequired={true}/>
            {mailError && <p className="error-message">Le format du mail n'est pas correct.</p>}
          </div>
          <div className="form-btn">
            <button type="submit" onClick={(event) => handleSubmit(event, 'email')}>Soumettre</button>
          </div>
        </div>
        <div>
          <div className="special-input">
            <Input label="Mot de Passe:" htmlFor="mot de passe" id="password" type="password" name="password" value={password} onChange={handleInput} placeholder="changer ton mot de passe"/>
            <Strength password={password} />
          </div>
          <div className="form-btn">
          <button type="submit" onClick={(event) => handleSubmit(event, 'mot de passe')}>Soumettre</button>
          </div>
        </div>
        <div>
          <Input label="Pseudo:" htmlFor="pseudo" id="pseudo" type="text" name="username" value={pseudo} onChange={handleInput} placeholder="change ton pseudo"/>
          <div className="form-btn">
            <button type="submit" onClick={(event) => handleSubmit(event, 'pseudo')}>Soumettre</button>
          </div>
        </div>
        <div>
          <label>Équipe Préférée: </label>
          <select name="team" id="team" onChange={handleTeamChange} value={team}>
            <option value="">Changer ta équipe préférée</option>
            {teamOptions}
          </select>
          <div className="form-btn">
            <button type="submit" onClick={(event) => handleSubmit(event, 'équipe préférée')}>Soumettre</button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
  }


export default Profil;
