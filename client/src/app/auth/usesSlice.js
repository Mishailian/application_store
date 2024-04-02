import { createSlice } from "@reduxjs/toolkit";

const usesSlice = createSlice({
  name: "users",
  initialState: {
    users: null,
    usersTable: {},
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setUsersTable: (state, action) => {
      state.usersTable = action.payload;
    },
  },
});

export const { setUsers, setUsersTable } = usesSlice.actions;
export default usesSlice.reducer;
