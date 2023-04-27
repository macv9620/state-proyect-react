import './App.css';
import React from 'react';
import { UseState } from './UseState.js';
import { ClassState } from './ClassState.js';

function App() {
  return (
    <div className="App">
      <UseState
       name={'componente funcional'}        
       />
      <ClassState
      name={'componente class'}
       />
    </div>
  );
}

export { App };
