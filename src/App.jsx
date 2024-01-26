import React from 'react'
import './App.css'
import Login from './pages/Login';

import { Input } from '@material-tailwind/react';

function App() {

  return (
    <>
        <Input
            type="text"
            color="lightBlue"
            size="regular"
            outline={true}
            placeholder="Digite algo..."
        />
    </>
  )
}

export default App;
