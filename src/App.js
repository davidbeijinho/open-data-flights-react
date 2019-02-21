import React, { Component } from 'react';
import Datamap from 'datamaps';
import './App.css';

import { airports, colors } from './lib/airports';
import { routes } from './lib/routes';
let map;
class App extends Component {
  state = {
    routes: false,
    airports: false
  };
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
  }

  drawRoutes() {
    if (this.state.routes) {
      map.arc([]);
    } else {
      map.arc(routes);
    }
    this.setState({ routes: !this.state.routes });
  }

  drawAirports() {
    if (this.state.airports) {
      map.bubbles([]);
    } else {
      map.bubbles(airports);
    }
    this.setState({ airports: !this.state.airports });
  }

  componentDidMount() {
    this.drawMap();
  }

  render() {
    return (
      <div>
        <div id="container" />
        <button
          onClick={() => {
            this.drawRoutes();
          }}
        >
          Routes
        </button>
        <button
          onClick={() => {
            this.drawAirports();
          }}
        >
          Airports
        </button>
      </div>
    );
  }
}

export default App;
