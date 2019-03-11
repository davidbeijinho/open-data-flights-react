import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import TablePage from './TablePage.js';
import MainPage from './MainPage.js';
import MapPage from './MapPage.js';
import Menu from './Menu.js';

import './App.css';

function App() {
  return (
    <Router>
      <React.Fragment>
        <Menu />
        <Route exact path="/" component={MainPage} />
        <Route path="/map/" component={MapPage} />
        <Route path="/data/" component={TablePage} />
      </React.Fragment>
    </Router>
  );
}

export default App;
