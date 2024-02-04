import React from 'react'
import './App.css'

import { Outlet } from 'react-router-dom';
//import { SnackbarProvider } from './components/SnackBarProvider';
import { SnackbarProvider } from 'notistack';

function App() {

  return (
    <SnackbarProvider>
      <Outlet />
    </SnackbarProvider>
  );
}

export default App;
