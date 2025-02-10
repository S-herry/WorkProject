import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import Index, { fetchAllData, loadChineseFont } from "./pages/Index";
import NotFound from "./pages/NotFound";

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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
