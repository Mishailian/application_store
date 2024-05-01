import { createSlice } from "@reduxjs/toolkit";

const tagsSlice = createSlice({
  name: "tags",
  initialState: {
    tagsTable: null,
  },
  reducers: {
    setTagsTable: (state, action) => {
      state.tagsTable = action.payload;
    },
  },
});

export const { setTagsTable } = tagsSlice.actions;
export default tagsSlice.reducer;
