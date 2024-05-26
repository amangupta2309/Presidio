import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

export const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state, action) => {
      state.user = null;
      state.token = null;
    }
  },
});
export default userSlice.reducer;
export const userActions = userSlice.actions;
