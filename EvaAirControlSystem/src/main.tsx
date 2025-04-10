import { createRoot } from "react-dom/client";
import "./assets/styles/index.css";
import "./locale/i18n";
import App from "./App";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./util/http";
import MenuProvider from "./components/store/MenuProvider";

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <MenuProvider>
      <App />
    </MenuProvider>
  </QueryClientProvider>
);
