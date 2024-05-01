import { createSlice } from "@reduxjs/toolkit";

const usesSlice = createSlice({
  name: "users",
  initialState: {
    usersTable: {},
  },
  reducers: {
    setUsersTable: (state, action) => {
      state.usersTable = action.payload;
    },
  },
});

export const { setUsersTable } = usesSlice.actions;
export default usesSlice.reducer;
