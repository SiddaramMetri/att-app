import axios from "../../config/axios";
import BatchesForm from "./BatcheForm";

const EditBatches = (props) => {
  const {
    _id,
    batchName,
    startDate,
    editBatches,
    endDate,
    students,
    handleToggle,
  } = props;

  const formSubmission = (batches) => {
    axios
      .put(`/api/batches/${batches.id}`, batches)
      .then((res) => {
        const result = res.data;
        editBatches(result);
        handleToggle();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="card shadow p-4" style={{ width: "20rem" }}>
      <div>
        <BatchesForm
          formSubmission={formSubmission}
          handleToggle={handleToggle}
          _id={_id}
          batchName={batchName}
          startDate={startDate}
          endDate={endDate}
          students={students}
        />
      </div>
    </div>
  );
};

export default EditBatches;
