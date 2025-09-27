const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (id) => jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1d"});

exports.login = async (req,res)=>{
  const { email, password } = req.body;
  const user = await User.findOne({ email }).populate("tenant");
  if(user && await user.matchPassword(password)){
    res.json({
      token: generateToken(user._id),
      user: { email: user.email, role: user.role, tenant: user.tenant.slug }
    });
  }else{
    res.status(401).json({message: "Invalid credentials"});
  }
}
