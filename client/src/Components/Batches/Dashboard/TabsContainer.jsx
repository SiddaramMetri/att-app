import { Tabs } from "antd";
import LiveSession from "./Tabs/LiveSession";
import BatcheStudents from "./Tabs/BatcheStudents";
import AssignBatchStudent from "./Tabs/AssignBatchStudent";
import AttendanceAdd from "./Tabs/AttendanceAdd";
import AttendanceUpload from "./Tabs/AttendanceUpload";
import { useState } from "react";
import AttendanceReport from "./Tabs/AttendanceReport";
import Model from "./Tabs/Model";
import axios from "axios";
import ReactCalendar from "./ReactCalendar";

const TabsContainer = (props) => {
  const {
    handleChange,
    attendanceTab,
    batchesData,
    batchesId,
    addAttendance,
    allStudentData,
    removeAllStudentData,
    attendanceReport,
    batcheStudents,
    handleSetSearch,
    handleTraceStudent,
    search,
  } = props;

  const [activeKey, setActiveKey] = useState("1");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [liveStudentsAttendance, setLiveStudentsAttendance] = useState({});

  const handleCalendarDateClick = (id, ids) => {
    setIsModalOpen(true);
    axios
      .get(`/api/batches/${batchesId}/attendances/${id}`)
      .then((res) => {
        setLiveStudentsAttendance(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(!isModalOpen);
  };

  const ActiveKeyss = (keys) => {
    setActiveKey(keys);
  };

  const items = [
    {
      key: "1",
      label: `Live Session`,
      children: (
        <LiveSession
          handleCalendarDateClick={handleCalendarDateClick}
          batchesId={batchesId}
          attendanceTab={attendanceTab}
        />
      ),
    },
    {
      key: "2",
      label: `Students - (${batchesData.students.length}) `,
      children: (
        <BatcheStudents
          search={search}
          handleChange={handleChange}
          handleSetSearch={handleSetSearch}
          students={batcheStudents}
        />
      ),
    },
    {
      key: "3",
      label: `Assign Students to Batches`,
      children: (
        <AssignBatchStudent
          batchesId={batchesId}
          allStudentData={allStudentData}
          removeAllStudentData={removeAllStudentData}
        />
      ),
    },
    {
      key: "4",
      label: `Attendance`,
      children: (
        <AttendanceAdd
          ActiveKeys={ActiveKeyss}
          addAttendance={addAttendance}
          attendanceTab={attendanceTab}
          batchesData={batchesData}
          batchesId={batchesId}
        />
      ),
    },
    {
      key: "5",
      label: `Upload Attendance`,
      children: (
        <AttendanceUpload
          ActiveKeys={ActiveKeyss}
          addAttendance={addAttendance}
          batchesId={batchesId}
        />
      ),
    },
    {
      key: "6",
      label: `AttendanceReport`,
      children: (
        <AttendanceReport
          handleTraceStudent={handleTraceStudent}
          attendanceReport={attendanceReport}
        />
      ),
    },
    {
      key: "7",
      label: `React Big Calender`,
      children: (
        <ReactCalendar
          handleCalendarDateClick={handleCalendarDateClick}
          batchesId={batchesId}
          attendanceTab={attendanceTab}
        />
      ),
    },
  ];

  return (
    <div>
      {isModalOpen && (
        <Model
          isModalOpen={isModalOpen}
          liveStudentsAttendance={liveStudentsAttendance}
          handleCancel={handleCancel}
        />
      )}
      <Tabs defaultActiveKey={activeKey} items={items} />
    </div>
  );
};

export default TabsContainer;
