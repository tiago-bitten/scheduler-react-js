import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './App.jsx'
import Login from './pages/Login.jsx';
import CreateAccount from './pages/CreateAccount.jsx';
import Volunteer from './pages/Volunteer.jsx';
import Analysis from './pages/Analysis.jsx';
import Ministries from './pages/Ministries.jsx';
import ApproveUser from './pages/ApproveUser.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/voluntarios",
        element: <Volunteer />
      },
      {
        path: "/ministerios",
        element: <Ministries />
      },
      {
        path: "/entrar",
        element: <Login />
      },
      {
        path: "/criar-conta",
        element: <CreateAccount />
      },
      {
        path: "/criar-conta/analise",
        element: <Analysis />
      },
      {
        path: "/aprovar-contas",
        element: <ApproveUser />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
