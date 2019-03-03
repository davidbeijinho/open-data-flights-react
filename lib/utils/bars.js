const createBar = (total, multi, name) =>
  multi.newBar(`${name} [:bar] :percent :etas`, {
    width: 30,
    total
  });

module.exports = {
  createBar
};
