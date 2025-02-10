import React, { useEffect } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Layout from "./pages/Layout";
import NoPage from "./pages/NoPage";
import LogIn from "./pages/LogIn";
import Home from "./pages/Home";

let is_admin = document.querySelector('meta[name="is_admin"]').content;
let is_authenticated = document.querySelector(
  'meta[name="is_authenticated"]'
).content;

// 判斷是否為管理員，true 為管理員，false 為用戶
const router = createBrowserRouter(
  is_authenticated === "true"
    ? createRoutesFromElements([
        <Route element={<Layout />}>
          <Route
            index
            path={JSON.parse(is_admin) ? "/admin" : "/"}
            element={<Home is_admin={JSON.parse(is_admin)} />}
          />

          <Route
            path="*"
            element={<NoPage is_admin={JSON.parse(is_admin)} />}
          />
        </Route>,
      ])
    : createRoutesFromElements([
        <Route element={<Layout />}>
          <Route path="/" element={<LogIn is_admin={JSON.parse(is_admin)} />} />
          <Route
            path="*"
            element={<NoPage is_admin={JSON.parse(is_admin)} />}
          />
        </Route>,
      ])
);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
