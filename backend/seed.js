const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = require("./config/db");
const Tenant = require("./models/Tenant");
const User = require("./models/User");

connectDB();

const seed = async () => {
  await Tenant.deleteMany();
  await User.deleteMany();

  const acme = await Tenant.create({ name: "Acme", slug: "acme" });
  const globex = await Tenant.create({ name: "Globex", slug: "globex" });

  const users = [
    { email: "admin@acme.test", password: "password", role: "ADMIN", tenant: acme._id },
    { email: "user@acme.test", password: "password", role: "MEMBER", tenant: acme._id },
    { email: "admin@globex.test", password: "password", role: "ADMIN", tenant: globex._id },
    { email: "user@globex.test", password: "password", role: "MEMBER", tenant: globex._id },
  ];

  for(let u of users) await User.create(u);

  console.log("Seeded DB");
  process.exit();
}

seed();
