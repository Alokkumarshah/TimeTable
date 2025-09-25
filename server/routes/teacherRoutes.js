const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController");

// Routes
router.get("/", teacherController.getAllTeachers);
router.get("/:id", teacherController.getTeacherById);
router.post("/", teacherController.createTeacher);
router.put("/:id", teacherController.updateTeacher);
router.delete("/:id", teacherController.deleteTeacher);

module.exports = router;
