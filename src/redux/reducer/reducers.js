import { combineReducers } from 'redux';
import gooleUserReducer from './googleUser/gooleUserSlice';
import usersReducer from './users/usersSlice';

export default combineReducers({
  googleUser: gooleUserReducer,
  users: usersReducer,
});
