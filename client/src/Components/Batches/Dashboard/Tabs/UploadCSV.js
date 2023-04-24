import { useState } from "react";
import axios from "../../../../config/axios";
import { Empty } from "antd";

const UploadCSV = (props) => {
  const { batchesId, addAttendance } = props;
  const [csvFiles, setCsvFiles] = useState("");
  const [formData, setFormData] = useState([]);

  const [dates, setDates] = useState(new Date().toISOString().slice(0, 10));
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sessionTitle, setSessionTitle] = useState("");

  const handleUploadCSVData = (e) => {
    e.preventDefault();
    const Datas = csvFiles.trim().split("\n");
    const headers = Datas[0].split(",");
    const data = [];
    for (let i = 1; i < Datas.length; i++) {
      const lines = Datas[i].split(",");
      const obj = {};
      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = lines[j];
      }
      data.push(obj);
    }

    const jsonData = JSON.stringify(data);
    console.log("jsonData", jsonData);

    axios
      .post(`/api/batches/${batchesId}/uploadattendacesss`, jsonData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        const result = res.data.formData;
        setFormData(result);
      })
      .catch((err) => {
        console.log(err.message);
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
      sessionTitle: sessionTitle,
      startDate: startDate,
      endDate: endDate,
      report: formData,
    };

    console.log("formDatas", formDatas);

    axios
      .post("/api/attendance", formDatas)
      .then((res) => {
        const result = res.data;
        addAttendance(result);
        console.log("result", result);
        alert("Attendance Added");
        handleReset();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleReset = () => {
    setFormData([]);
    setCsvFiles("");
    setStartDate("");
    setEndDate("");
    setSessionTitle("");
  };

  return (
    <div>
      <div>
        <div className="d-flex flex-wrap gap-4">
          <div className="col-md-3">
            <div className="mb-2">
              <label>Session Title</label>
              <input
                type="text"
                value={sessionTitle}
                onChange={(e) => {
                  setSessionTitle(e.target.value);
                }}
                className="form-control"
                placeholder="Enter SessionTitle"
              />
            </div>
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
              <div className="mb-2">
                <label>Start Time</label>
                <input
                  type="time"
                  className="form-control"
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                  }}
                />
              </div>
              <div className="mb-2">
                <label>End Time</label>
                <input
                  type="time"
                  className="form-control"
                  value={endDate}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <form onSubmit={handleUploadCSVData}>
              <div className="col-md-12 p-2 d-flex justify-content-between">
                <div className="col-md-12 d-flex flex-column gap-2  ">
                  <label>Upload the CSV Data</label>
                  <div className="mb-2 col-md-12">
                    <textarea
                      className="form-control "
                      cols="30"
                      rows="4"
                      value={csvFiles}
                      placeholder={`name,attendedMin \rajay, 50`}
                      onChange={(e) => {
                        setCsvFiles(e.target.value);
                      }}
                    ></textarea>
                  </div>
                </div>
              </div>

              <input
                type="submit"
                className="btn btn-success"
                value="Upload Data"
              />
            </form>
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
    </div>
  );
};

export default UploadCSV;
