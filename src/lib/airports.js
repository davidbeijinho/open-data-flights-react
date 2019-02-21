import airportsData from '../data/airports/front-filtred-airports.json';
import d3 from 'd3';

// const color_scale = d3.scale.linear().domain([0, airportsData.length]).range(['beige', 'red']);
const colors = {};

function createAirports() {
const colorRanges = createColorRange(airportsData.length);

return  airportsData.map((value, index) => {
  colors[value.ident] = colorRanges(index);
  return {
    name: value.name,
    radius: 3,
    latitude: value.latitude,
    longitude: value.longitude,
    fillKey: value.ident,
    // borderColor
    borderWidth: 0,
    borderOpacity: 0,
    fillOpacity: 1
  };
});
}

function createColorRange(limit) {
  return d3.scale
  .linear()
  .domain([1, limit])
  .interpolate(d3.interpolateHcl)
  .range([d3.rgb('#007AFF'), d3.rgb('#FFF500')]);
}

function getAirportById(id) {
  return airportsData.filter(value => {
    return value.ident === id;
  });
}

export { createAirports, colors, getAirportById };
