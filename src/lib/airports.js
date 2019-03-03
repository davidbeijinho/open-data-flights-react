import d3 from 'd3';
import airportsData from '../data/airports/filtred-airports.json';

// const color_scale = d3.scale.linear().domain([0, airportsData.length]).range(['beige', 'red']);
const colors = {};

const createColorRange = (limit) => {
  return d3.scale
    .linear()
    .domain([1, limit])
    .interpolate(d3.interpolateHcl)
    .range([d3.rgb('#007AFF'), d3.rgb('#FFF500')]);
};

const createAirports = () => {
  const colorRanges = createColorRange(airportsData.length);

  return airportsData.map(({ name, ident, latitude, longitude }, index) => {
    colors[ident] = colorRanges(index);
    return {
      name,
      radius: 3,
      latitude,
      longitude,
      fillKey: ident,
      // borderColor
      borderWidth: 0,
      borderOpacity: 0,
      fillOpacity: 1
    };
  });
};

const getAirportById = (id) =>
  airportsData.filter((value) => value.ident === id);

export { createAirports, colors, getAirportById };
