import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/styles/App.css";
import "./assets/styles/index.css";
import App from "./App";
import MenuProvider from "./components/store/MenuProvider";

createRoot(document.getElementById("root")!).render(
  <MenuProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </MenuProvider>
);
