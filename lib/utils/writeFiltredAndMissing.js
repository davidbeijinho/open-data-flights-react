const { logger } = require('./logger.js');
const { writeFileWithLog } = require('./writeFile.js');

const processArray = (acc, v) => {
  acc[typeof v === 'string' ? 'missing' : 'filtred'].push(v);
  return acc;
};

const writeFiltredAndMissing = (
  dataObject,
  missingFileName,
  filtredFileName,
  label
) => {
  const allData = Object.values(dataObject);

  const { missing, filtred } = allData.reduce(processArray, {
    missing: [],
    filtred: []
  });

  logger.log('info', `${label} processed: ${allData.length}`);

  writeFileWithLog(
    filtredFileName,
    filtred,
    `${label} filtred: ${filtred.length}`
  );
  writeFileWithLog(
    missingFileName,
    missing,
    `${label} missing: ${missing.length}`
  );
};

module.exports = {
  writeFiltredAndMissing
};
