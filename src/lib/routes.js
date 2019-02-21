import { getAirportById } from './airports';
// import routesdData from '../data/processed/avia_par_mk_CAF_PAS.json';
import routesdData from '../data/processed/avia_par_uk_PAS_CRD.json';

const routes = routesdData.map(value => {
  const departureAiport = getAirportById(value.departureAiport);
  const arrivalAiport = getAirportById(value.arrivalAiport);
  if (departureAiport.length && arrivalAiport.length) {
    return {
      origin: {
        latitude: departureAiport[0].latitude,
        longitude: departureAiport[0].longitude
      },
      destination: {
        latitude: arrivalAiport[0].latitude,
        longitude: arrivalAiport[0].longitude
      },
      options: {
        strokeWidth: value['2018Q1'] * 0.0025,
        strokeColor: 'rgba(100, 10, 200, 0.4)',
        greatArc: true
      }
    };
  }
}).filter((d) => d);

export { routes };
