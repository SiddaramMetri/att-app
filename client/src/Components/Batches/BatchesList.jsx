import { Empty } from "antd";
import BatchesData from "./BatchedData";

const BatchesList = (props) => {
  const { batches, editBatches } = props;
  return (
    <div>
      <div className="p-2 text-center ">
        {batches.length === 0 ? (
          <div className="card shadow p-4 ">
            <div className=" text-center">
              <Empty description="Batches Data Not found " />
            </div>
          </div>
        ) : (
          <div>
            <div className="card shadow p-3 shadow">
              <div className="col-md-12 p-1 d-flex justify-content-between">
                <div>
                  {" "}
                  <h4>Batches - ({batches.length})</h4>
                </div>
              </div>
              <hr />
              <div className="d-flex flex-wrap gap-5">
                {batches.length !== 0 &&
                  batches.map((batches, i) => {
                    return (
                      <BatchesData
                        key={batches._id}
                        {...batches}
                        editBatches={editBatches}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BatchesList;
