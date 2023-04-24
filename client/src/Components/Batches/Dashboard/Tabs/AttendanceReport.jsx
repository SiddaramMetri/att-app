import { Empty } from "antd";
import { Link } from "react-router-dom";

const AttendanceReport = (props) => {
  const { attendanceReport, isChecked, handleTraceStudent } = props;
  return (
    <div>
      <div className="col-md-12">
        {attendanceReport.length === 0 ? (
          <div className="card shadow-sm p-5 ">
            <div className=" text-center  p-5">
              <Empty description={`No Attendance Reports found`} />
            </div>
          </div>
        ) : (
          <div>
            {/* <button
              className="btn btn-primary btn-sm mb-2"
              onClick={handleTraceStudent}
            >
              Traced students
            </button> */}
            <div className="mb-4">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => handleTraceStudent(e)}
              />{" "}
              Trace Students
            </div>
            <table className="table table-borded  table-bordered ">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Email</th>
                  <th>Mobile No</th>
                  <th>Attended</th>
                  <th>Absent</th>
                  <th>On Leave</th>
                  <th>Percentage</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {attendanceReport.map((Ele, i) => {
                  const percentage = Ele.percentage;
                  let color;
                  if (percentage >= 80 && percentage <= 100) {
                    color = "#A1FA9B";
                  } else if (percentage > 45 && percentage <= 80) {
                    color = "#E3F9A6";
                  } else if (percentage <= 45) {
                    color = "#FCA592";
                  }

                  return (
                    <tr key={i} style={{ background: color }}>
                      <td>{Ele.name}</td>
                      <td>{Ele.type}</td>
                      <td>{Ele.email}</td>
                      <td>{Ele.mobileNo}</td>
                      <td>{Ele.attendancePresent}</td>
                      <td>{Ele.attendanceAbsent}</td>
                      <td>{Ele.attendanceLeave}</td>
                      <td>{percentage} %</td>
                      <td>
                        <Link
                          to={`/batches/${Ele.id}/students`}
                          className="btn btn-warning"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceReport;
