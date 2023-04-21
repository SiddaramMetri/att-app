import { useEffect, useState } from "react";
import StudentsList from "./Students/StudentsList";
import AddStudent from "./Students/AddStudent";
import axios from "axios";

const StudentContainer = (props) => {
  const [students, setStudents] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("/api/students")
      .then((res) => {
        const result = res.data;
        setStudents(result);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  const addStudent = (student) => {
    const result = [...students, student];
    setStudents(result);
  };

  const editStudent = (student) => {
    const result = students.map((s) => {
      if (s._id === student._id) {
        return { ...s, ...student };
      } else {
        return { ...s };
      }
    });
    setStudents(result);
  };

  const removeStudent = (student) => {
    const result = students.filter((s) => {
      return s._id !== student;
    });
    setStudents(result);
  };

  const searchStudents = (student) => {
    setStudents(student);
  };

  return (
    <div className="row mt-3">
      <div className="col-md-8">
        <StudentsList
          students={students}
          removeStudent={removeStudent}
          editStudent={editStudent}
          searchStudents={searchStudents}
          search={search}
          setSearch={setSearch}
        />
      </div>
      <div className="col-md-4">
        <AddStudent addStudent={addStudent} />
      </div>
    </div>
  );
};

export default StudentContainer;
