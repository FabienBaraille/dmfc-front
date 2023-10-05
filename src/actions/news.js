export const NEWS_CREATION = 'NEWS_CREATION';
export const NEWS_CREATION_MODE = 'NEWS_CREATION_MODE';
export const POST_NEWS_CREATION = 'POST_NEWS_CREATION';
export const POST_NEWS_CHANGE = 'POST_NEWS_CHANGE';
export const GET_NEWS = 'GET_NEWS';
export const SET_NEWS = 'SET_NEWS';

export const setNewsCreationMode = (newsCreation) => ({
  type: NEWS_CREATION_MODE,
  newsCreation,
});

export const postNewsCreation = () => ({
  type: POST_NEWS_CREATION,
});

export const getNews = () => ({
  type: GET_NEWS,
});

export const setNews = (inputName, inputValue) => ({
  type: SET_NEWS,
  inputName,
  inputValue,
});

export const postNewsChange = () => ({
  type: POST_NEWS_CHANGE,
});