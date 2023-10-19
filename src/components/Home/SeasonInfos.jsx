/* eslint-disable react/no-unescaped-entities */
import { useSelector } from 'react-redux';

import Wrapper from '../Wrapper/Wrapper';

import { transformDate } from '../../Utils/stats/calcDate';

const SeasonInfos = () => {
  const {year, startSeason, startPlayoff, Comment} = useSelector((state) => state.datas.allSeasons[state.datas.allSeasons.length-1]);
  
  return (
    <Wrapper name={"season-infos"}>
      <h2>Saison {year}</h2>
      <h4 className='middle-title'>Début de la saison : {transformDate(startSeason, 'news')}</h4>
      <h4 className='middle-title'>Début de finales : {transformDate(startPlayoff, 'news')}</h4>
      <p>{Comment}</p>
    </Wrapper>
  )};
export default SeasonInfos;