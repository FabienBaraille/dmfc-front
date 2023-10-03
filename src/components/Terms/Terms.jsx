/* eslint-disable react/no-unescaped-entities */
import PropTypes from 'prop-types';

import Wrapper from "../Wrapper/Wrapper";
import Retour from '../Retour/Retour';


import './Terms.scss';

const Terms = ({ isLogged }) => {
  return (
      <Wrapper name='Terms'>
        <h2>Conditions générales d'utilisations</h2>
        <p>Le présent document a pour objet de définir les modalités et conditions dans lesquelles d’une part, DMFC-GAME, ci-après dénommé l’EDITEUR, met à la disposition de ses utilisateurs le site, et les services disponibles sur le site et d’autre part, la manière par laquelle l’utilisateur accède au site et utilise ses services.</p>
        <p>Toute connexion au site est subordonnée au respect des présentes conditions.</p>
        <p>Pour l’utilisateur, le simple accès au site de l’EDITEUR à l’adresse URL suivante http://dmfc-game/  implique l’acceptation de l’ensemble des conditions décrites ci-après.</p>
        <h2>Propriétés intellectuelle</h2>
        <p>Aucune reproduction, même partielle prévue à l’article L.122-5 du Code de la propriété intellectuelle, ne peut être faite de ce site sans l’autorisation du directeur de publication.</p>
        <h2>Liens hypertextes</h2>
        <p>Le site DMFC-GAME peut contenir des liens hypertextes vers d’autres sites présents sur le réseau Internet. Les liens vers ces autres ressources vous font quitter le site DMFC-GAME.</p>
        <p>Il est possible de créer un lien vers la page de présentation de ce site sans autorisation expresse de l’EDITEUR. Aucune autorisation ou demande d’information préalable ne peut être exigée par l’éditeur à l’égard d’un site qui souhaite établir un lien vers le site de l’éditeur. Il convient toutefois d’afficher ce site dans une nouvelle fenêtre du navigateur. Cependant, l’EDITEUR se réserve le droit de demander la suppression d’un lien qu’il estime non conforme à l’objet du site DMFC-GAME</p>
        <h2>Accès au site</h2>
        <p>L’éditeur s’efforce de permettre l’accès au site 24 heures sur 24, 7 jours sur 7, sauf en cas de force majeure ou d’un événement hors du contrôle de l’EDITEUR, et sous réserve des éventuelles pannes et interventions de maintenance nécessaires au bon fonctionnement du site et des services.</p>
        <p>Par conséquent, l’EDITEUR ne peut garantir une disponibilité du site et/ou des services, une fiabilité des transmissions et des performances en terme de temps de réponse ou de qualité. Il n’est prévu aucune assistance technique vis à vis de l’utilisateur que ce soit par des moyens électronique ou téléphonique.</p>
        <p>La responsabilité de l’éditeur ne saurait être engagée en cas d’impossibilité d’accès à ce site et/ou d’utilisation des services.</p>
        <p>Par ailleurs, l’EDITEUR peut être amené à interrompre le site ou une partie des services, à tout moment sans préavis, le tout sans droit à indemnités. L’utilisateur reconnaît et accepte que l’EDITEUR ne soit pas responsable des interruptions, et des conséquences qui peuvent en découler pour l’utilisateur ou tout tiers.</p>
          <div className='return-btn'>
            {!isLogged && <Retour />}
          </div>
      </Wrapper>
  )}

  Terms.propTypes = {
    isLogged: PropTypes.bool.isRequired
  };

export default Terms;