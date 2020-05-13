import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import userDataReducer from '../redux_slices/userDataSlice';
export default configureStore({
  reducer: {
    counter: counterReducer,
    user_data: userDataReducer
  },
});
