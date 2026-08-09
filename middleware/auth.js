// Untuk halaman dashboard (redirect ke /login)
function requireLogin(req, res, next) {
  if (req.session && req.session.user) return next();
  return res.redirect("/login");
}

// Untuk REST API (balas JSON 401)
function requireApiAuth(req, res, next) {
  if (req.session && req.session.user) return next();
  return res.status(401).json({ status: "error", message: "Unauthorized: silakan login dulu" });
}

module.exports = { requireLogin, requireApiAuth };
