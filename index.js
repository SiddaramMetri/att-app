const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const csvtojson = require("csvtojson");
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());

app.use(cors());

const jwt = require("jsonwebtoken");
require("dotenv").config();

const upload = multer({ dest: "uploadsa/" });

app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

mongoose
  .connect(
    "mongodb+srv://metrisiddaram:mZlKtMYEufQ4sq47@cluster0.ykgxben.mongodb.net/attendanceAppV3"
  )
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log("error to connect the database", err);
  });

const Schema = mongoose.Schema;

//Student
const studentSchema = new Schema(
  {
    name: { type: String, required: true },
    type: { type: String, enum: ["online", "offline"] },
    email: { type: String, unique: true },
    mobileNo: {
      type: String,
      unique: true,
      required: true,
      minlength: 10,
      maxlength: 10,
    },
  },
  { timestamps: true }
);
const Student = mongoose.model("Student", studentSchema);

// Batch
const batchesSchema = new Schema(
  {
    batchName: {
      type: String,
      required: true,
      unique: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    students: [
      {
        studentId: {
          type: Schema.Types.ObjectId,
          ref: "Student",
          unique: true,
        },
        isActive: {
          type: Boolean,
          default: true,
        },
        joinedAt: {
          type: Date,
          default: Date.now,
        },
        trace: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timestamps: true }
);
const Batch = mongoose.model("Batch", batchesSchema);

// Attendance
const attendanceSchema = new Schema(
  {
    attdate: { type: Date },
    batchId: { type: Schema.Types.ObjectId, ref: "Batch" },
    sessionTitle: { type: String },
    sessionStartTime: { type: Date, default: Date.now },
    sessionEndTime: { type: Date, default: Date.now },
    report: [
      {
        studentId: {
          type: Schema.Types.ObjectId,
          ref: "Student",
        },
        status: {
          type: String,
        },
        attendedType: {
          type: String,
        },
        reason: {
          type: String,
        },
        attendedMin: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);
const Attendance = mongoose.model("Attendance", attendanceSchema);

// ----------------
// Students API
// ----------------

// GET
app.get("/api/students", (req, res) => {
  Student.find()
    .then((students) => {
      res.json(students);
    })
    .catch((err) => {
      res.json(err);
    });
});
// GET Student By Id
app.get("/api/students/:id", (req, res) => {
  const { id } = req.params;
  Student.findById(id)
    .then((students) => {
      res.json(students);
    })
    .catch((err) => {
      res.json(err);
    });
});
// POST
app.post("/api/students", (req, res) => {
  const { body } = req;
  const students = new Student(body);
  students
    .save()
    .then((students) => {
      res.json(students);
    })
    .catch((err) => {
      res.json(err);
    });
});
// PUT
app.put("/api/students/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  Student.findByIdAndUpdate(id, body, { new: true })
    .then((students) => {
      res.json(students);
    })
    .catch((err) => {
      res.json(err);
    });
});
// DELETE
app.delete("/api/students/:id", (req, res) => {
  const id = req.params.id;
  Student.findByIdAndDelete(id)
    .then((students) => {
      res.json(students);
    })
    .catch((err) => {
      res.json(err);
    });
});
// GET - SEARCH
app.get("/api/search", (req, res) => {
  const { text } = req.query;
  Student.find({ name: { $regex: text, $options: "i" } })
    .then((item) => {
      res.json(item);
    })
    .catch((err) => {
      res.json(err);
    });
});

// ------------------
// Batches API
// ------------------

// GET
app.get("/api/batches", (req, res) => {
  Batch.find({ isActive: true })
    .then((Batches) => {
      res.json(Batches);
    })
    .catch((err) => {
      res.json(err);
    });
});
// POST
app.post("/api/batches", (req, res) => {
  const { body } = req;
  const batches = new Batch(body);
  batches
    .save()
    .then((batches) => {
      res.json(batches);
    })
    .catch((err) => {
      res.json(err);
    });
});
// PUT
app.put("/api/batches/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  Batch.findByIdAndUpdate(id, body, { new: true })
    .then((batches) => {
      res.json(batches);
    })
    .catch((err) => {
      res.json(err);
    });
});
// GET Batches By ID
// Batches Dashboard
app.get("/api/batches/:id", (req, res) => {
  const { id } = req.params;
  Batch.findById(id)
    .populate({
      path: "students.studentId",
      select: "name type email mobileNo",
    })
    .then((Batches) => {
      res.json(Batches);
    })
    .catch((err) => {
      res.json(err);
    });
});
// Add Students to Batches
// Assgin Student to Batches
app.post("/api/batches/:id/students", (req, res) => {
  const { id } = req.params;
  const { body } = req;
  Batch.findByIdAndUpdate(id, { $push: { students: body } }, { new: true })
    .then((batches) => {
      res.json(batches);
    })
    .catch((err) => {
      console.error(err);
    });
});
// get Batches student are not in Batches
// GET All Student to Batche
app.get("/api/batche/students", (req, res) => {
  Batch.find({}, "students.studentId")
    .then((batches) => {
      const batchStudentIds = batches.reduce((ids, batch) => {
        return [...ids, ...batch.students.map((ele) => ele.studentId)];
      }, []);

      Student.find({ _id: { $nin: batchStudentIds } })
        .then((students) => {
          res.json(students);
        })
        .catch((err) => {
          res.json(err);
        });
    })
    .catch((err) => {
      res.json(err);
    });
});
// get BatchStudents
app.get("/api/batche/:id/students", (req, res) => {
  const { id } = req.params;
  Batch.findById({ _id: id })
    .populate({
      path: "students.studentId",
      select: "name type email mobileNo",
    })
    .then((batches) => {
      res.json(batches.students);
    })
    .catch((err) => {
      res.json(err);
    });
});
// GET - SEARCH Student in Batches
app.get("/api/search/:id/students", (req, res) => {
  const { text } = req.query;
  const { id } = req.params;
  Batch.findById({ _id: id })
    .populate({
      path: "students.studentId",
      select: "name type email mobileNo",
    })
    .then((batches) => {
      const result = batches.students.filter((ele) => {
        return ele.studentId.name.toLowerCase().includes(text.toLowerCase());
      });
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

// ------------------
// Attendance API
// ------------------
// GET
app.get("/api/batches/:id/attendance", (req, res) => {
  const { id } = req.params;
  Attendance.find({ batchId: id })
    .then((attendance) => {
      res.json(attendance);
    })
    .catch((err) => {
      res.json(err);
    });
});
// POST
app.post("/api/attendance", (req, res) => {
  const { body } = req;
  const attendance = new Attendance(body);
  attendance
    .save()
    .then((attendance) => {
      res.json(attendance);
    })
    .catch((err) => {
      res.json(err);
    });
});
// Attendance check form CSVtoJSON
// Attendance CSVtoJSON and get back
app.post(
  "/api/batches/:id/uploadattendace",
  upload.single("file"),
  (req, res) => {
    const { id } = req.params;
    csvtojson()
      .fromFile(req.file.path)
      .then((csvData) => {
        Batch.findById(id)
          .populate("students.studentId", "name")
          .then((batch) => {
            if (!batch) {
              return res.json({
                success: false,
                message: "Batch not found",
                batchId: id,
              });
            }
            const formData = batch.students.map((student) => {
              const csvStudents = csvData.filter((csvStudent) => {
                return (
                  csvStudent.name.toLowerCase() ===
                  student.studentId.name.toLowerCase()
                );
              });
              if (csvStudents.length > 1) {
                const attendedMin = csvStudents.reduce(
                  (sum, entry) => sum + parseFloat(entry.attendedMin),
                  0
                );
                return {
                  studentId: student.studentId._id,
                  name: student.studentId.name,
                  attendedType: "online",
                  status: "present",
                  attendedMin: attendedMin,
                };
              } else if (csvStudents.length === 1) {
                return {
                  studentId: student.studentId._id,
                  name: student.studentId.name,
                  attendedType: "online",
                  status: "present",
                  attendedMin: Number(csvStudents[0].attendedMin),
                };
              } else {
                return {
                  studentId: student.studentId._id,
                  name: student.studentId.name,
                  attendedType: "offline",
                  attendedMin: 0,
                  status: "absent",
                };
              }
            });

            const presentStudents = formData.filter((data) => {
              return data.status === "present";
            });

            if (presentStudents.length === 0) {
              return res.json({
                success: false,
                message: "No present students found",
                batchId: id,
              });
            }

            res.json({
              success: true,
              message: "Data Success",
              batchId: id,
              formData: formData,
            });
          });
      })
      .catch((err) => {
        console.error(err);
        res.json({ success: false, message: "Internal server error" });
      });
  }
);
// Attendance Report Tab
app.get("/api/batches/:id/attendanceReports", (req, res) => {
  const { id } = req.params;
  Attendance.find({ batchId: id })
    .populate({ path: "batchId", select: "batchName" })
    .populate({ path: "report.studentId", select: "name type email mobileNo" })
    .then((attendanceData) => {
      const studentsAttendance = {};

      attendanceData.forEach((ele) => {
        ele.report.forEach((data) => {
          if (data.studentId._id in studentsAttendance) {
            studentsAttendance[data.studentId._id].attendanceTotal += 1;

            if (data.status === "present") {
              studentsAttendance[data.studentId._id].attendancePresent += 1;
            } else if (data.status === "absent") {
              studentsAttendance[data.studentId._id].attendanceAbsent += 1;
            } else if (data.status === "leave") {
              studentsAttendance[data.studentId._id].attendanceLeave += 1;
            }
          } else {
            studentsAttendance[data.studentId._id] = {
              id: data.studentId._id,
              name: data.studentId.name,
              type: data.studentId.type,
              email: data.studentId.email,
              mobileNo: data.studentId.mobileNo,
              attendancePresent: data.status === "present" ? 1 : 0,
              attendanceAbsent: data.status === "absent" ? 1 : 0,
              attendanceLeave: data.status === "leave" ? 1 : 0,
              attendanceTotal: 1,
              percentage: 0,
            };
          }
        });
      });

      Object.values(studentsAttendance).forEach((attendance) => {
        attendance.percentage = (
          (attendance.attendancePresent /
            (attendance.attendancePresent +
              attendance.attendanceAbsent +
              attendance.attendanceLeave)) *
          100
        ).toFixed(2);
      });

      const attendanceReport = Object.values(studentsAttendance);

      res.json(attendanceReport);
    })
    .catch((err) => {
      res.json(err);
    });
});
// Traced Student Attendance Report
// attendance report trace functionality
app.get("/api/batche/:id/attendanceReport", (req, res) => {
  const { id } = req.params;
  Attendance.find({ batchId: id })
    .populate({ path: "batchId" })
    .populate({ path: "report.studentId", select: "name type email mobileNo" })
    .then((attendanceData) => {
      const studentsAttendance = {};

      attendanceData.forEach((ele) => {
        ele.report.forEach((data) => {
          const studentId = data.studentId._id;
          const student = ele.batchId.students.find(
            (s) => s.studentId.toString() === studentId.toString() && s.trace
          );
          if (student) {
            if (studentId in studentsAttendance) {
              studentsAttendance[studentId].attendanceTotal += 1;

              if (data.status === "present") {
                studentsAttendance[studentId].attendancePresent += 1;
              } else if (data.status === "absent") {
                studentsAttendance[studentId].attendanceAbsent += 1;
              } else if (data.status === "leave") {
                studentsAttendance[studentId].attendanceLeave += 1;
              }
            } else {
              const attendance = {
                id: studentId,
                name: data.studentId.name,
                type: data.studentId.type,
                email: data.studentId.email,
                mobileNo: data.studentId.mobileNo,
                attendancePresent: data.status === "present" ? 1 : 0,
                attendanceAbsent: data.status === "absent" ? 1 : 0,
                attendanceLeave: data.status === "leave" ? 1 : 0,
                attendanceTotal: 1,
                percentage: 0,
                trace: student.trace,
              };
              studentsAttendance[studentId] = attendance;
            }
          }
        });
      });

      Object.values(studentsAttendance).forEach((attendance) => {
        attendance.percentage = (
          (attendance.attendancePresent /
            (attendance.attendancePresent +
              attendance.attendanceAbsent +
              attendance.attendanceLeave)) *
          100
        ).toFixed(2);
      });

      const attendanceReport = Object.values(studentsAttendance);

      res.json(attendanceReport);
    })
    .catch((err) => {
      res.json(err);
    });
});
// Attendance Report of Student
app.get("/api/batches/students/:id/attendances", (req, res) => {
  const { id } = req.params;
  Attendance.find({ "report.studentId": id })
    .then((attendances) => {
      const output = [];
      attendances.forEach((a) => {
        const report = a.report.find((r) => r.studentId == id);
        if (report) {
          const data = {
            _id: a._id,
            date: a.attdate,
            report: [report],
          };
          output.push(data);
        }
      });
      res.json(output);
    })
    .catch((err) => {
      res.json(err);
    });
});
// Attendance Report of Student Indivisual Attendace count
app.get("/api/batches/students/:id/attendanceCount", (req, res) => {
  const { id } = req.params;
  Attendance.find({ "report.studentId": id })
    .then((attendances) => {
      let Present = 0;
      let Absent = 0;
      let Leave = 0;

      attendances.forEach((a) => {
        const report = a.report.find((r) => r.studentId == id);
        if (report) {
          if (report.status === "present") {
            Present++;
          } else if (report.status === "absent") {
            Absent++;
          } else if (report.status === "leave") {
            Leave++;
          }
        }
      });
      const totalCount = Present + Absent + Leave;

      const percentage = ((Present / totalCount) * 100).toFixed(2);
      res.json({ Present, Absent, Leave, percentage, totalCount });
    })
    .catch((err) => {
      res.json(err);
    });
});
// Live Session Attendance
app.get("/api/batches/:batchid/attendances/:id", (req, res) => {
  const { batchid, id } = req.params;
  Attendance.findById({ _id: id, batchId: batchid })
    .populate({ path: "batchId", select: "batchName" })
    .populate({ path: "report.studentId", select: "name " })
    .then((attendance) => {
      res.json(attendance);
    })
    .catch((err) => {
      res.json(err);
    });
});
// update the student trace
app.put("/api/batch/:batchId/student/:studentId", (req, res) => {
  const { batchId, studentId } = req.params;
  const { body } = req;

  Batch.findOneAndUpdate(
    { _id: batchId, "students.studentId": studentId },
    { $set: { "students.$.trace": body.trace } },
    { new: true }
  )
    .populate("students.studentId")
    .then((batch) => {
      if (!batch) {
        return res.json("Batch not found");
      }
      res.json(batch.students);
    })
    .catch((err) => {
      res.json(err);
    });
});

//----------------
// Login
//-----------------

const SECRET_KEY = process.env.SECRET_KEY;
const USERNAME = process.env.USERNAME_name;
const PASSWORD = process.env.PASSWORD;

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  if (username === USERNAME && password === PASSWORD) {
    const token = jwt.sign({ username }, SECRET_KEY);
    res.json({ token });
  } else if (username === USERNAME) {
    res.json({ error: "Incorrect password" });
  } else {
    res.json({ error: "Incorrect username or password" });
  }
});

app.listen(PORT, () => {
  console.log("server is running - ", PORT);
});
