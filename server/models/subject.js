const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/* ------------------ SUBJECT MODEL ------------------ */
const subjectSchema = new Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true, uppercase: true },
    credits: { type: Number, default: 3 },
    teacher: { type: Schema.Types.ObjectId, ref: "Teacher", required: true },
    students: [{ type: Schema.Types.ObjectId, ref: "Student" }],
    year: { type: Schema.Types.ObjectId, ref: "Year", required: true },
    department: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subject", subjectSchema);
