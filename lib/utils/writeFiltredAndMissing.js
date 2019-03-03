const { writeFileWithLog } = require('./writeFile');

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

  console.log(`${label} processed: ${allData.length}`);

  writeFileWithLog(
    missingFileName,
    missing,
    `${label} missing: ${missing.length}`
  );
  writeFileWithLog(
    filtredFileName,
    filtred,
    `${label} filtred: ${filtred.length}`
  );
};

module.exports = {
  writeFiltredAndMissing
};