const express = require("express");
const router = express.Router();
const { upgradeTenant } = require("../controllers/tenantController"); // <- make sure this is correct
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

router.post("/:slug/upgrade", protect, authorize(["ADMIN"]), upgradeTenant);

module.exports = router;
