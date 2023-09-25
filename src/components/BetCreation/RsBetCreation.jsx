/* eslint-disable react/no-unescaped-entities */
import Wrapper from "../Wrapper/Wrapper"

import data from "../../data/data";

const RsBetCreation = () => {
  const roundOptions = data.Round.map(round => {
    return(
      <option key={round["Name"]} value={round["Name"]}>{round["Name"]}</option>
    )
  });

  return (
    <Wrapper name="rsbetcreation">
      <div>
        <p>Pronostique saison régulire</p>
        <select>
          <option>Choisir le Round</option>
          {roundOptions}
        </select>
        <div>
          <label htmlFor="round_creation">Création d'un nouveau round</label>
          <input id="round_creation" type="text" placeholder="Nom du round"/>
          <select>
            <option>SR</option>
            <option disabled>PO</option>
          </select>
        </div>
      </div>
    </Wrapper>
  )
};

export default RsBetCreation;