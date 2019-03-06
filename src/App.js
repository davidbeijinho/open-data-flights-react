import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import TablePage from './components/TablePage.js';
import MainPage from './components/MainPage.js';
import MapPage from './components/MapPage.js';
import Menu from './components/Menu.js';

import './App.css';

function App() {
  return (
    <Router>
      <React.Fragment>
        <Menu />
        <Route path="/" exact component={MainPage} />
        <Route path="/map/" component={MapPage} />
        <Route path="/data/" component={TablePage} />
      </React.Fragment>
    </Router>
  );
}

export default App;
