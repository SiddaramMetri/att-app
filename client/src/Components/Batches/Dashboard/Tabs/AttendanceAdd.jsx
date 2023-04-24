import { useState } from "react";
import axios from "../../../../config/axios";

const AttendanceAdd = (props) => {
  const { batchesId, batchesData, addAttendance } = props;

  const [attendance, setAttendance] = useState([]);
  const [dates, setDates] = useState(new Date().toISOString().slice(0, 10));

  const handleChangeAttendace = (e, id) => {
    const attendanceData = {
      studentId: id,
      status: e.target.value,
    };
    const updatedAttendance = attendance.filter((ele) => ele.studentId !== id);
    setAttendance([...updatedAttendance, attendanceData]);
  };

  const handleSubmitAttendace = (e) => {
    e.preventDefault();

    if (dates !== "") {
      if (attendance.length !== 0) {
        const formDatas = {
          attdate: dates,
          batchId: batchesId,
          report: attendance,
        };

        axios
          .post("/api/attendance", formDatas)
          .then((res) => {
            addAttendance(res.data);
            alert("Attendance Added");
          })
          .catch((err) => {
            alert(err.message);
          });

        alert(
          ` ${batchesData.students.length} Out of ${attendance.length} Record is Added`
        );
      } else {
        alert("Add the atleast one Student Attendance");
      }
    } else {
      alert("Select the Date");
    }
  };

  const handleLeaveReason = () => {};

  return (
    <div>
      <div className="col-md-12">
        <form onSubmit={handleSubmitAttendace}>
          <div className="col-md-12 p-2 d-flex justify-content-between">
            <div className="col-md-2 d-flex flex-column gap-2  ">
              <label>Select Date</label>
              <input
                type="date"
                value={dates}
                onChange={(e) => {
                  setDates(e.target.value);
                }}
                className="form-control"
              />
            </div>
            <div></div>
          </div>
          <table className="table table-borded table-striped table-bordered ">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Email</th>
                <th>Mobile No</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {batchesData.students.map((Ele, i) => {
                const studentAttendance = attendance.find(
                  (ele) => ele.studentId === Ele.studentId._id
                );
                const isLeaveSelected =
                  studentAttendance?.attendance === "leave";

                return (
                  <tr key={i}>
                    <td>{Ele.studentId.name}</td>
                    <td>{Ele.studentId.type}</td>
                    <td>{Ele.studentId.email}</td>
                    <td>{Ele.studentId.mobileNo}</td>
                    <td>
                      <input
                        type="radio"
                        name={`attendance_${Ele.studentId._id}`}
                        value="present"
                        checked={attendance.find(
                          (ele) =>
                            ele.studentId === Ele.studentId._id &&
                            ele.attendance === "present"
                        )}
                        onChange={(e) =>
                          handleChangeAttendace(e, Ele.studentId._id)
                        }
                      />{" "}
                      Present{" "}
                      <input
                        type="radio"
                        name={`attendance_${Ele.studentId._id}`}
                        value="absent"
                        checked={attendance.find(
                          (ele) =>
                            ele.studentId === Ele.studentId._id &&
                            ele.attendance === "absent"
                        )}
                        onChange={(e) =>
                          handleChangeAttendace(e, Ele.studentId._id)
                        }
                      />{" "}
                      Absent{" "}
                      <input
                        type="radio"
                        name={`attendance_${Ele.studentId._id}`}
                        value="leave"
                        checked={attendance.find(
                          (ele) =>
                            ele.studentId === Ele.studentId._id &&
                            ele.attendance === "leave"
                        )}
                        onChange={(e) =>
                          handleChangeAttendace(e, Ele.studentId._id)
                        }
                      />{" "}
                      Leave
                      {isLeaveSelected && (
                        <input
                          type="text"
                          placeholder="Reason for leave"
                          value={studentAttendance?.leaveReason}
                          onChange={(e) =>
                            handleLeaveReason(e, Ele.studentId._id)
                          }
                        />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <input type="submit" className="btn btn-success" />
        </form>
      </div>
    </div>
  );
};

export default AttendanceAdd;
