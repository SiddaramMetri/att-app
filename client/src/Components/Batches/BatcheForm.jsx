import { useState } from "react";

const BatchesForm = (props) => {
  const {
    formSubmission,
    _id: slNo,
    batchName,
    startDate: batchstartDate,
    endDate: batchendDate,
  } = props;
  const [name, setName] = useState(batchName ? batchName : "");
  const [startDate, setStartDate] = useState(
    batchstartDate ? batchstartDate.slice(0, 10) : ""
  );
  const [endDate, setEndDate] = useState(
    batchendDate ? batchendDate.slice(0, 10) : ""
  );

  const handleSetData = (e) => {
    const { name, value } = e.target;
    if (name === "batchesname") {
      setName(value);
    } else if (name === "startdate") {
      setStartDate(value);
    } else if (name === "enddate") {
      setEndDate(value);
    }
  };

  const handleFormBatches = (e) => {
    e.preventDefault();
    const formDatas = {
      id: slNo ? slNo : "",
      batchName: name,
      startDate: startDate,
      endDate: endDate,
    };
    formSubmission(formDatas);
  };

  return (
    <div>
      <form onSubmit={handleFormBatches}>
        <div className="mb-1 p-1">
          <label>Batches Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Batche Name"
            value={name}
            name="batchesname"
            onChange={handleSetData}
          />
        </div>
        <div className="mb-1 p-1">
          <label>Start Date</label>
          <input
            type="date"
            className="form-control"
            name="startdate"
            value={startDate}
            onChange={handleSetData}
          />
        </div>
        <div className="mb-1 p-1">
          <label>End Date</label>
          <input
            type="date"
            className="form-control"
            name="enddate"
            value={endDate}
            onChange={handleSetData}
          />
        </div>
        <div className="mb-1 p-1">
          <input type="submit" className="btn btn-success" />
        </div>
      </form>
    </div>
  );
};

export default BatchesForm;
