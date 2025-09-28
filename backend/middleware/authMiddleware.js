const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

     
      req.user = await User.findById(decoded.id).populate("tenant");

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      return next();
    }

    return res.status(401).json({ message: "No token provided" });
  } catch (err) {
    console.error("Protect middleware error:", err);
    return res.status(401).json({ message: "Not authorized" });
  }
};

module.exports = { protect };
