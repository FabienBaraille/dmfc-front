import { useDispatch, useSelector } from "react-redux";
import { setInputValue } from "../../actions/user";

/* eslint-disable react/no-unescaped-entities */
const Connexion = () => {
  const dispatch = useDispatch();

  const handleInput = (event) => {
    const inputName = event.target.id;
    
    const inputValue = event.target.value;
    dispatch(setInputValue(inputName, inputValue));
  }

  const pseudo = useSelector((state) => state.user.pseudo);
  return (
    <div>
      <h1>Connexion</h1>
      <div>
        <div>
          <label htmlFor="pseudo">Login :</label>
          <input id="pseudo" placeholder="Pseudo" type="text" onChange={handleInput} value={pseudo} />
          <label htmlFor="password">Mot de Passe :</label>
          <input id="password" placeholder="Mot de passe" type="password" />
        </div>
          <button>Connexion</button>
          <button>Créer un compte</button>
          <p>J'ai oublié mon mot de passe</p>
          {/* Faire formulaire rappel identifiant */}
      </div>
    </div>
  )
};

export default Connexion;