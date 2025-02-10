import { configureStore } from "@reduxjs/toolkit";
import Admin from "./Admin";
import ConnState from "./ConnState";
const store = configureStore({
  reducer: { admin: Admin, connState: ConnState },
});

export default store;
