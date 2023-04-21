import { useState } from "react";

const StudentForm = (props) => {
  const {
    formSubmission,
    handleToggle,
    _id: slNo,
    name: studentName,
    type: studentType,
    email: studentEmail,
    mobileNo: studentMobile,
  } = props;

  const [id, setId] = useState(slNo ? slNo : "");
  const [name, setName] = useState(studentName ? studentName : "");
  const [email, setEmail] = useState(studentEmail ? studentEmail : "");
  const [type, setType] = useState(studentType ? studentType : "");
  const [mobileNo, setMobileNo] = useState(studentMobile ? studentMobile : "");

  const types = ["online", "offline"];

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      id: id,
      name: name,
      email: email,
      type: type,
      mobileNo: mobileNo,
    };

    formSubmission(formData);

    if (handleToggle) {
      handleToggle();
    }

    setName("");
    setEmail("");
    setType("");
    setMobileNo("");
    setId("");
  };

  const handleonChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "type") {
      setType(value);
    } else if (name === "mobileNo") {
      setMobileNo(value);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Student Name</label>
          <input
            className="form-control"
            value={name}
            placeholder="Enter Name"
            type="text"
            name="name"
            onChange={handleonChange}
          />
        </div>

        <div className="mb-3">
          <label>Type</label>
          <select
            className="form-control"
            value={type}
            onChange={handleonChange}
            name="type"
          >
            <option value="">--Select Type --</option>
            {types.map((Ele) => {
              return (
                <option value={Ele} key={Ele}>
                  {Ele}
                </option>
              );
            })}
          </select>
        </div>
        <div className="mb-3">
          <label>Student Email</label>
          <input
            className="form-control"
            value={email}
            placeholder="Enter Email"
            type="email"
            label="Email"
            name="email"
            onChange={handleonChange}
          />
        </div>
        <div className="mb-3">
          <label>Student Mobile No</label>
          <input
            className="form-control"
            value={mobileNo}
            placeholder="Enter Mobile No"
            type="text"
            label="Mobile No"
            name="mobileNo"
            onChange={handleonChange}
          />
        </div>

        <input
          type="submit"
          value="Submit"
          className="btn btn-success btn-sm"
        />
      </form>
    </div>
  );
};

export default StudentForm;
