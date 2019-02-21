import React, { Component } from 'react';
import Datamap from 'datamaps';
import './App.css';

import { airports, colors } from './lib/airports';
import { routes } from './lib/routes';
let map;
class App extends Component {
 
  drawMap() {
    console.log(colors);
    map = new Datamap({
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
      }
      // bubblesConfig: {
      //   borderWidth: 0,
      //   borderOpacity: 0,
      //   fillOpacity: 0.75,
      // }
    });
    map.bubbles(airports);
  }

  onClick() {
    console.log('uaaaaaa');
    map.arc( routes, {strokeWidth: 2});
  }

  componentDidMount() {
    console.log('MOUNTTT');
    this.drawMap();
  }

  render() {
    return (
      <div>
        <div id="container" />
        <button onClick={this.onClick}>+</button>
      </div>
    );
  }
}

export default App;
