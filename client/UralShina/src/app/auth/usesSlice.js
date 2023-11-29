import { createSlice } from "@reduxjs/toolkit";

const usesSlice = createSlice({
  name: "users",
  initialState: {
    users: null,
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { setUsers } = usesSlice.actions;
export default usesSlice.reducer;
