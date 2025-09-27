const Tenant = require("../models/Tenant");

exports.upgradeTenant = async (req,res)=>{
  const tenant = await Tenant.findOne({ slug: req.params.slug });
  if(!tenant) return res.status(404).json({message: "Tenant not found"});
  tenant.subscription = "PRO";
  await tenant.save();
  res.json({message: "Upgraded to PRO"});
}
