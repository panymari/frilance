import { createSlice } from '@reduxjs/toolkit';

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: null,
  },
  reducers: {
    setData: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { setData } = usersSlice.actions;

export default usersSlice.reducer;
