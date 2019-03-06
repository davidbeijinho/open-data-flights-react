import { scaleSqrt } from 'd3-scale';
import { getAirportById } from './airports';

const getFileUrl = ({ country, measure }) => {
  return `${
    process.env.PUBLIC_URL
  }/data/processed/avia_par_${country.toLowerCase()}_${measure}.json`;
};

const createRange = (data, key) => {
  const values = data.map((v) => parseInt(v[key], 10)).filter((v) => v);

  return scaleSqrt()
    .domain([Math.min(...values), Math.max(...values)])
    .range([2, 30]);
};

const getRoutes = (data) => {
  return fetch(getFileUrl(data))
    .then((response) => response.json())
    .then((routesdData) => {
      return routesdData;
    });
};

const parseRoutes = (routes, year) => {
  const range = createRange(routes, year);

  const values = routes
    .map((value) => {
      const departureAirport = getAirportById(value.departure.airport);
      const arrivalAirport = getAirportById(value.arrival.airport);
      if (
        departureAirport.length &&
        arrivalAirport.length &&
        value[parseInt(year, 10)]
      ) {
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
            strokeWidth: range(parseInt(value[year], 10)),
            strokeColor: 'rgba(100, 10, 200, 0.4)',
            greatArc: true
          }
        };
      }
      return false;
    })
    .filter((d) => d);
  return values;
};

export { parseRoutes, getRoutes };
