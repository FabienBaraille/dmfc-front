import { combineReducers } from 'redux';

import userReducer from './user';
import betReducer from './bet';
import statsReducer from './stats'
import teamsReducer from './teams'
import datasReducer from './datas'

const rootReducer = combineReducers({
  user: userReducer,
  bet: betReducer,
  stats: statsReducer,
  teams: teamsReducer,
  datas: datasReducer,
});

export default rootReducer;
