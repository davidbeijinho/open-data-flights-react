import React, { Component } from 'react';
import Datamap from 'datamaps';
import DropDown from './components/DropDown';
import { countryList } from './lib/countries';
import measure  from './config/measures.json';
import './App.css';

import { createAirports, colors } from './lib/airports';
import { getRoutes } from './lib/routes';
let map;
const airports = createAirports();

class App extends Component {
  state = {
    routes: false,
    airports: false,
    country: '',
    measure: '',
  };
  drawMap() {
    console.log(colors);
    map = new Datamap({
      responsive: true,
      element: document.getElementById('container'),
      geographyConfig: {
        highlightOnHover: false,
        popupOnHover: false
      },
      fills: {
        defaultFill: '#ABDDA4',
        ...colors
      }
    });
  }

  drawRoutes() {
    if (this.state.routes) {
      map.arc([]);
    } else {
      // const routes= 
      getRoutes({
        measure: this.state.measure,
        country: this.state.country,
      }).then((d) =>{ 
        // return d
        map.arc(d);
      });
      
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

  onChangeCountry(data) {
    this.setState({country: data});
  }

  onChangeMeasure(data) {
    this.setState({measure: data});
  }

  render() {
    return (
      <div>
        <div id="container" />
        <DropDown
          id="countries"
          label="select country"
          list={countryList}
          onUpdate={(d) => {this.onChangeCountry(d)}}
        />
           <DropDown
          id="measures"
          label="select measure"
          list={measure}
          onUpdate={(d) => {this.onChangeMeasure(d)}}
        />
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
