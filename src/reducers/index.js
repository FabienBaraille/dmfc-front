import { combineReducers } from 'redux';

import userReducer from './user';
import betReducer from './bet';
import datasReducer from './datas'

const rootReducer = combineReducers({
  user: userReducer,
  bet: betReducer,
  datas: datasReducer,
});

export default rootReducer;
