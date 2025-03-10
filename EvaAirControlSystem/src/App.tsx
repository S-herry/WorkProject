import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/layout/RootLayout";
import RootErrorPages from "./pages/errorPages/RootErrorPages";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <RootErrorPages />,
      children: [
        {
          path: "",
          element: <Dashboard />,
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
