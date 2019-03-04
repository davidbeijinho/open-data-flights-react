const generateFileName = (fileName, inExtension, outExtension) =>
  fileName.replace(inExtension, outExtension);

module.exports = {
  generateFileName
};
