import { createSlice } from "@reduxjs/toolkit";

const initAdminState = { hintTitle: "", currentlyType: "" };

const adminSlice = createSlice({
  name: "admin",
  initialState: initAdminState,
  reducers: {
    AdminContent(state, action) {
      state.hintTitle = action.payload;
    },
    CurrentlyType(state, action) {
      state.currentlyType = action.payload;
    },
  },
});

export const adminAction = adminSlice.actions;
export default adminSlice.reducer;
