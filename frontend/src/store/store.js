import { configureStore } from '@reduxjs/toolkit';
import userDataReducer from '../redux_slices/userDataSlice';
export default configureStore({
  reducer: {
    user_data: userDataReducer
  },
});
