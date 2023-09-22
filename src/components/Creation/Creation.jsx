import data from "../../data/data"

const Creation = () => {
  const leagueOptions = data.League.map(league => {
    return(
      <option key={league["League name"]} value={league["League name"]}>{league["League name"]}</option>
    )
  });

  return (
    <div>
      <h1>Création de compte</h1>
      <div>
        <div>
          <input type="checkbox" id="dmfc" />
          <label htmlFor="dmfc">DMFC</label>
          <p>Ligue :</p>
          <select placeholder="Nom de la ligue">
            <option disabled>Choisis ta ligue</option>
            {leagueOptions}
          </select>
          <label htmlFor="mail">Mail :</label>
          <input id="mail" placeholder="exemple@email.com" />
          <label htmlFor="pseudo">Login :</label>
          <input id="pseudo" placeholder="Pseudo" />
          <label htmlFor="password">Mot de Passe :</label>
          <input id="password" placeholder="Mot de passe" />
        </div>
          <button>Créer</button>
          <p>J'ai déjà un compte</p>
      </div>
    </div>
  )
}

export default Creation