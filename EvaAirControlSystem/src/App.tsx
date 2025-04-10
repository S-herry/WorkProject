import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import RootLayout, { LoginState } from "./pages/layout/RootLayout"; // loginState
import RootErrorPages from "./pages/errorPages/RootErrorPages";
import Login, { Action } from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MachineContent, {
  Loader,
  Action as machineAction,
} from "./pages/MachineContent";
import MachineProvider from "./components/store/MachineProvider";
import UserPhoto, { Action as PhotoAction } from "./pages/UserPhoto";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <MachineProvider>
          <RootLayout />
        </MachineProvider>
      ),
      errorElement: <RootErrorPages />,
      loader: LoginState,
      children: [
        {
          path: "/",
          action: machineAction,
          element: <Dashboard />,
        },
        {
          path: "/machine_control/:id",
          element: <MachineContent />,
          action: machineAction,
          loader: Loader,
        },
      ],
    },
    {
      path: "/get_image/:id",
      element: <UserPhoto />,
      action: PhotoAction,
    },
    {
      path: "/login",
      element: (
        <MachineProvider>
          <Login />
        </MachineProvider>
      ),
      action: Action,
      errorElement: <RootErrorPages />,
    },
    {
      path: "/logout",
      loader: () => {
        return redirect("/login");
      },
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
