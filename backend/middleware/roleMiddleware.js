const authorize = (allowedRoles) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const userRole = req.user.role.toUpperCase();
  const rolesUpper = allowedRoles.map((r) => r.toUpperCase());

  if (!rolesUpper.includes(userRole)) {
    return res.status(403).json({ message: "Access denied" });
  }

  next();
};

module.exports = authorize;
