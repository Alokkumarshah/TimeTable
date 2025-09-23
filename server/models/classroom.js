const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const classroomSchema = new Schema({
  roomNumber: { type: String, required: true, unique: true },
  capacity: { type: Number, required: true },
  department: { type: String, required: true },
  year: { type: Schema.Types.ObjectId, ref: "Year", required: true },
  students: [{ type: Schema.Types.ObjectId, ref: "Student" }],
}, { timestamps: true });

module.exports = mongoose.model("Classroom", classroomSchema);
