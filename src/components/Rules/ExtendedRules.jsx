import PropTypes from 'prop-types';

import Wrapper from "../Wrapper/Wrapper";
import Retour from '../Retour/Retour'
import './Rules.scss';

/* eslint-disable react/no-unescaped-entities */
const ExtendedRules = ({ isLogged }) => {

  return (
      <Wrapper name="rules" >
        <h2>Bienvenue dans le DMFC Game</h2>
        <p>Ici on pronostique sur les saisons de NBA en groupe d'amis (ou ennemis) sans enjeux autre que la bonne humeur, la convivialité et une pointe de moquerie...</p>
        <p>Le jeu s'organise en ligues (groupe d'amis) constituées d'un DMFC (maître du jeu) et de joueurs, choisissez qui dirigera votre ligue et rejoignez vous !</p>
        <h3>Le DMFC :</h3>
        <p>En tant que responsable de la ligue, tu auras pour rôle de choisir (créer) les matchs sur lesquels pronostiquer suivant le calendrier officiel de la saison, de renseigner les résultats des matchs mais également d'animer le groupe avec notamment la possibilité d'alimenter un fil d'actualités.</p>
        <h3>Le joueur :</h3>
        <p>En tant que participant, tu auras pourras pronostiquer sur les matchs choisis par ton DMFC, consulter le classement général, tes statistiques et celles de tes amis.</p>
        <h3>Déroulement du jeu</h3>
        <h4>Saison régulière (SR)</h4>
        <p>Cette phase se déroule sur plus d’une vingtaine de rounds tout au long de la saison. Les rounds ont lieu principalement le weekend et à d’autres occasions (NBA Cup, Christmas Day, MLK Day, Play-In Tournament etc.).</p>
        <ul>
          <li>Le DMFC sélectionne les matchs à pronostiquer pour chaque round, et le communique aux joueurs. Il réalisera auprès des joueurs un rappel des matchs à pronostiquer le jour où les matchs ont lieu.</li>
          <li>Les joueurs doivent pronostiquer avant l’horaire de début de chaque rencontre, ils pronostiquent sur le vainqueur du match ainsi que sur la différence de point. Passé cette deadline, le joueur sera compté DNP (Did Not Play). </li>
          <li>Une fois le match terminé, le DMFC devra renseigner les scores finaux afin que les points de chaques joueurs puissent voir leurs points calculés 10pts pour le bon vainqueur et 20pts bonus si la différence de point est également la bonne.</li>
        </ul>
          <div className='return-btn'>
            {!isLogged && <Retour />}
          </div>
      </Wrapper>
  )}

  ExtendedRules.propTypes = {
    isLogged: PropTypes.bool.isRequired
  };
  
export default ExtendedRules;