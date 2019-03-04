import years from '../config/years.json';

const yearsList = years.map((value) => {
  return {
    id: value.toString(),
    label: value.toString(),
    value: value.toString()
  };
});

export default yearsList;
