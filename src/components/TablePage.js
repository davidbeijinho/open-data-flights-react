import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DropDown from './DropDown';
import countryList from '../lib/countries';
import yearsList from '../lib/years';
import measures from '../config/measures.json';
import { setMeasure, setYear, setCountry } from '../actions/queryActions';
import { fetchRoutesIfNeeded } from '../actions/routeActions';

function TablePage(props) {
  const {
    onChangeCountry,
    onChangeYear,
    onChangeMeasure,
    country,
    year,
    measure,
    onLoadRoutesIfNeeded
  } = props;
  return (
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
  );
}
const mapStateToProps = (state) => {
  return {
    year: state.query.year,
    measure: state.query.measure,
    country: state.query.country
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
