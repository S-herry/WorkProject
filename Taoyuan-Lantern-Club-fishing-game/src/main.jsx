import { createRoot } from "react-dom/client";
import "./css/index.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import GetFishUnity from "./content/GetFishUnity";
import { Provider } from "react-redux";
import store from "./store/Index";

createRoot(document.querySelector("#root")).render(
  <Provider store={store}>
    <GetFishUnity>
      <App />
    </GetFishUnity>
  </Provider>
);
