module.exports = function logger(req, res, next) {
  console.log(`[${new Date().toLocaleString("id-ID")}] ${req.method} ${req.originalUrl}`);
  next();
};
