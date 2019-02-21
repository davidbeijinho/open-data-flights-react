import airportsData from '../data/airports.json';
import d3 from 'd3';

// const color_scale = d3.scale.linear().domain([0, airportsData.length]).range(['beige', 'red']);
const color_scale = d3.scale
  .linear()
  .domain([1, airportsData.length])
  .interpolate(d3.interpolateHcl)
  .range([d3.rgb('#007AFF'), d3.rgb('#FFF500')]);
const colors = {};
console.log(color_scale(10));
const airports = airportsData.map(value => {
  colors[value.ICAO] = color_scale(value.id);
  return {
    name: value.name,
    radius: 3,
    latitude: value.lat,
    longitude: value.long,
    fillKey: value.ICAO,
    // borderColor
    borderWidth: 0,
    borderOpacity: 0,
    fillOpacity: 1
  };
});

export { airports, colors };
