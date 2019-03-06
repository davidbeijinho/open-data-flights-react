import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { parseRoutes } from '../lib/routes';
import { getColors, createAirports } from '../lib/airports';
import Datamap from './Datamap';

const getRoutes = (routes, year) => parseRoutes(routes, parseInt(year, 10));

const getAirports = () => {
  return createAirports();
};

const getMapColors = () => {
  return {
    defaultFill: '#ABDDA4',
    // ...colors
    ...getColors()
  };
};

function MapPage({ routes, year }) {
  return (
    <Datamap
      responsive
      geographyConfig={{
        highlightOnHover: false,
        popupOnHover: false
      }}
      fills={getMapColors()}
      arc={getRoutes(routes, year)}
      bubbles={getAirports()}
    />
  );
}

const mapStateToProps = (state) => {
  return {
    routes: state.routes.routes,
    year: state.query.year
  };
};

export default connect(mapStateToProps)(MapPage);

MapPage.propTypes = {
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      arrival: PropTypes.shape({
        airport: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired
      }),
      departure: PropTypes.shape({
        airport: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired
      }),
      tra_meas: PropTypes.string.isRequired,
      unit: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  year: PropTypes.string.isRequired
};
