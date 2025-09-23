const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/* ------------------ TEACHER MODEL ------------------ */
const teacherSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, default: "Teacher", immutable: true },
    department: { type: String, required: true },
    subjects: [{ type: Schema.Types.ObjectId, ref: "Subject" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Teacher", teacherSchema);
