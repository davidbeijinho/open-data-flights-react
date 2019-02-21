import { getAirportById } from './airports';
import d3 from 'd3';

const key = '2000';

function getRoutes(data) {
  return fetch(getFileUrl(data))
    .then(response => response.json())
    .then(function(routesdData) {
      const range = createRange(routesdData);
      return routesdData
        .map(value => {
          const departureAiport = getAirportById(value.departureAiport);
          const arrivalAiport = getAirportById(value.arrivalAiport);

          if (departureAiport.length && arrivalAiport.length) {
            return {
              origin: {
                latitude: departureAiport[0].latitude,
                longitude: departureAiport[0].longitude
              },
              destination: {
                latitude: arrivalAiport[0].latitude,
                longitude: arrivalAiport[0].longitude
              },
              options: {
                strokeWidth: range(parseInt(value[key])),
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

function createRange(data) {
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
