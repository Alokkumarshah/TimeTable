const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/* ------------------ STUDENT MODEL ------------------ */
const studentSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, default: "Student", immutable: true },
    enrollmentNumber: { type: String, required: true, unique: true },
    year: { type: Schema.Types.ObjectId, ref: "Year", required: true },
    department: { type: String, required: true },
    class: { type: Schema.Types.ObjectId, ref: "Classroom" },
    subjects: [{ type: Schema.Types.ObjectId, ref: "Subject" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
