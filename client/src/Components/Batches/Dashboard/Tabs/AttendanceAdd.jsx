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
      leaveReason: "",
      attendedType: "none",
      attendedMin: 0,
    };

    if (e.target.value === "leave") {
      const updatedAttendance = attendance.map((ele) =>
        ele.studentId === id ? attendanceData : ele
      );
      setAttendance(updatedAttendance);
    } else {
      const updatedAttendance = attendance.filter(
        (ele) => ele.studentId !== id
      );
      setAttendance([...updatedAttendance, attendanceData]);
    }
  };

  const handleLeaveReasonChange = (e, id, value) => {
    const updatedAttendance = attendance.map((ele) =>
      ele.studentId === id ? { ...ele, leaveReason: value } : ele
    );
    setAttendance(updatedAttendance);
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

  const handleAttendanceChange = (e, id, status) => {
    const attendanceData = {
      studentId: id,
      status: status,
    };
    const updatedAttendance = attendance.filter((ele) => ele.studentId !== id);
    setAttendance([...updatedAttendance, attendanceData]);
  };

  const handleAttendanceChangeType = (e, id, type) => {
    const updatedAttendance = attendance.map((ele) => {
      if (ele.studentId === id) {
        return {
          ...ele,
          attendedType: type,
        };
      }
      return ele;
    });
    setAttendance(updatedAttendance);
  };

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
              {batchesData.students.map((data, i) => {
                const studentAttendance = attendance.find(
                  (ele) => ele.studentId === data.studentId._id
                );
                const isLeaveSelected =
                  studentAttendance?.attendance === "leave";

                return (
                  <tr key={i}>
                    <td>{data.studentId.name}</td>
                    <td>{data.studentId.type}</td>
                    <td>{data.studentId.email}</td>
                    <td>{data.studentId.mobileNo}</td>
                    <td>
                      <input
                        type="radio"
                        checked={data.status === "present"}
                        defaultChecked
                        value="present"
                        onChange={(e) =>
                          handleAttendanceChange(
                            e,
                            data.studentId,
                            e.target.value
                          )
                        }
                      />{" "}
                      Present{" "}
                      <input
                        type="radio"
                        checked={data.status === "absent"}
                        value="absent"
                        onChange={(e) =>
                          handleAttendanceChange(
                            e,
                            data.studentId,
                            e.target.value
                          )
                        }
                      />{" "}
                      Absent{" "}
                      <input
                        type="radio"
                        checked={data.status === "leave"}
                        value="leave"
                        onChange={(e) =>
                          handleAttendanceChange(
                            e,
                            data.studentId,
                            e.target.value
                          )
                        }
                      />{" "}
                      Leave{" "}
                    </td>
                    <td>
                      <input
                        type="radio"
                        checked={data.attendedType === "online"}
                        value="online"
                        onChange={(e) =>
                          handleAttendanceChangeType(
                            e,
                            data.studentId,
                            e.target.value
                          )
                        }
                      />{" "}
                      Online{" "}
                      <input
                        type="radio"
                        checked={data.attendedType === "offline"}
                        value="offline"
                        onChange={(e) =>
                          handleAttendanceChangeType(
                            e,
                            data.studentId,
                            e.target.value
                          )
                        }
                      />{" "}
                      Offline{" "}
                      <input
                        type="radio"
                        checked={data.attendedType === "none"}
                        value="none"
                        onChange={(e) =>
                          handleAttendanceChangeType(
                            e,
                            data.studentId,
                            e.target.value
                          )
                        }
                      />{" "}
                      None{" "}
                    </td>
                    <td>{(data.attendedMin / 60).toFixed(2)} hours </td>
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
