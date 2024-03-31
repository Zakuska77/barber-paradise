import {
    createBrowserRouter,
  } from "react-router-dom";
  import React from 'react'
  import App from "../views/Home.jsx";
  import Information from "../views/Information.jsx";
  import Account from "../views/Account.jsx";
  import Login from "../views/Login.jsx";
  import NoMatch from "../views/NoMatch.jsx";
  import Root from "../App.jsx";
  import CreationCompt from "../views/CreationCompt.jsx";
  import Home from "../views/Home.jsx";
 
  
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <NoMatch />,
      children: [
        { path: "/", element: <App/> },
        { path: "/Home", element: <Home/> },
        { path: "/Information/:id", element: <Information/> },
        { path: "/Account", element: <Account/> },
        { path: "/Login", element: <Login/> },
        { path: "/Creation", element: <CreationCompt/> },
        
      ]},
  ]);
  
  export default router;
  