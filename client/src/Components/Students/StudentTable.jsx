import { useState } from "react";
import EditStudent from "./EditStudent";
// import axios from "axios";

const StudentTable = (props) => {
  const { name, type, _id, email, mobileNo, editStudent /*removeStudent*/ } =
    props;

  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  // const handleRemove = (_id) => {
  //   const confirmRemove = window.confirm("Are you sure?");
  //   if (confirmRemove) {
  //     axios
  //       .delete(`http://localhost:4144/api/students/${_id}`)
  //       .then((res) => {
  //         const result = res.data;
  //         removeStudent(result._id);
  //       })
  //       .catch((err) => {
  //         alert(err.message);
  //       });
  //   }
  // };

  return toggle ? (
    <EditStudent
      handleToggle={handleToggle}
      name={name}
      type={type}
      email={email}
      _id={_id}
      mobileNo={mobileNo}
      toggle={toggle}
      editStudent={editStudent}
    />
  ) : (
    <>
      <td>{name}</td>
      <td>{type}</td>
      <td>{email}</td>
      <td>{mobileNo}</td>
      <td className="d-flex gap-3 justify-content-center">
        <button onClick={handleToggle} className="btn btn-success btn-sm">
          {" "}
          Edit
        </button>
        {/* <button
          className="btn btn-danger btn-sm"
          onClick={() => {
            handleRemove(_id);
          }}
        >
          {" "}
          delete
        </button> */}
      </td>
    </>
  );
};

export default StudentTable;
