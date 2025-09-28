const express = require("express");
const tenantController = require("../controllers/tenantController");
const router = express.Router();
const { upgradeTenant , getTenantUsers, inviteUser,downgradeTenant} = require("../controllers/tenantController"); // <- make sure this is correct
const {protect} = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

router.post("/:slug/upgrade", protect, authorize(["ADMIN"]), upgradeTenant);
router.get("/users", protect,authorize(["ADMIN"]), getTenantUsers);
router.post("/:slug/invite", protect, authorize(["ADMIN"]), inviteUser);
router.post("/:slug/downgrade", protect, authorize(["ADMIN"]), downgradeTenant);
module.exports = router;
