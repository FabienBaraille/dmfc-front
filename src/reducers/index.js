import { combineReducers } from 'redux';

import userReducer from './user';
import betReducer from './bet';
// import teamsReducer from './teams';
import datasReducer from './datas';
import leagueReducer from './league';

const rootReducer = combineReducers({
  user: userReducer,
  bet: betReducer,
  // teams: teamsReducer,
  datas: datasReducer,
  league: leagueReducer,
});

export default rootReducer;
