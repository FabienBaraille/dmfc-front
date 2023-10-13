import Rankings from '../Rankings/Rankings';
import Page from '../Page/Page';
import News from './News';
import SeasonInfos from './SeasonInfos';

import './Home.scss';

const Home = () => {
  return (
    <Page>
      <News />
      <SeasonInfos />
      <Rankings />
    </Page>
  )};
export default Home;