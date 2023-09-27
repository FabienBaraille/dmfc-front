import { combineReducers } from 'redux';

import userReducer from './user';
import betReducer from './bet';
import statsReducer from './stats'

const rootReducer = combineReducers({
  user: userReducer,
  bet: betReducer,
  stats: statsReducer,
});

export default rootReducer;
