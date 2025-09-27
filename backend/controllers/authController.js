const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (id) => jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1d"});

exports.login = async (req,res)=>{
  const { email, password } = req.body;
  const user = await User.findOne({ email }).populate("tenant");
 if (user && await user.matchPassword(password)) {
  const token = generateToken(user._id);

  // Set cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: "lax",
  });

  // Send JSON with token AND user
  res.json({
    token,   // <-- keep this for frontend localStorage login
    user: { email: user.email, role: user.role, tenant: user.tenant.slug },
    message: "Login successful",
  });
}

else{
    res.status(401).json({message: "Invalid credentials"});
  }
}
