
const config = require('../config/config.json');

function insertData(data, destination) {
  if (data) {
    const processedData = processHeader(cleanData(data));
    if (destination[processedData.tra_meas]) {
      destination[processedData.tra_meas].push(processedData);
    } else {
      destination[processedData.tra_meas] = [processedData];
    }
  }
}

function cleanData(data) {
  for (let property in data) {
    if (data[property] === ':') {
      delete data[property];
    }
  }
  return data;
}

function processHeader(data) {
  const key = 'unit,tra_meas,airp_pr\\time';
  const keys = key.split(',');
  const values = data[key].split(',');
  delete data[key];
  keys.forEach((value, index) => {
    data[value] = values[index];
  });

  return castValues(splitAirports(data));
}

function castValues(data) {
  const fieldList = config.parseRoutes.filedWhiteList;
  for (const prop in data) {
    if (fieldList.indexOf(prop) === -1) {
      data[prop] = parseInt(data[prop]);
    }
  }
  return data;
}

function splitAirports(data) {
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
