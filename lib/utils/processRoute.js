const {filedWhiteList} = require('../config/config').parseRoutes;

const insertData = (data, destination) => {
  if (data) {
    const processedData = processHeader(cleanData(data));
    if (destination[processedData.tra_meas]) {
      destination[processedData.tra_meas].push(processedData);
    } else {
      destination[processedData.tra_meas] = [processedData];
    }
  }
}

const cleanData = (data) => {
  for (const property in data) {
    if (data[property] === ':') {
      delete data[property];
    }
  }
  return data;
}

const processHeader = (data) => {
  const key = 'unit,tra_meas,airp_pr\\time';
  const keys = key.split(',');
  const values = data[key].split(',');
  delete data[key];
  keys.forEach((value, index) => {
    data[value] = values[index];
  });

  return castValues(splitAirports(data));
}

const castValues = (data) => {
  for (const property in data) {
    if (filedWhiteList.indexOf(property) === -1) {
      data[property] = parseInt(data[property]);
    }
  }
  return data;
}

const splitAirports = (data) => {
  const key = 'airp_pr\\time';
  const info = data[key].split('_');
  delete data[key];
  return {
    departure: {
      country: info[0],
      airport: info[1]
    },
    arrival: {
      country: info[2],
      airport: info[3]
    },
    ...data
  };
}

module.exports = {
  insertData
};
