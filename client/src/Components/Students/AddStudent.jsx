import StudentForm from "./StudentForm";
import axios from "axios";
const AddStudent = (props) => {
  const { addStudent } = props;

  const formSubmission = (formData) => {
    axios
      .post("http://localhost:4144/api/students", formData)
      .then((res) => {
        // const result = res.data;
        if (res.data.hasOwnProperty("errors")) {
          alert(res.data);
        } else {
          addStudent(res.data);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div>
      <div className="card shadow p-3">
        <h3>Add Students</h3>
        <hr />
        <StudentForm formSubmission={formSubmission} />
      </div>
    </div>
  );
};

export default AddStudent;