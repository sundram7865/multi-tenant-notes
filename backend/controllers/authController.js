const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
      tenant: user.tenant.slug, 
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};


exports.login = async (req,res)=>{
  const { email, password } = req.body;
  const user = await User.findOne({ email }).populate("tenant");
 if (user && await user.matchPassword(password)) {
  const token = generateToken(user);

 
  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: "lax",
  });

 
  res.json({
    token,   
    user: { email: user.email, role: user.role, tenant: user.tenant.slug },
    message: "Login successful",
  });
}

else{
    res.status(401).json({message: "Invalid credentials"});
  }
}
