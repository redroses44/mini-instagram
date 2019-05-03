import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Facebook from './components/auth/Facebook'

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Facebook} />
      </div>
    </Router>
  );
}

export default App;
