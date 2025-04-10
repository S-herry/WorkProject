import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import Index, { fetchAllData, loadChineseFont } from "./pages/Index";
import NotFound from "./pages/NotFound";
import Test from "./pages/Test";

const App = () => {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      path: "",
      errorElement: <NotFound />,
      loader: loadChineseFont,
      children: [
        {
          path: "/web/:id",
          element: <Index />,
          loader: fetchAllData,
        },
        {
          path: "/area/:id",
          element: <Index />,
          loader: fetchAllData,
        },
        {
          path: "/test",
          element: <Test />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
