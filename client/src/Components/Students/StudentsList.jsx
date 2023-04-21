import { Empty } from "antd";
import StudentTable from "./StudentTable";
import axios from "axios";

const StudentsList = (props) => {
  const {
    students,
    editStudent,
    removeStudent,
    search,
    searchStudents,
    setSearch,
  } = props;

  const handleSearch = (e) => {
    const result = e.target.value;
    setSearch(result);
    axios
      .get(`http://localhost:4144/api/search?text=${result}`)
      .then((res) => {
        const result = res.data;

        console.log(result);
        searchStudents(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="p-2 text-center">
      {students.length === 0 ? (
        <div>
          <div className="card shadow p-4">
            <Empty description="Student Data Not found" />
          </div>
        </div>
      ) : (
        <div>
          <div className="card shadow p-3">
            <div className="col-md-12 p-1 d-flex justify-content-between">
              <div>
                {" "}
                <h4>Students Details - {students.length}</h4>
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  placeholder="Search Students"
                  className="form-control"
                  value={search}
                  onChange={handleSearch}
                />
              </div>
            </div>
            <hr />
            <table className="table table-borded table-striped table-bordered ">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Email</th>
                  <th>Mobile No</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, i) => {
                  return (
                    <tr key={i}>
                      <StudentTable
                        {...student}
                        removeStudent={removeStudent}
                        editStudent={editStudent}
                      />
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentsList;
