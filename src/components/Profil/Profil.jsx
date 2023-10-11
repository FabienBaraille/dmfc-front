import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import Wrapper from '../Wrapper/Wrapper';
import Input from "../Utils/Input";
import { updateUserProfile, setInputValue } from '../../actions/user';
import { saveFavoriteTeam } from '../../actions/teams';
import { toast } from 'react-toastify';
import { toastSucess } from "../Toast/ToastSuccess";


import './Profil.scss';


function Profil() {
  
  const dispatch = useDispatch();
  const teamsList = useSelector((state) => state.datas.allTeams);
  const loggedUser = useSelector((state) => state.user.loggedUser);
  const team = useSelector((state) => state.teams.favoriteTeam);
  const leagueName = loggedUser.league_id ? loggedUser.league_id.leagueName : 'N/A';

  
  useEffect(() => {
    const favoriteTeam = localStorage.getItem('favoriteTeam');
    if (favoriteTeam) {
      dispatch(saveFavoriteTeam(favoriteTeam));
    }
    dispatch(setInputValue('pseudo', loggedUser.username));
    dispatch(setInputValue('email', loggedUser.email));
    dispatch(setInputValue('password', loggedUser.password));
  }, []);


  const pseudo = useSelector((state) => state.user.pseudo);
  const email = useSelector((state) => state.user.email);
  const password = useSelector((state) => state.user.password);

  const teamOptions = teamsList.map(({ id, name }) => {
    return (
      <option key={id} value={name}>
        {name}
      </option>
    );
  });

  const handleEmailChange = (event) => {
    dispatch(setInputValue('email', event.target.value));
  };

  const handlePasswordChange = (event) => {
    dispatch(setInputValue('password', event.target.value));
  };

  const handleUsernameChange = (event) => {
    dispatch(setInputValue('pseudo', event.target.value));
  };

  const handleTeamChange = (event) => {
    const selectedTeam = event.target.value;
  
    dispatch(saveFavoriteTeam(selectedTeam));
    localStorage.setItem('favoriteTeam', selectedTeam);

  };

  const handleSubmit = async (event, paramName) => {
    event.preventDefault();
    const updatedUserData = {
      ...loggedUser,
      username: pseudo,
      email: email,
      password: password,
      team: team,
    };
    if (pseudo !== loggedUser.username) {
      document.cookie = `isLogged=;expires=Thu, 01 Jan 1970 00:00:00 UTC`;
      document.cookie = `userInfos=;expires=Thu, 01 Jan 1970 00:00:00 UTC`;
      window.location.href = '/login';
      dispatch(updateUserProfile({ updatedUserData }));
    } else {
      const updateComplete = dispatch(updateUserProfile(updatedUserData));
      if (updateComplete) {
        toast.success(`${paramName} mis à jour avec succès`, toastSucess) 
      }
    }
  };

  return (
    <Wrapper name="profil-page">
      <div className ="profil">
        <h3>Profil</h3>
        <p>Email: <span className="perso">{loggedUser.email}</span></p>
        <p>Pseudo: <span className="perso">{loggedUser.username}</span></p>
        <p>Score: <span className="perso">{loggedUser.score || 'NULL'}</span></p>
        <p>Ma Ligue: <span className="perso">{leagueName}</span></p>
        <p>Équipe Préférée: <span className="perso">{team}</span></p>
      </div>
      <form className="change-info" onSubmit={handleSubmit}>
        <h3>Changer Mes Paramètres</h3>
        <div>
          <label>Email: </label>
          <Input htmlFor="email" id="email" type="email" name="email" value={email} onChange={handleEmailChange} placeholder="changer ton email" />
          <div className="form-btn">
            <button type="submit" onClick={(event) => handleSubmit(event, 'email')}>Soumettre</button>
          </div>
        </div>
        <div>
          <label>Mot de Passe: </label>
          <Input htmlFor="mot de passe" id="password" type="password" name="password" value={password} onChange={handlePasswordChange} placeholder="changer ton mot de passe"/>
          <div className="form-btn">
          <button type="submit" onClick={(event) => handleSubmit(event, 'mot de passe')}>Soumettre</button>
          </div>
        </div>
        <div>
          <label>Pseudo: </label>
          <Input htmlFor="pseudo" id="pseudo" type="text" name="username" value={pseudo} onChange={handleUsernameChange} placeholder="change ton pseudo"/>
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
