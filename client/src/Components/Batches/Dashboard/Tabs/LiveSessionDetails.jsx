import { Empty } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LiveSessionDisplayTable from "./LiveSessionDisplayTable";

const LiveSessionDetails = (props) => {
  const params = useParams();

  const batchesId = params.batchesId;
  const attendanceId = params.id;

  const [liveSessionStudents, setLiveSessionStudents] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/batches/${batchesId}/attendances/${attendanceId}`)
      .then((res) => {
        console.log(res.data);
        setLiveSessionStudents(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [batchesId, attendanceId]);

  return (
    <div className="mt-2">
      <div className="container ">
        <div className="card">
          {Object.keys(liveSessionStudents).length === 0 ? (
            <div className="card shadow-sm p-4 ">
              <div className=" text-center">
                <Empty description={`Student Details is Not Found`} />
              </div>
            </div>
          ) : (
            <div className="row p-4  ">
              <div className="col-md-12">
                <br />
                {Object.keys(liveSessionStudents).length === 0 ? (
                  <div className="card  p-5 ">
                    <div className=" text-center p-5">
                      <Empty
                        description={`Student Attendance Count is Not Found`}
                      />
                    </div>
                  </div>
                ) : (
                  <LiveSessionDisplayTable
                    liveSessionStudents={liveSessionStudents}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveSessionDetails;
