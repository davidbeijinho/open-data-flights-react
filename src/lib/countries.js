import countries from '../data/countries/active-countries.json';

const countryList = countries.map((value) => {
  return {
    id: value.code,
    label: value.name,
    value: value.downloadCode
  };
});

export default countryList;
