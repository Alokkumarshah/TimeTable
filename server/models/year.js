const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/* ------------------ YEAR MODEL ------------------ */
const yearSchema = new Schema(
  {
    yearName: {
      type: String,
      required: true,
      enum: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
    },
    department: { type: String, required: true },
    subjects: [{ type: Schema.Types.ObjectId, ref: "Subject" }],
    students: [{ type: Schema.Types.ObjectId, ref: "Student" }],
    createdBy: { type: Schema.Types.ObjectId, ref: "Admin" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Year", yearSchema);
