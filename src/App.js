import React, { Component } from 'react';
import Datamap from 'datamaps';
import './App.css';

import { airports, colors } from './lib/airports';

class App extends Component {
  drawMap() {
    console.log(colors);
    const map = new Datamap({
      //   height: '100%', //if not null, datamaps will grab the height of 'element'
      // width: '100%',
      responsive: true,
      element: document.getElementById('container'),
      // scope: 'usa'
      geographyConfig: {
        highlightOnHover: false,
        popupOnHover: false
      },
      fills: {
        defaultFill: '#ABDDA4',
        ...colors
      },
      // bubblesConfig: {
      //   borderWidth: 0,
      //   borderOpacity: 0,
      //   fillOpacity: 0.75,
      // }
    });
    map.bubbles(airports);
  }

  componentDidMount() {
    console.log('MOUNTTT');
    this.drawMap();
  }

  render() {
    return <div id="container" />;
  }
}

export default App;
