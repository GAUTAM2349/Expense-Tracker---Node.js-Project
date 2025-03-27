import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import Signup from "./src/components/authentication/Signup";


const AppLayout = () => {

    return (

        <>
        <Signup/>
        
        </>

    )
    
}

const appRouter = createBrowserRouter([

    {
        path : '/',
        element : <AppLayout/>,
        children : [

        ]
        
        
    }
    
]);


const root = ReactDOM.createRoot( document.getElementById('root') );
root.render( <RouterProvider router={appRouter}/>);

