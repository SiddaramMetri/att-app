import { useEffect, useState } from "react";
import { Empty } from "antd";

import { useParams } from "react-router-dom";
import CalenderContainer from "./CalenderContainer";
import axios from "axios";

const StudentReport = (props) => {
  const params = useParams();
  const studentId = params.id;
  // Attendance Report Tab
  const [attendanceStudentReport, setAttendanceStudentReport] = useState([]);

  const [student, setStudent] = useState({});

  const [attendanceCount, setAttendanceCount] = useState({});

  // Attendance Student Report
  useEffect(() => {
    axios
      .get(`/api/batches/students/${studentId}/attendances`)
      .then((res) => {
        const result = res.data;
        console.log(result);
        setAttendanceStudentReport(result);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [studentId]);

  // Student
  useEffect(() => {
    axios
      .get(`/api/students/${studentId}`)
      .then((res) => {
        const result = res.data;
        setStudent(result);
      })
      .catch((err) => {
        alert(err.message);
        setStudent({});
      });
  }, [studentId]);

  // StudentAttendance Count
  useEffect(() => {
    axios
      .get(`/api/batches/students/${studentId}/attendanceCount`)
      .then((res) => {
        const result = res.data;
        console.log(result);
        setAttendanceCount(result);
      })
      .catch((err) => {
        alert(err.message);
        setStudent({});
      });
  }, [studentId]);

  const events =
    attendanceStudentReport.length > 0 &&
    attendanceStudentReport.map((ele) => {
      return {
        ids: ele._id,
        dates: ele.date,
        title: ele.report[0].status,
        start: ele.date.slice(0, 10),
        color:
          ele.report[0].status === "present"
            ? "green"
            : ele.report[0].status === "absent"
            ? "red"
            : "blue",
      };
    });
  return (
    <div>
      <div className="container">
        <div className="card">
          {Object.keys(student).length === 0 ? (
            <div className="card shadow-sm p-4 ">
              <div className=" text-center">
                <Empty description={`Student Details is Not Found`} />
              </div>
            </div>
          ) : (
            <div className="row p-4">
              <div className="col-md-12">
                <table
                  className="table table-striped table-bordered"
                  style={{ width: "40%" }}
                >
                  <tr>
                    <td>Name :</td>
                    <td>{student.name}</td>
                  </tr>
                  <tr>
                    <td>Email :</td>
                    <td>{student.email}</td>
                  </tr>
                  <tr>
                    <td>Mobile :</td>
                    <td>{student.mobileNo}</td>
                  </tr>
                </table>
              </div>
              <hr />
              <div className="col-md-8 ">
                <div>
                  {attendanceStudentReport.length === 0 ? (
                    <div className="card  p-5 ">
                      <div className=" text-center p-5">
                        <Empty
                          description={`Student Attendance is Not Found`}
                        />
                      </div>
                    </div>
                  ) : (
                    <CalenderContainer events={events} />
                  )}
                </div>
              </div>
              <div className="col-md-4 mt-2">
                <br />
                <div className="card" style={{ width: "18rem" }}>
                  <div className="card-header">Attendance</div>
                  <ul className="list-group list-group-flush">
                    {Object.keys(attendanceCount).length === 0 ? (
                      <div className="card  p-5 ">
                        <div className=" text-center p-5">
                          <Empty
                            description={`Student Attendance Count is Not Found`}
                          />
                        </div>
                      </div>
                    ) : (
                      <table className="table table-resposive table table-bordered">
                        <thead>
                          <tr>
                            <th style={{ color: "green" }}>Attended</th>
                            <th>
                              <b> {attendanceCount.Present}</b>
                            </th>
                          </tr>
                          <tr>
                            <th style={{ color: "red" }}>Absent</th>
                            <th>
                              <b> {attendanceCount.Absent}</b>
                            </th>
                          </tr>
                          <tr>
                            <th style={{ color: "blue" }}>On Leave</th>
                            <th>
                              <b> {attendanceCount.Leave}</b>
                            </th>
                          </tr>
                          <tr className="bg-warning text-black">
                            <th style={{ color: "black" }}>Percentage</th>
                            <th>
                              <b>
                                {" "}
                                {attendanceCount.percentage !== "NaN" &&
                                  attendanceCount.percentage}{" "}
                                %
                              </b>
                            </th>
                          </tr>
                        </thead>
                      </table>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentReport;
