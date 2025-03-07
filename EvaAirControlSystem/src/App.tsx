import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootErrorPages from "./pages/errorPages/RootErrorPages";
import Dashboard from "./pages/Dashboard";
import UserData from "./pages/UserData";
import Login from "./pages/Login";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      // element: <RootLayout />,
      errorElement: <RootErrorPages />,
      children: [
        {
          path: "",
          element: <Dashboard />,
        },
        {
          path: "main",
          children: [
            {
              path: ":id",
              element: <UserData />,
            },
          ],
        },
      ],
    },
    {
      path: "/login",
      errorElement: <RootErrorPages />,
      children: [
        {
          path: "",
          element: <Login />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
