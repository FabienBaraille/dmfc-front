/* eslint-disable react/no-unescaped-entities */
import { useDispatch, useSelector } from 'react-redux';
import Wrapper from '../Wrapper/Wrapper';
import { getNews, postNewsChange, postNewsCreation, setNews, setNewsCreationMode } from '../../actions/news';
import Input from '../Utils/Input';

const News = () => {
  const dispatch = useDispatch();
  
  const userRole = useSelector((state) => state.user.loggedUser.roles[0]);
  const newsCreation = useSelector((state) => state.datas.newsCreation);
  const news = useSelector((state) => state.datas.news);
  const newsTitle = useSelector((state) => state.datas.newsTitle);
  const newsId = useSelector((state) => state.datas.newsId);

  const handleCreationMode = () => {
    newsCreation ? dispatch(setNewsCreationMode(false)) : dispatch(setNewsCreationMode(true));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    newsId === 0 ? dispatch(postNewsCreation()) : dispatch(postNewsChange());
    dispatch(setNewsCreationMode(false));
  };

  const handleNewsChange = (event) => {
    dispatch(setNews(event.target.id, event.target.value));
  };
  
  return (
    <Wrapper name='news'>
      <h2>Fil d'actus</h2>
      {(userRole === 'ROLE_DMFC' && !newsCreation) && <button className='homeEditBtn' type="button" onClick={handleCreationMode}>{newsTitle == '' ? "Créer" : "Editer"}</button>}
      {newsCreation ?
        <form onSubmit={handleSubmit}>
          <Input htmlFor={"newsTitle"} id={"newsTitle"} label='Titre :' value={newsTitle} className={"newsTitle-container"} onChange={handleNewsChange}/>
          <Input htmlFor={"news"} type={"textarea"} id={"news"} label='Actus :' value={news} className={"news-container"} onChange={handleNewsChange}/>
          <button type='submit'>Valider</button>
          <p>Pensez à validez vos changements !</p>
        </form>         
        :
        <>
          <h3>{newsTitle}</h3>
          <p>{news}</p>
        </>
      }
    </Wrapper>
  )};

export default News;