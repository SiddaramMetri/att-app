import BatchesForm from "./BatcheForm";
import axios from "axios";

const AddBatches = (props) => {
  const { addBatches } = props;

  const formSubmission = (batches) => {
    axios
      .post("/api/batches", batches)
      .then((res) => {
        const result = res.data;
        addBatches(result);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div>
      <div className="card shadow p-3">
        <h3>Add Batches</h3>
        <hr />
        <BatchesForm formSubmission={formSubmission} />
      </div>
    </div>
  );
};

export default AddBatches;
