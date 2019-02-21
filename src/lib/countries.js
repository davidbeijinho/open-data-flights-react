import countries from '../data/countries/countries.json';

const countryList = countries.map((value) => {
    return {
        id: value,
        label: value,
        value,
    };
});

export { countryList };
