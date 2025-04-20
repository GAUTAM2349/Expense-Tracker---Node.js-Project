import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import Signup from "./src/components/authentication/Signup";
import Login from "./src/components/authentication/Login";
import Profile from "./src/components/user/Profile";
import Expenses from "./src/components/expense/Expenses";
import AddExpense from "./src/components/expense/AddExpense";
import Nav from "./src/components/header/Nav";
import PremiumDashboard from "./src/components/premium/PremiumDashboard";
import ForgotPassword from "./src/components/authentication/ForgotPassword";
import ResetPassword from "./src/components/authentication/ResetPassword";
import UpdateExpense from "./src/components/expense/UpdateExpense";

const AppLayout = () => {
  return (
    <>
      <Nav />
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
        path : ''
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
        path: "/expenses",
        element: <Expenses />,
      },

      {
        path: "/add-expense",
        element: <AddExpense />,
      },
      {
        path : "/update-expense/:id",
        element: <UpdateExpense/>
      },
      {
        path: "/premium",
        element: <PremiumDashboard />,
      },

      {
        path : "/forgot-password",
        element : <ForgotPassword/>
      },

      {
        path: "/reset-password/:resetToken",  // Add :resetToken to the path
        element: <ResetPassword />
      }
      
      
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
