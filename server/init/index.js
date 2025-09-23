const mongoose = require("mongoose");

// Import Models
const Admin = require("../models/admin");
const Teacher = require("../models/teacher");
const Student = require("../models/student");
const Year = require("../models/year");
const Subject = require("../models/subject");
const Classroom = require("../models/classroom");

const Timetable = require("../models/timetable");

// MongoDB URL
const MONGO_URL = "mongodb://127.0.0.1:27017/timetableDB";

// Connect to MongoDB
async function main() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("✅ Connected to MongoDB timetableDB");
    await initDB(); // Seed sample data
  } catch (err) {
    console.error("❌ Database connection error:", err);
  }
}

main();

// ------------------ INIT SAMPLE DATA ------------------
const initDB = async () => {
  try {
    console.log("⚡ Initializing database...");

    // Clear all old data
    await Admin.deleteMany({});
    await Teacher.deleteMany({});
    await Student.deleteMany({});
    await Year.deleteMany({});
    await Subject.deleteMany({});
    await Classroom.deleteMany({});
    await Timetable.deleteMany({});

    // ----- Create Admin -----
    const admin = await Admin.create({
      name: "Super Admin",
      email: "admin@example.com",
      password: "admin123",
    });

    // ----- Create Teachers -----
    const teacher1 = await Teacher.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "teacher123",
      department: "Computer Science",
    });

    const teacher2 = await Teacher.create({
      name: "Jane Smith",
      email: "janesmith@example.com",
      password: "teacher123",
      department: "Mathematics",
    });

    // ----- Create Year -----
    const year1 = await Year.create({
      yearName: "1st Year",
      department: "Computer Science",
      createdBy: admin._id,
    });

    // ----- Create Subjects -----
    const subject1 = await Subject.create({
      name: "Programming Basics",
      code: "CS101",
      teacher: teacher1._id,
      year: year1._id,
      department: "Computer Science",
    });

    const subject2 = await Subject.create({
      name: "Mathematics I",
      code: "MA101",
      teacher: teacher2._id,
      year: year1._id,
      department: "Computer Science",
    });

    // Link subjects to teachers
    teacher1.subjects.push(subject1._id);
    teacher2.subjects.push(subject2._id);
    await teacher1.save();
    await teacher2.save();

    // ----- Create Classroom -----
    const classroom1 = await Classroom.create({
      roomNumber: "C101",
      capacity: 40,
      department: "Computer Science",
      year: year1._id,
    });

    // ----- Create Students -----
    const student1 = await Student.create({
      name: "Alice",
      email: "alice@example.com",
      password: "student123",
      enrollmentNumber: "CS25-001",
      year: year1._id,
      department: "Computer Science",
      class: classroom1._id,
      subjects: [subject1._id, subject2._id],
    });

    const student2 = await Student.create({
      name: "Bob",
      email: "bob@example.com",
      password: "student123",
      enrollmentNumber: "CS25-002",
      year: year1._id,
      department: "Computer Science",
      class: classroom1._id,
      subjects: [subject1._id, subject2._id],
    });

    // Update relationships
    year1.students.push(student1._id, student2._id);
    classroom1.students.push(student1._id, student2._id);
    subject1.students.push(student1._id, student2._id);
    subject2.students.push(student1._id, student2._id);

    await year1.save();
    await classroom1.save();
    await subject1.save();
    await subject2.save();

    // ----- Create Timetable -----
    await Timetable.create({
      year: year1._id,
      week: 1,
      day: "Monday",
      slots: [
        {
          startTime: "09:00",
          endTime: "10:00",
          subject: subject1._id,
          teacher: teacher1._id,
          classroom: classroom1._id,
        },
        {
          startTime: "10:15",
          endTime: "11:15",
          subject: subject2._id,
          teacher: teacher2._id,
          classroom: classroom1._id,
        },
      ],
      createdBy: admin._id,
    });

    console.log("✅ Database initialized with sample data!");
  } catch (err) {
    console.error("❌ Error initializing DB:", err);
  }
};
