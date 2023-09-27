import './Profil.scss';
import { useState } from 'react';
import data from "../../data/data";
import Wrapper from '../Wrapper/Wrapper';


function Profil() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [team, setFavoriteTeam] = useState('');


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'pseudo':
        setPseudo(value);
        break;
      case 'team':
        setFavoriteTeam(value);
        break;
      default:
        break;
    }
  };

  const teamOptions = data.Team.map((team) => (
    <option key={team.Trigram} value={team.Trigram}>
      {team.Name}
    </option>
  ));

  const handleSubmit =(event) => {
    event.preventDefault();
    setEmail('');
    setPassword('');
    setPseudo('');
    setFavoriteTeam('');
  };

  return (
    <Wrapper className="profil-page">
       <div className ="profil">
        <h3>Profil</h3>
        <p>Email: {email}</p>
        <p>Pseudo: {pseudo}</p>
        <p>Équipe Préférée: {team}</p>
        <p>Ma Ligue: </p>
      </div>
        <h2>Changer mes paramètres</h2>
        <form className="change-info" onSubmit={handleSubmit}>
          <div>
            <label>Email: </label>
            <input type="email" placeholder="change ton email" name="email" value={email} onChange={handleInputChange}/>
            <div className="form-btn">
            <button type="submit">Soumettre</button>
            </div>
          </div>
          <div>
            <label>Mot de Passe: </label>
            <input type="password" placeholder = "change ton mot de passe" name="password" value={password} onChange={handleInputChange}/>
            <div className="form-btn">
            <button type="submit">Soumettre</button>
            </div>
          </div>
          <div>
            <label>Pseudo: </label>
            <input
              type="text" placeholder="change ton pseudo" name="pseudo" value={pseudo} onChange={handleInputChange}/>
              <div className="form-btn"> 
              <button type="submit">Soumettre</button>
              </div>
          </div>
          <div>
            <label>Équipe Préférée: </label>
            <select type="team" name="team" value={team} onChange={handleInputChange}>
            <option value="">Sélectionnez une équipe</option>{teamOptions}</select>
            <div className="form-btn">
            <button type="submit">Soumettre</button>
            </div>
          </div>
      </form>
    </Wrapper>
  );
}


export default Profil;