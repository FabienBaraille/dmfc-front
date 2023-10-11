import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import reduxReset from 'redux-reset';

import { composeWithDevTools } from '@redux-devtools/extension';

import reducer from '../reducers';
import authMiddleware from '../middlewares/authMiddleware';
import datasMiddleware from '../middlewares/datasMiddleware';
import betMiddleware from '../middlewares/betMiddleware';

const enhancer = composeWithDevTools(
  applyMiddleware(authMiddleware, datasMiddleware, betMiddleware),
  reduxReset()
);

const store = createStore(
  reducer,
  enhancer,
);

export default store;
