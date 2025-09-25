const express = require("express");
const router = express.Router();
const constraintController = require("../controllers/constraintController");

// Routes
router.get("/", constraintController.getAllConstraints);
router.get("/:id", constraintController.getConstraintById);
router.post("/", constraintController.createConstraint);
router.put("/:id", constraintController.updateConstraint);
router.delete("/:id", constraintController.deleteConstraint);

module.exports = router;
