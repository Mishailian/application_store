import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    csrf_token: null,
    username: null,
    username_id: null,
    is_superuser: false,
    isAuth: false,
    token: null,
  },
  reducers: {
    setToken: (state, action) => {
      console.log("aaaaaaa");
      state.token = action.payload.token;
      state.isAuth = action.payload.isAuth;
      state.csrf_token = action.payload.csrf_token;
      state.username = action.payload.username;
      state.is_superuser = action.payload.is_superuser;
      state.username_id = action.payload.username_id;
    },
  },
});

export const { setToken } = authSlice.actions;
export default authSlice.reducer;
