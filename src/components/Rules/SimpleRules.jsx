import Wrapper from "../Wrapper/Wrapper";

import './Rules.scss';

/* eslint-disable react/no-unescaped-entities */
const SimpleRules = () => {
  return (
    <Wrapper name="rules" >
      <h2>Bienvenue dans le DMFC Game</h2>
      <p>Ici on pronostique sur les saisons de NBA en groupe d'amis (ou ennemis) sans enjeux autre que la bonne humeur, la convivialité et une pointe de moquerie...</p>
      <p>Le jeu s'organise en ligues (groupe d'amis) constituées d'un DMFC (maître du jeu) et de joueurs, choisissez qui dirigera votre ligue et rejoignez vous !</p>
      <h3>Le DMFC :</h3>
      <p>En tant que responsable de la ligue, tu auras pour rôle de choisir (créer) les matchs sur lesquels pronostiquer suivant le calendrier officiel de la saison, de renseigner les résultats des matchs mais également d'animer le groupe avec notamment la possibilité d'alimenter un fil d'actualités.</p>
      <h3>Le joueur :</h3>
      <p>En tant que participant, tu pourras pronostiquer sur les matchs choisis par ton DMFC, consulter le classement général, tes statistiques et celles de tes amis.</p>
    </Wrapper> 
  )
}

export default SimpleRules;