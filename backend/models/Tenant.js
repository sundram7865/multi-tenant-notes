const mongoose = require("mongoose");

const tenantSchema = new mongoose.Schema({
  name: String,
  slug: String,
  subscription: { type: String, enum: ["FREE", "PRO"], default: "FREE" },
});

module.exports = mongoose.model("Tenant", tenantSchema);
