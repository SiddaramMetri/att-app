import { useEffect, useState } from "react";
import BatchesList from "./Batches/BatchesList";
import AddBatches from "./Batches/AddBatche";
import axios from "axios";

const BatchesContainer = (props) => {
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4144/api/batches")
      .then((res) => {
        const result = res.data;
        setBatches(result);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  const addBatches = (batche) => {
    const result = [...batches, batche];
    setBatches(result);
  };

  const editBatches = (batche) => {
    const result = batches.map((b) => {
      if (b._id === batche._id) {
        return { ...b, ...batche };
      } else {
        return { ...b };
      }
    });
    setBatches(result);
  };

  return (
    <div className="row mt-3">
      <div className="col-md-8">
        <BatchesList batches={batches} editBatches={editBatches} />
      </div>
      <div className="col-md-4">
        <AddBatches addBatches={addBatches} />
      </div>
    </div>
  );
};

export default BatchesContainer;
