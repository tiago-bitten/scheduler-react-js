import React from 'react'
import ReactDOM from 'react-dom/client'
import moment from 'moment';
import 'moment/locale/pt-br';
import './index.css'

moment.locale('pt-br');

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './App.jsx'
import Login from './pages/Login.jsx';
import CreateAccount from './pages/CreateAccount.jsx';
import Volunteer from './pages/Volunteer.jsx';
import Analysis from './pages/Analysis.jsx';
import Ministries from './pages/Ministries.jsx';
import ApproveUser from './pages/ApproveUser.jsx';
import Schedule from './pages/Schedule.jsx';
import LoginVolunteer from './pages/LoginVolunteer.jsx';
import AutoCreateVolunteer from './pages/AutoCreateVolunteer.jsx';
import UnavailableDate from './pages/UnavailableDate.jsx';
import NotFound from './pages/NotFound.jsx';
import Group from './pages/Group.jsx';

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
      },
      {
        path: "/agendas",
        element: <Schedule />
      },
      {
        path: "/voluntario/entrar/",
        element: <LoginVolunteer />
      },
      {
        path: '/voluntario/criar-conta/:cpf/:birthDate',
        element: <AutoCreateVolunteer />
      },
      {
        path: "/voluntario/:accessKey/indisponibilidade",
        element: <UnavailableDate />
      },
      {
        path: "/grupos",
        element: <Group />
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
