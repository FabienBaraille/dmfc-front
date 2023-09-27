/* eslint-disable react/no-unescaped-entities */
import { useSelector } from 'react-redux';
import Wrapper from '../Wrapper/Wrapper';


const News = () => {
  const isDMFC = useSelector((state) => state.user.DMFC);
  // Récupérer le fil d'actu dans la BDD
  return (
    <Wrapper name='news'>
      <h2>Fil d'actus</h2>
      {isDMFC && <button type="button">Edit</button>}
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos exercitationem minus earum nulla odio blanditiis unde velit impedit, magnam asperiores numquam error laborum rem id at doloribus praesentium quod totam!</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda blanditiis ipsum debitis omnis tenetur. Minus perferendis culpa praesentium! Reprehenderit nemo iusto atque quia, aut maxime ipsum fuga culpa suscipit reiciendis?</p>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil, aspernatur amet. Ipsam autem doloremque et iure neque voluptate laboriosam, quasi tempore unde. Repellat natus necessitatibus veritatis quisquam quasi facilis aliquam?</p>
    </Wrapper>
  )};
export default News;