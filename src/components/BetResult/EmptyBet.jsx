import Page from "../Page/Page";
import Wrapper from "../Wrapper/Wrapper";

const EmptyBet = () => {
  return (
    <Page>
      <Wrapper name="emptyBet">
        <h2>Aucun round de créé</h2>
        <h3>Vous devez d'abord créer un round pour en saisir les résultats</h3>
      </Wrapper>
    </Page>
  )
};

export default EmptyBet;