import React, { Component } from 'react';
import Datamap from 'datamaps';
import './App.css';

import { airports, colors } from './lib/airports';
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
    var presidentialTrips = [
      {
          origin: {
              latitude: 38.895111,
              longitude: -77.036667
          },
          destination: {
              latitude: 32.066667,
              longitude: 34.783333 
          },
          options: {
            strokeWidth: Math.random() * 12,
            strokeColor: 'rgba(100, 10, 200, 0.4)',
            greatArc: true
          }
      },
      {
          origin: {
              latitude: 38.895111,
              longitude: -77.036667
          },
          destination: {
              latitude: 19.433333,
              longitude: -99.133333
            },
            options: {
              strokeWidth: Math.random() * 12,
              strokeColor: 'rgba(100, 10, 200, 0.4)',
              greatArc: true
            }
      },
      {
          origin: {
              latitude: 38.895111,
              longitude: -77.036667
          },
          destination: {
              latitude: 9.933333,
              longitude: -84.083333
            },
            options: {
              strokeWidth: Math.random() * 12,
              strokeColor: 'rgba(100, 10, 200, 0.4)',
              greatArc: true
            }
      },
      {
          origin: {
              latitude: 38.895111,
              longitude: -77.036667
          },
          destination: {
              latitude: 54.597 ,
              longitude: -5.93
            },
            options: {
              strokeWidth: Math.random() * 12,
              strokeColor: 'rgba(100, 10, 200, 0.4)',
              greatArc: true
            }
      },
      {
          origin: {
              latitude: 38.895111,
              longitude: -77.036667
          },
          destination: {
              latitude: 52.516667,
              longitude: 13.383333 
            },
            options: {
              strokeWidth: Math.random() * 12,
              strokeColor: 'rgba(100, 10, 200, 0.4)',
              greatArc: true
            }
      },
      {
          origin: {
              latitude: 38.895111,
              longitude: -77.036667
          },
          destination: {
              latitude: 14.692778,
              longitude: -17.446667
            },
            options: {
              strokeWidth: Math.random() * 12,
              strokeColor: 'rgba(100, 10, 200, 0.4)',
              greatArc: true
            }
      },
      {
          origin: {
              latitude: 38.895111,
              longitude: -77.036667
          },
          destination: {
              latitude: -26.204444,
              longitude: 28.045556
            },
            options: {
              strokeWidth: Math.random() * 12,
              strokeColor: 'rgba(100, 10, 200, 0.4)',
              greatArc: true
            }
      },
              {
          origin: {
              latitude: 38.895111,
              longitude: -77.036667
          },
          destination: {
              latitude: -6.8,
              longitude: 39.283333 
          }
      },
              {
          origin: {
              latitude: 38.895111,
              longitude: -77.036667
          },
          destination: {
              latitude: 59.329444,
              longitude: 18.068611
          }
      },
              {
          origin: {
              latitude: 38.895111,
              longitude: -77.036667
          },
          destination: {
              latitude: 59.95 ,
              longitude: 30.3
          }
      }
  ];
    console.log('uaaaaaa');
    map.arc( presidentialTrips, {strokeWidth: 2});
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
