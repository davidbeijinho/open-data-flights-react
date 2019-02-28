import { getAirportById } from './airports';
import d3 from 'd3';

function getRoutes(data) {
  return fetch(getFileUrl(data))
    .then(response => response.json())
    .then(function(routesdData) {
      const range = createRange(routesdData, data.year);
      return routesdData
        .map(value => {
          const departureAirport = getAirportById(value.departure.airport);
          const arrivalAirport = getAirportById(value.arrival.airport);

          if (departureAirport.length && arrivalAirport.length) {
            return {
              origin: {
                latitude: departureAirport[0].latitude,
                longitude: departureAirport[0].longitude
              },
              destination: {
                latitude: arrivalAirport[0].latitude,
                longitude: arrivalAirport[0].longitude
              },
              options: {
                strokeWidth: range(parseInt(value[data.year])),
                strokeColor: 'rgba(100, 10, 200, 0.4)',
                greatArc: true
              }
            };
          }
          return false;
        })
        .filter(d => d);
    });
}

function createRange(data, key) {
  const values = data.map(v => parseInt(v[key])).filter(v => v);

  return d3.scale
    .sqrt()
    .domain([Math.min.apply(Math, values), Math.max.apply(Math, values)])
    .range([2, 30]);
}

function getFileUrl(data) {
  return `${
    process.env.PUBLIC_URL
  }/data/processed/avia_par_${data.country.toLowerCase()}_${data.measure}.json`;
}

export { getRoutes };
