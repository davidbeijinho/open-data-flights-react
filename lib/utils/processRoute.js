const { filedWhiteList } = require('../config/config.json').parseRoutes;

const castValues = (data) => {
  const processedData = data;
  Object.keys(processedData).forEach((key) => {
    if (filedWhiteList.indexOf(key) === -1) {
      processedData[key] = parseInt(processedData[key], 10);
    }
  });

  return processedData;
};

const splitAirports = (data) => {
  const processedData = data;
  const key = 'airp_pr\\time';
  const info = processedData[key].split('_');
  delete processedData[key];
  return {
    departure: {
      country: info[0],
      airport: info[1]
    },
    arrival: {
      country: info[2],
      airport: info[3]
    },
    ...processedData
  };
};

const processHeader = (data) => {
  const processedData = data;
  const key = 'unit,tra_meas,airp_pr\\time';
  const keys = key.split(',');
  const values = processedData[key].split(',');
  delete processedData[key];
  keys.forEach((value, index) => {
    processedData[value] = values[index];
  });

  return castValues(splitAirports(processedData));
};

const cleanData = (data) => {
  const processedData = data;

  Object.keys(processedData).forEach((key) => {
    if (processedData[key] === ':') {
      delete processedData[key];
    }
  });

  return processedData;
};

const insertData = (data, destination) => {
  const processedData = destination;
  if (data) {
    const processedRow = processHeader(cleanData(data));
    if (processedData[processedRow.tra_meas]) {
      processedData[processedRow.tra_meas].push(processedRow);
    } else {
      processedData[processedRow.tra_meas] = [processedRow];
    }
  }
  return processedData;
};

module.exports = {
  insertData
};
