import { useState } from "react";
import EditBatches from "./EditBatches";
import BatchesCard from "./BatchesCard";

const BatchesData = (props) => {
  const { _id, batchName, editBatches, startDate, endDate, students } = props;

  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    const result = !toggle;
    setToggle(result);
  };

  return (
    <div>
      {toggle ? (
        <div>
          <EditBatches
            editBatches={editBatches}
            key={_id}
            handleToggle={handleToggle}
            _id={_id}
            batchName={batchName}
            startDate={startDate}
            endDate={endDate}
            students={students}
          />
          <button onClick={handleToggle} className="btn btn-danger btn-sm">
            cancel
          </button>
        </div>
      ) : (
        <div>
          <BatchesCard
            key={_id}
            handleToggle={handleToggle}
            _id={_id}
            batchName={batchName}
            startDate={startDate}
            endDate={endDate}
            students={students}
          />
        </div>
      )}
    </div>
  );
};

export default BatchesData;
