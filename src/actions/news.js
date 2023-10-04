export const NEWS_CREATION = 'NEWS_CREATION'
export const NEWS_CREATION_MODE = 'NEWS_CREATION_MODE'
export const POST_NEWS_CREATION = 'POST_NEWS_CREATION'
export const GET_NEWS = 'GET_NEWS'
export const SET_NEWS = 'SET_NEWS'

export const setNewsCreationMode = (newsCreation) => ({
  type: NEWS_CREATION_MODE,
  newsCreation,
});

export const postNewsCreation = (newsTitle, news) => ({
  type: POST_NEWS_CREATION,
  newsTitle,
  news,
});

export const getNews = () => ({
  type: GET_NEWS,
});

export const setNews = (newsTitle, news) => ({
  type: SET_NEWS,
  newsTitle,
  news,
})