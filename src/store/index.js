import { legacy_createStore as createStore, applyMiddleware } from 'redux';

import { composeWithDevTools } from '@redux-devtools/extension';

import reducer from '../reducers';
import authMiddleware from '../middlewares/authMiddleware';
import datasMiddleware from '../middlewares/datasMiddleware';

const enhancer = composeWithDevTools(
  applyMiddleware(authMiddleware, datasMiddleware)
);

const store = createStore(
  reducer,
  enhancer,
);

export default store;
