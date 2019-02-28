import years from '../config/years.json';

const yearsList = years.map((value) => {
    return {
        id: value,
        label: value,
        value: value,
    };
});

export { yearsList };
