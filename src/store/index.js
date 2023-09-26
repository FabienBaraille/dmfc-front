import { legacy_createStore as createStore, applyMiddleware } from 'redux';

import { composeWithDevTools } from '@redux-devtools/extension';

import reducer from '../reducers';
import authMiddleware from '../middlewares/authMiddleware';
import statsMiddleware from '../middlewares/statsMiddleware';

const enhancer = composeWithDevTools(
  applyMiddleware(authMiddleware, statsMiddleware)
);

const store = createStore(
  reducer,
  enhancer,
);

export default store;
