import './App.css';
import React from 'react';
import { UseState } from './UseState.js';
import { UseReduce } from './UseReducer.js';

function App() {
  return (
    <div className="App">
      <UseState
       name={'componente funcional'}        
       />
      <UseReduce
      name={'useReducer'}
       />
    </div>
  );
}

export { App };
