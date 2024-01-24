import React from 'react'
import './App.css'
import RoundButton from './components/RoundButton';
import DefaultInput from './components/DefaultInput';

function App() {

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <DefaultInput label="Nome" />
      </div>
    </>
  )
}

export default App;
