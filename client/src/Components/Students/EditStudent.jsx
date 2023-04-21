import axios from "axios";
import ShowModel from "./ShowModel";

const EditStudent = (props) => {
  const {
    name,
    type,
    _id,
    email,
    mobileNo,
    handleToggle,
    toggle,
    editStudent,
  } = props;

  const formSubmission = (formData) => {
    axios
      .put(`http://localhost:4144/api/students/${formData.id}`, formData)
      .then((res) => {
        const result = res.data;
        editStudent(result);
        handleToggle();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div>
      <ShowModel
        handleToggle={handleToggle}
        name={name}
        type={type}
        email={email}
        _id={_id}
        mobileNo={mobileNo}
        toggle={toggle}
        editStudent={editStudent}
        formSubmission={formSubmission}
      />
    </div>
  );
};

export default EditStudent;
