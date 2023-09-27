import './Profil.scss';
import { useState } from 'react';


function Profil() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [favoriteTeam, setFavoriteTeam] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    name === 'email' ? setEmail(value) :
    name === 'name' ? setName(value) :
    name === 'favoriteTeam' && setFavoriteTeam(value);
  }

  return (
    <div>
       <div className ="profil">
        <h3>Profil</h3>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Favorite Team:</strong> {favoriteTeam}</p>
      </div>
        <h2>Changer mes paramètres</h2>
        <form>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Favorite Team:</label>
            <input
              type="text"
              name="favoriteTeam"
              value={favoriteTeam}
              onChange={handleInputChange}
            />
        </div>
      </form>
    </div>
  );
}


export default Profil;