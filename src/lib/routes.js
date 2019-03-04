import { scaleSqrt } from 'd3-scale';
import { getAirportById } from './airports';

const getFileUrl = (data) => {
  return `${
    process.env.PUBLIC_URL
  }/data/processed/avia_par_${data.country.toLowerCase()}_${data.measure}.json`;
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
      const range = createRange(routesdData, data.year);
      return routesdData
        .map((value) => {
          const departureAirport = getAirportById(value.departure.airport);
          const arrivalAirport = getAirportById(value.arrival.airport);

          if (
            departureAirport.length &&
            arrivalAirport.length &&
            value[data.year]
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
                strokeWidth: range(parseInt(value[data.year], 10)),
                strokeColor: 'rgba(100, 10, 200, 0.4)',
                greatArc: true
              }
            };
          }
          return false;
        })
        .filter((d) => d);
    });
};

export default getRoutes;
