import { Empty, Modal } from "antd";

const Model = (props) => {
  const { isModalOpen, handleCancel, liveStudentsAttendance } = props;
  return (
    <>
      <Modal
        title="Attendance Details"
        open={isModalOpen}
        onCancel={handleCancel}
      >
        {Object.keys(liveStudentsAttendance).length === 0 ? (
          <div className="card shadow-sm p-4 ">
            <div className=" text-center">
              <Empty description={`No Data`} />
            </div>
          </div>
        ) : (
          <div>
            <h4>{liveStudentsAttendance.attdate.slice(0, 10)}</h4>
            <hr />
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Attended Type</th>
                  <th>Min</th>
                </tr>
              </thead>
              <tbody>
                {liveStudentsAttendance.report.map((students) => {
                  return (
                    <tr>
                      <td>{students.studentId.name}</td>
                      <td>{students.status}</td>
                      <td>{students.attendedType}</td>
                      <td>{(students.attendedMin / 60).toFixed(2)} hours </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Modal>
    </>
  );
};
export default Model;
