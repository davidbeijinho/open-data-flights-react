import countries from '../data/countries/filtred-countries.json';

const countryList = countries.map((value) => {
  return {
    id: value.code,
    label: value.name,
    value: value.code
  };
});

export default countryList;
