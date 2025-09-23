const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/* ------------------ ADMIN MODEL ------------------ */
const adminSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, default: "Admin", immutable: true },
    phone: { type: String, trim: true },
    permissions: {
      type: [String],
      default: ["manageUsers", "manageTeachers", "manageStudents", "manageYears", "manageTimetables"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admin", adminSchema);
