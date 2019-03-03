import React, { Component } from 'react';
// import Datamap from 'datamaps';

import Datamap from 'react-datamaps';

import DropDown from './components/DropDown';
import countryList from './lib/countries';
import yearsList from './lib/years';
import measures from './config/measures.json';
import './App.css';

import { createAirports, colors } from './lib/airports';
import getRoutes from './lib/routes';

const airportsList = createAirports();

// const setMap = () => {
//   map = new Datamap({
//     responsive: true,
//     element: document.getElementById('container'),
//     geographyConfig: {
//       highlightOnHover: false,
//       popupOnHover: false
//     },
//     fills: {
//       defaultFill: '#ABDDA4',
//       ...colors
//     }
//   });
// };

class App extends Component {
  state = {
    showRoutes: false,
    routes: [],
    showAirports: false,
    airports: airportsList,
    country: countryList[0].value,
    measure: measures[0].value,
    year: yearsList[0].value
  };

  componentDidMount() {
    // setMap();
  }

  onChangeCountry(data) {
    this.setState({ country: data });
  }

  onChangeMeasure(data) {
    this.setState({ measure: data });
  }

  onChangeYear(data) {
    this.setState({ year: data });
  }

  drawRoutes() {
    const { showRoutes, measure, country, year } = this.state;
    if (showRoutes) {
      // map.arc([]);
      this.setState({ routes: [] });
    } else {
      // const routes=
      getRoutes({
        measure,
        country,
        year
      }).then((routes) => {
        // return d
        this.setState({ routes });
        // map.arc(routes);
      });
    }
    this.setState({ showRoutes: !showRoutes });
  }

  drawAirports() {
    const { showAirports } = this.state;
    if (showAirports) {
      this.setState({ airports: [] });
    } else {
      this.setState({ airports: airportsList });
    }
    this.setState({ showAirports: !showAirports });
  }

  render() {
    const { airports, routes, measure, country, year } = this.state;
    return (
      <div>
        <Datamap
          responsive
          geographyConfig={{
            highlightOnHover: false,
            popupOnHover: false
          }}
          bubbles={airports}
          fills={{
            defaultFill: '#ABDDA4',
            ...colors
          }}
          arc={routes}
        />

        <DropDown
          id="countries"
          value={country}
          label="select country"
          list={countryList}
          onUpdate={(d) => {
            this.onChangeCountry(d);
          }}
        />
        <DropDown
          id="years"
          value={year}
          label="select year"
          list={yearsList}
          onUpdate={(d) => {
            this.onChangeYear(d);
          }}
        />
        <DropDown
          id="measures"
          value={measure}
          label="select measure"
          list={measure}
          onUpdate={(d) => {
            this.onChangeMeasure(d);
          }}
        />
        <button
          type="button"
          onClick={() => {
            this.drawRoutes();
          }}
        >
          Routes
        </button>
        <button
          type="button"
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
