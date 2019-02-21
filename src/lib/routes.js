import { getAirportById } from './airports';
import routesdData from '../data/processed/avia_par_mk_CAF_PAS.json';

const routes = routesdData.map((value) => {
    const departureAiport = getAirportById(value.departureAiport)[0];
    const arrivalAiport= getAirportById(value.arrivalAiport)[0];
    return   {
        origin: {
            latitude: departureAiport.latitude,
            longitude: departureAiport.longitude
        },
        destination: {
            latitude: arrivalAiport.latitude,
            longitude: arrivalAiport.longitude
        },
        options: {
          strokeWidth: value['2018Q1'] * 0.0025,
          strokeColor: 'rgba(100, 10, 200, 0.4)',
          greatArc: true
        }
    };
});

export { routes };
