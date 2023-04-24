import { Table } from "reactstrap";
import { Empty } from "antd";
import axios from "../../../../config/axios";

const AssignBatchStudent = (props) => {
  const { allStudentData, removeAllStudentData, batchesId } = props;

  const handleAssign = (id) => {
    axios
      .post(`api/batches/${batchesId}/students`, {
        studentId: id,
      })
      .then((res) => {
        removeAllStudentData(id);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          {allStudentData.length === 0 ? (
            <div className="card shadow-sm p-5 ">
              <div className=" text-center p-5">
                <Empty
                  description={`No Students Left, already all students assigned to Batches`}
                />
              </div>
            </div>
          ) : (
            <div>
              <div className="card shadow p-3 shadow-sm">
                <div>
                  {allStudentData.length !== 0 && (
                    <Table bordered hover responsive striped>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Type</th>
                          <th>Email</th>
                          <th>MobileNo</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allStudentData.map((ele, i) => {
                          return (
                            <tr key={i}>
                              <td>{i + 1}</td>
                              <td>{ele.name}</td>
                              <td>{ele.type}</td>
                              <td>{ele.email}</td>
                              <td>{ele.mobileNo}</td>
                              <td>
                                <button
                                  className="btn btn-success btn-sm"
                                  onClick={() => {
                                    handleAssign(ele._id);
                                  }}
                                >
                                  Assign
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignBatchStudent;
