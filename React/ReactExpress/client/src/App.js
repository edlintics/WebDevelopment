import React from 'react';
import logo from './logo.svg';
import './App.css';

import Customers from "./components/customers/customers.js"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1> Welcome React</h1>
      </header>
      <Customers />
    </div>
  );
}

export default App;
