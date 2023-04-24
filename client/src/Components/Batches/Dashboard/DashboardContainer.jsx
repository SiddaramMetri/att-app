import { useEffect, useState } from "react";
import TabsContainer from "./TabsContainer";
import { useNavigate, useParams } from "react-router-dom";

import Error404 from "../ErrorPage/Error404";
import { toast } from "react-toastify";
import axios from "../../../config/axios";

const DashboardContainer = (props) => {
  const navigate = useNavigate();

  const params = useParams();
  const batchesId = params.id;
  const [isChecked, setIsChecked] = useState(false);

  const [batchesData, setBatchesData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const handleSetSearch = (e) => {
    setSearch(e.target.value);
  };
  // AssignBatch Tab
  const [allStudentData, setAllStudentData] = useState([]);
  // Attendance Tab
  const [attendanceTab, setAttendanceTab] = useState([]);
  // Attendance Report Tab
  const [attendanceReport, setAttendanceReport] = useState([]);
  // batchStudents
  const [batcheStudents, setBatcheStudents] = useState([]);

  // Student
  useEffect(() => {
    axios
      .get(`/api/search/${batchesId}/students?text=${search}`)
      .then((res) => {
        setBatcheStudents(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [batchesId, search]);

  // Fetch Batch Info
  useEffect(() => {
    axios
      .get(`/api/batches/${batchesId}`)
      .then((res) => {
        const result = res.data;
        if (result === null) {
          navigate("/batches");
          return;
        }
        setBatchesData(result);
        setIsLoading(false);
      })
      .catch((err) => {
        alert(err.message);
        navigate("/batches");
      });
  }, [batchesId, isLoading, allStudentData, navigate]);

  // Assign Batch Tab
  useEffect(() => {
    axios
      .get(`/api/batche/students`)
      .then((res) => {
        const result = res.data;
        setAllStudentData(result);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  // Get Batches Students
  useEffect(() => {
    axios
      .get(`/api/batche/${batchesId}/students`)
      .then((res) => {
        const result = res.data;
        setBatcheStudents(result);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [batchesId, allStudentData]);

  // AttendanceTab
  useEffect(() => {
    axios
      .get(`/api/batches/${batchesId}/attendance`)
      .then((res) => {
        const result = res.data;
        setAttendanceTab(result);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [batchesId]);

  // Get Attendance  Report Tab
  useEffect(() => {
    axios
      .get(`/api/batches/${batchesId}/attendanceReports`)
      .then((res) => {
        setAttendanceReport(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [batchesId, attendanceTab]);

  useEffect(() => {
    if (isChecked) {
      axios
        .get(`/api/batche/${batchesId}/attendanceReport`)
        .then((res) => {
          setAttendanceReport(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      axios
        .get(`/api/batches/${batchesId}/attendanceReports`)
        .then((res) => {
          setAttendanceReport(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  }, [batchesId, isChecked]);

  const removeAllStudentData = (student) => {
    const result = allStudentData.filter((s) => {
      return s._id !== student;
    });
    setAllStudentData(result);
  };
  // addAttendance
  const addAttendance = (attendance) => {
    const result = [...attendanceTab, attendance];
    setAttendanceTab(result);
  };

  // trace the student
  const handleChange = (_id, status) => {
    console.log("_id", _id);

    axios
      .put(`/api/batch/${batchesId}/student/${_id}`, {
        trace: status,
      })
      .then((res) => {
        if (status) {
          toast.success("Student is Tracked");
        } else {
          toast.warning("Student is not Tracking");
        }
        setBatcheStudents(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  // student Trace Report
  const handleTraceStudent = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <div>
      <div className="container mt-2">
        {isLoading ? (
          <Error404 />
        ) : (
          <div className="card p-4">
            <div className="mb-2">
              <h3> {batchesData.batchName} Dashboard</h3>
            </div>
            <TabsContainer
              isChecked={isChecked}
              handleTraceStudent={handleTraceStudent}
              search={search}
              handleChange={handleChange}
              handleSetSearch={handleSetSearch}
              attendanceReport={attendanceReport}
              attendanceTab={attendanceTab}
              addAttendance={addAttendance}
              batchesData={batchesData}
              batcheStudents={batcheStudents}
              removeAllStudentData={removeAllStudentData}
              allStudentData={allStudentData}
              batchesId={batchesId}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardContainer;
