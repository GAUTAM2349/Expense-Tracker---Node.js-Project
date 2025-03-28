import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import Signup from "./src/components/authentication/Signup";
import Login from "./src/components/authentication/Login";
import Profile from "./src/components/user/Profile";
import Expenses from "./src/components/expense/Expenses";
import AddExpense from "./src/components/expense/AddExpense";

const AppLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/profile",
        element: <Profile />,
      },

      {
        path: "/login",
        element: <Login />,
      },

      {
        path: "/signup",
        element: <Signup />,
      },

      {
        path : "/expenses",
        element : <Expenses/>
      },

      {
        path : "/add-expense",
        element : <AddExpense/>
      }
      
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
