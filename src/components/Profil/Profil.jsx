import { useDispatch, useSelector } from "react-redux";
import Wrapper from '../Wrapper/Wrapper';
import { setInputValue } from '../../actions/user';
import { saveFavoriteTeams } from '../../actions/teams';
import Input from "../Utils/Input";

import data from "../../data/data";

import './Profil.scss';


function Profil() {
  const dispatch = useDispatch();
 const pseudo = useSelector((state) => state.user.pseudo);
  const email = useSelector((state) => state.user.email);
  const password = useSelector((state) => state.user.password);
  const league = useSelector((state) => state.user.league);
  const favoriteTeams = useSelector((state) => state.teams.favoriteTeams);

  const teamOptions = data.team.map((team) => (
    <option key={team.Trigram} value={team.Trigram}>
      {team.Name}
    </option>
  ));

  const handleInput = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    dispatch(setInputValue(inputName, inputValue));
    dispatch(saveFavoriteTeams(inputName, inputValue));
  };
 

  const handleSubmit = (event) => {
    event.preventDefault();
  };


  return (
    <Wrapper className="profil-page">
      <div className ="profil">
        <h3>Profil</h3>
        <p>Email: {email}</p>
        <p>Pseudo: {pseudo}</p>
        <p>Équipe Préférée: {favoriteTeams}</p>
        <p>Ma Ligue: {league}</p>
      </div>
        <form className="change-info" onSubmit={handleSubmit}>
        <h2>Changer mes paramètres</h2>
          <div>
            <label>Email: </label>
            <Input type="email" placeholder="change ton email" name="email" value={email} onChange={handleInput}/>
            <div className="form-btn">
            <button type="submit">Soumettre</button>
            </div>
          </div>
          <div>
            <label>Mot de Passe: </label>
            <Input type="password" placeholder = "change ton mot de passe" name="password" value={password} onChange={handleInput}/>
            <div className="form-btn">
            <button type="submit">Soumettre</button>
            </div>
          </div>
          <div>
            <label>Pseudo: </label>
            <Input htmlFor="pseudo" id="pseudo" type="text" onChange={handleInput} value={pseudo} placeholder="change ton pseudo"/>
              <div className="form-btn"> 
              <button type="submit">Soumettre</button>
              </div>
          </div>
          <div>
            <label>Équipe Préférée: </label>
            <select type="team" name="team" onChange={handleInput}>
            <option value="">changer ta équipe préférée</option>{teamOptions}</select>
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