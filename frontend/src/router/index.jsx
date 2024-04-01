import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Root from '../App.jsx';
import Information from '../views/Information.jsx';
import Account from '../views/Account.jsx';
import Login from '../views/Login.jsx';
import NoMatch from '../views/NoMatch.jsx';
import CreationCompt from '../views/CreationCompt.jsx';
import Home from '../views/Home.jsx';

const token = localStorage.getItem('token');

const router = !token ? (
  createBrowserRouter([
    { path: '/', element: <Login /> },
    { path: '/Login', element: <Login /> },
    { path: '/Creation', element: <CreationCompt /> },
  ])
) : (
  createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      errorElement: <NoMatch />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/Home', element: <Home /> },
        { path: '/Information/:id', element: <Information /> },
        { path: '/Account', element: <Account /> },
        // Add more routes for authenticated users
      ],
    },
  ])
);

export default router;
