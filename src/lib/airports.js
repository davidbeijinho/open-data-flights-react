import * as d3 from 'd3';
import { scaleLinear } from 'd3-scale';
import airportsData from '../data/airports/filtred-airports.json';

const createColorRange = (limit) => {
  return scaleLinear()
    .domain([1, limit])
    .interpolate(d3.interpolateHcl)
    .range([d3.rgb('#007AFF'), d3.rgb('#FFF500')]);
};

const getColors = () => {
  const colorRanges = createColorRange(airportsData.length);

  return airportsData.reduce((acc, value, index) => {
    acc[value.ident] = colorRanges(index);
    return acc;
  }, {});
};

const createAirports = () => {
  return airportsData.map(({ name, ident, latitude, longitude }) => {
    return {
      name,
      radius: 3,
      latitude,
      longitude,
      fillKey: ident,
      borderWidth: 0,
      borderOpacity: 0,
      fillOpacity: 1
    };
  });
};

const getAirportById = (id) =>
  airportsData.filter((value) => value.ident === id);

export { createAirports, getColors, getAirportById };
