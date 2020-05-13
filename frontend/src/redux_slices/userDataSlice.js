import { createSlice } from '@reduxjs/toolkit';

export const userDataSlice = createSlice({
  name: 'user_data',
  initialState: {
      email:null,
      mail_notifications:0,
      general_notifications:0
  },
  reducers: {
    set_email: (state, email) => {
      state.email =email.payload;
    },
    set_mail_notifications: (state, mail_notifications) => {
      state.mail_notifications =mail_notifications.payload;
    },
    set_general_notifications: (state, general_notifications) => {
      state.general_notifications =general_notifications.payload;
    }
  },
});

export const { set_email, set_mail_notifications, set_general_notifications } = userDataSlice.actions;
export const selectEmail = state => state.user_data.email;
export const selectMailNotifications = state => state.user_data.mail_notifications;
export const selectGeneralNotifications = state => state.user_data.general_notifications;
export default userDataSlice.reducer;
