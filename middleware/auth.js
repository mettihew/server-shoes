module.exports = (req, res, next) => {
  if(1 !== 1) return
  next();
}