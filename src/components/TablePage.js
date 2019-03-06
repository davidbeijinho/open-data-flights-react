import React from 'react';
import { connect } from 'react-redux';
import uniq from 'lodash.uniq';

import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import DropDown from './DropDown';
import countryList from '../lib/countries';
import yearsList from '../lib/years';
import measures from '../config/measures.json';
import { setMeasure, setYear, setCountry } from '../actions/queryActions';
import { fetchRoutesIfNeeded } from '../actions/routeActions';

import 'react-table/react-table.css';

function getColumns(routes) {
  let baseCollums = [];
  if (routes[0]) {
    const whiteList = ['arrival', 'departure', 'tra_meas', 'unit'];
    baseCollums = uniq(routes.map((v) => Object.keys(v)).flat())
      .map((v) => {
        if (whiteList.indexOf(v) === -1) {
          return {
            Header: v,
            accessor: v
          };
        }
        return false;
      })
      .filter((v) => v);
  }
  return [
    {
      Header: 'Arrival country',
      accessor: 'arrival.country'
    },
    {
      Header: 'Arrival airport',
      accessor: 'arrival.airport'
    },
    {
      Header: 'Departure country',
      accessor: 'departure.country'
    },
    {
      Header: 'Departure airport',
      accessor: 'departure.airport'
    },
    {
      Header: 'Measure',
      accessor: 'tra_meas'
    },
    {
      Header: 'Unit',
      accessor: 'unit'
    },
    ...baseCollums
  ];
}

function TablePage(props) {
  const {
    onChangeCountry,
    onChangeYear,
    onChangeMeasure,
    country,
    year,
    measure,
    onLoadRoutesIfNeeded,
    routes
  } = props;
  return (
    <div>
      <div>
        <DropDown
          id="countries"
          value={country}
          label="select country"
          list={countryList}
          onUpdate={onChangeCountry}
        />
        <DropDown
          id="years"
          value={year}
          label="select year"
          list={yearsList}
          onUpdate={onChangeYear}
        />
        <DropDown
          id="measures"
          value={measure}
          label="select measure"
          list={measures}
          onUpdate={onChangeMeasure}
        />
        <button type="button" onClick={onLoadRoutesIfNeeded}>
          Load Routes
        </button>
        <button type="button" onClick={onLoadRoutesIfNeeded}>
          Load Airports
        </button>
      </div>
      {routes.length ? (
        <ReactTable data={routes} columns={getColumns(routes)} />
      ) : null}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    year: state.query.year,
    measure: state.query.measure,
    country: state.query.country,
    routes: state.routes.routes
  };
};

export default connect(
  mapStateToProps,
  {
    onChangeCountry: setCountry,
    onChangeYear: setYear,
    onChangeMeasure: setMeasure,
    onLoadRoutesIfNeeded: fetchRoutesIfNeeded
  }
)(TablePage);

TablePage.propTypes = {
  onChangeCountry: PropTypes.func.isRequired,
  onChangeYear: PropTypes.func.isRequired,
  onChangeMeasure: PropTypes.func.isRequired,
  onLoadRoutesIfNeeded: PropTypes.func.isRequired,
  country: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  measure: PropTypes.string.isRequired
};
