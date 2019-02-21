function createBar(size, multi, name) {
  return multi.newBar(`${name} [:bar] :percent :etas`, {
    width: 30,
    total: size
  });
}

module.exports = {
  createBar
};
