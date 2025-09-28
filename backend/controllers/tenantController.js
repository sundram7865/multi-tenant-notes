const Tenant = require("../models/Tenant");
const User = require("../models/User");

// Upgrade tenant subscription
exports.upgradeTenant = async (req, res) => {
  try {
    const tenant = await Tenant.findOne({ slug: req.params.slug });
    if (!tenant) return res.status(404).json({ message: "Tenant not found" });

    tenant.subscription = "PRO";
    await tenant.save();

    res.json({ message: "Upgraded to PRO" });
  } catch (err) {
    console.error("Upgrade tenant error:", err);
    res.status(500).json({ message: "Server error while upgrading tenant" });
  }
};

// Get all users of the tenant
exports.getTenantUsers = async (req, res) => {
  try {
    const users = await User.find({ tenant: req.user.tenant._id }).select("-password");
    res.json(users);
  } catch (err) {
    console.error("Get tenant users error:", err);
    res.status(500).json({ message: "Server error while fetching users" });
  }
};

// Invite a new user
exports.inviteUser = async (req, res) => {
  const { slug } = req.params;
  const { email, role } = req.body;

  try {
    // Find tenant by slug
    const tenant = await Tenant.findOne({ slug });
    if (!tenant) return res.status(404).json({ message: "Tenant not found" });

  
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });


    const normalizedRole = role.toUpperCase();

  
    const newUser = await User.create({
      email,
      role: normalizedRole, 
      tenant: tenant._id,
      password: "temporary123", 
    });

    res.status(201).json(newUser);
  } catch (err) {
    console.error("Invite user error:", err);
    res.status(500).json({ message: "Server error while inviting user" });
  }
};


exports.downgradeTenant = async (req, res) => {
  try {
    const tenant = await Tenant.findOne({ slug: req.params.slug });
    if (!tenant) return res.status(404).json({ message: "Tenant not found" });

    tenant.subscription = "FREE";
    await tenant.save();

    res.json({ message: "Downgraded to FREE" });
  } catch (err) {
    console.error("Downgrade tenant error:", err);
    res.status(500).json({ message: "Server error while downgrading tenant" });
  }
};
