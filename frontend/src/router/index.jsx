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
  import CreationCompteCoiffeur from "../views/CreationCompteCoiffeur.jsx";
  import ModifyCoiffeurAvailability from "../views/ModifyCoiffeurAvailability.jsx";
  import AccountUtilisateur from "../views/AccountUtilisateur.jsx";
  import AccountCoiffeur from "../views/AccountCoiffeur.jsx"
  import Services from "../views/Services.jsx";
  

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
        { path: "/CreationCompteClient", element: <CreationCompt/> },
        { path: "/CreationCompteCoiffeur", element: <CreationCompteCoiffeur/> },
        { path: "/ModifyCoiffeurAvailability", element: <ModifyCoiffeurAvailability/> },
        { path: "/AccountUtilisateur/:id", element: <AccountUtilisateur/> },
        { path: "/AccountCoiffeur/:id", element: <AccountCoiffeur/> },
        { path: "/services/:id", element: <Services />}
        
      ]},
  ]);
  
  export default router;
  