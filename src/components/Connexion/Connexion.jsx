const Connexion = () => {
  return (
    <div>
      <h1>Connexion</h1>
      <div>
        <div>
          <label htmlFor="pseudo">Login :</label>
          <input id="pseudo" placeholder="Pseudo" />
          <label htmlFor="password">Mot de Passe :</label>
          <input id="password" placeholder="Mot de passe" />
        </div>
          <button>Connexion</button>
          <button>Créer un compte</button>
          <p>J'ai oublié mon mot de passe</p>
      </div>
    </div>
  )
}

export default Connexion