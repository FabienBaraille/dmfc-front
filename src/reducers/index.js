import { combineReducers } from 'redux';

import userReducer from './user';
import betReducer from './bet';
import statsReducer from './stats'
import teamsReducer from './teams'

const rootReducer = combineReducers({
  user: userReducer,
  bet: betReducer,
  stats: statsReducer,
  teams: teamsReducer,
});

export default rootReducer;
