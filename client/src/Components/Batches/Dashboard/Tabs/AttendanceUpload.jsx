import { useRef, useState } from "react";
import axios from "axios";
import { Empty } from "antd";

const AttendanceUpload = (props) => {
  const { batchesId, addAttendance, ActiveKeys } = props;
  const ref = useRef();
  const [dates, setDates] = useState(new Date().toISOString().slice(0, 10));
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState([]);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleFileUpload = (e) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert("Please Upload the Files");
      return;
    }
    const formData = new FormData();

    formData.append("file", selectedFile);

    axios
      .post(`/api/batches/${batchesId}/uploadattendace`, formData)
      .then((res) => {
        if (!res.data.success) {
          alert(res.data.message);
          return;
        }
        setFormData(res.data.formData);
        setSelectedFile("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAttendanceChange = (e, id, attendanceStatus) => {
    const updatedFormData = formData.map((data) => {
      if (data.studentId === id) {
        const newData = {
          ...data,
          status: attendanceStatus,
        };
        return newData;
      } else {
        return data;
      }
    });
    setFormData(updatedFormData);
  };

  const handleAttendanceChangeType = (e, id, attendanceStatus) => {
    const updatedFormData = formData.map((data) => {
      if (data.studentId === id) {
        const newData = {
          ...data,
          attendedType: attendanceStatus,
        };
        return newData;
      } else {
        return data;
      }
    });
    setFormData(updatedFormData);
  };

  const handleSubmitAttendance = (e) => {
    e.preventDefault();
    if (formData.length === 0) {
      alert("Please Add the Attendace");
      return;
    }
    const formDatas = {
      attdate: dates,
      batchId: batchesId,
      report: formData,
    };

    axios
      .post("http://localhost:4144/api/attendance", formDatas)
      .then((res) => {
        const result = res.data;
        addAttendance(result);
        alert("Attendance Added");
        ActiveKeys("2");
        handleReset();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleReset = () => {
    setFormData([]);
    setSelectedFile(null);
    ref.current.value = "";
  };

  return (
    <div>
      <div className="d-flex flex-wrap gap-4">
        <div className="col-md-3">
          <div className="mb-2">
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
          <div className="mb-2">
            <label>File</label>
            <input
              type="file"
              ref={ref}
              onChange={handleFileUpload}
              className="form-control "
            />
          </div>
          <div className="d-flex flex-wrap gap-3">
            <button onClick={handleUpload} className="btn btn-primary">
              Upload
            </button>
            <button onClick={handleReset} className="btn btn-warning">
              reset
            </button>
          </div>
        </div>
        <div className="col-md-4">
          <div className="mb-2">
            <label>StartDate</label>
            <input
              type="date"
              className="form-control"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
              }}
            />
          </div>
          <div className="mb-2">
            <label>EndDate</label>
            <input
              type="date"
              className="form-control"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
              }}
            />
          </div>
        </div>
      </div>

      {formData.length === 0 ? (
        <div className="card shadow-sm p-4 mt-3 ">
          <div className=" text-center p-4">
            <Empty description={`No Data Found`} />
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmitAttendance}>
          <table className="table table-responsive table-striped">
            <thead>
              <tr className="text-center">
                <th>Name</th>
                <th>Status</th>
                <th>Type</th>
                <th>Min</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {formData && formData.length > 0 ? (
                formData.map((data, i) => (
                  <tr key={i}>
                    <td>{data.name}</td>
                    <td>
                      <input
                        type="radio"
                        checked={data.status === "present"}
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
                ))
              ) : (
                <tr>
                  <td colSpan={2}>
                    <div className="card  p-4 ">
                      <div className=" text-center p-5">
                        <Empty description={`No Data Found`} />
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <input type="submit" className="btn btn-success btn-sm" />
        </form>
      )}
    </div>
  );
};

export default AttendanceUpload;
