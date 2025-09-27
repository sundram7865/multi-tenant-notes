const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: { type: String, enum: ["ADMIN", "MEMBER"], default: "MEMBER" },
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant" },
});
// Hash password before save
userSchema.pre("save", async function(next){
  if(!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
// Compare password
userSchema.methods.matchPassword = async function(password){
  return await bcrypt.compare(password, this.password);
}

module.exports = mongoose.model("User", userSchema);
