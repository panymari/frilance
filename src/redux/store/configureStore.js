import { configureStore } from '@reduxjs/toolkit';
import reducers from '../reducer/reducers';


const store = configureStore({
  reducer: reducers,
});

export default store;
