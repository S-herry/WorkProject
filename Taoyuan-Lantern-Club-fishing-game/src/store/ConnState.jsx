import { createSlice } from "@reduxjs/toolkit";
import languageData from "../data/Language.json";
const initWebSocketsState = {
  isApi: false,
  device: "",
  permissionGranted: null,
  language: languageData["CH"],
  nation: "CH",
};
const ConnStateSlice = createSlice({
  name: "webSockets",
  initialState: initWebSocketsState,
  reducers: {
    GetDeviceType: (state) => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      if (/android/i.test(userAgent)) {
        state.device = "Android";
      } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        state.device = "iOS";
      } else {
        state.device = "PC";
      }
    },

    ChangeApi: (state, action) => {
      state.isApi = action.payload;
    },
    PermissionGrantedChange: (state, action) => {
      state.permissionGranted = action.payload;
    },
    ChangeLang: (state, action) => {
      state.nation = action.payload;
      state.language = languageData[action.payload];
    },
  },
});

export const connStateAction = ConnStateSlice.actions;
export default ConnStateSlice.reducer;
