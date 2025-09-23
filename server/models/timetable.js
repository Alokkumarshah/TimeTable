const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/* ------------------ TIMETABLE MODEL ------------------ */
const timetableSchema = new Schema(
  {
    year: { type: Schema.Types.ObjectId, ref: "Year", required: true },
    week: { type: Number, required: true }, // e.g. week number of the year
    day: {
      type: String,
      enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      required: true,
    },
    slots: [
      {
        startTime: { type: String, required: true }, // "09:00"
        endTime: { type: String, required: true },   // "10:00"
        subject: { type: Schema.Types.ObjectId, ref: "Subject", required: true },
        teacher: { type: Schema.Types.ObjectId, ref: "Teacher", required: true },
        classroom: { type: Schema.Types.ObjectId, ref: "Classroom", required: true },
        requestChange: {
          type: Boolean,
          default: false, // teacher can request a change
        },
        requestNote: {
          type: String, // reason for change request
        },
      },
    ],
    createdBy: { type: Schema.Types.ObjectId, ref: "Admin" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Timetable", timetableSchema);
