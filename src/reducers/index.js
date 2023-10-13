import { combineReducers } from 'redux';

import userReducer from './user';
import betReducer from './bet';
import datasReducer from './datas';
import leagueReducer from './league';

const rootReducer = combineReducers({
  user: userReducer,
  bet: betReducer,
  datas: datasReducer,
  league: leagueReducer,
});

export default rootReducer;
