import { combineReducers } from 'redux';

import userReducer from './user';
import betReducer from './bet';

const rootReducer = combineReducers({
  user: userReducer,
  bet: betReducer,
});

export default rootReducer;
