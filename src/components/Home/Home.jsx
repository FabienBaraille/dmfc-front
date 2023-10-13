import Rankings from '../Rankings/Rankings';
import News from './News';
import SeasonInfos from './SeasonInfos';

import './Home.scss';

const Home = () => {
  return (
    <>
      <div className='globalNews'>
        <SeasonInfos />
        <News/>        
      </div>
      <Rankings />
    </>
  )};
export default Home;