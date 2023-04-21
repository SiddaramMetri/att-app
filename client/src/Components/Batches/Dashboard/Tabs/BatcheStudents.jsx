import { Empty } from "antd";
import { Table } from "reactstrap";

const BatcheStudents = (props) => {
  const { students, handleSetSearch, handleChange, search } = props;

  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <div>
            <div className="card shadow p-3 shadow-sm">
              <div className="col-md-12 p-1 d-flex justify-content-between">
                <div>
                  {"  "}
                  <h4>
                    Batches - (
                    {Object.keys(students).length !== 0 && students.length})
                  </h4>
                </div>
                <div>
                  <input
                    type="text"
                    value={search}
                    className="form-control"
                    placeholder="Search Students"
                    onChange={handleSetSearch}
                  />
                </div>
              </div>
              <hr />
              <div>
                {students.length === 0 ? (
                  <div className="card shadow-sm p-4 ">
                    <div className=" text-center">
                      <Empty
                        description={`Students are not Assigned to this Batch. -> Assign the Students`}
                      />
                    </div>
                  </div>
                ) : (
                  <Table bordered hover responsive striped>
                    <thead>
                      <tr>
                        <th></th>
                        <th style={{ textAlign: "center" }}>#</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Email</th>
                        <th>MobileNo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((student, i) => {
                        return (
                          <tr key={i}>
                            <td>
                              <input
                                type="checkbox"
                                checked={student.trace === true}
                                onChange={() => {
                                  handleChange(
                                    student.studentId._id,
                                    !student.trace
                                  );
                                }}
                              />
                            </td>
                            <th scope="row">{i + 1}</th>
                            <td>{student.studentId.name}</td>
                            <td>{student.studentId.type}</td>
                            <td>{student.studentId.email}</td>
                            <td>{student.studentId.mobileNo}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatcheStudents;
