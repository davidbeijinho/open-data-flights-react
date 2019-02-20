import React, { Component } from 'react';
import Datamap from 'datamaps';
// import logo from './logo.svg';
// import './App.css';

class App extends Component {

  drawMap() {
    console.log(document.getElementById('container'));
    new Datamap({
      element: document.getElementById('container'),
      // scope: 'usa'
      geographyConfig: {
        highlightOnHover: false,
        popupOnHover: false
    }
    });
  }

  componentDidMount() {
    console.log('MOUNTTT');
    this.drawMap();
  }


  render() {
    return (
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <p>
      //       Edit <code>src/App.js</code> and save to reload.
      //     </p>
      //     <a
      //       className="App-link"
      //       href="https://reactjs.org"
      //       target="_blank"
      //       rel="noopener noreferrer"
      //     >
      //       Learn React
      //     </a>
      //   </header>
      // </div>
      <div id="container"  style={{position: 'absolute', width: '100%', height:'100%'}} ></div>
    );
  }
}

export default App;
