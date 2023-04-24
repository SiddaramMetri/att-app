import { ListGroup, ListGroupItem, Badge } from "reactstrap";
import CalenderContainer from "./CalenderContainer";
import { Empty } from "antd";
import { Link } from "react-router-dom";
import { format, isValid } from "date-fns";

const LiveSession = (props) => {
  const { attendanceTab, batchesId, handleCalendarDateClick } = props;

  const events = attendanceTab.map((ele) => {
    return {
      ids: ele._id,
      dates: ele.attdate,
      title: `Live Session - ${ele.attdate}`,
      start: ele.attdate,
    };
  });

  return (
    <div>
      <div className="row">
        <div className="col-md-8">
          <div>
            <CalenderContainer
              events={events}
              attendanceTab={attendanceTab}
              handleCalendarDateClick={handleCalendarDateClick}
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            {attendanceTab.length === 0 ? (
              <div className="card shadow-sm p-4 ">
                <div className=" text-center">
                  <Empty description={`No Live Session found`} />
                </div>
              </div>
            ) : (
              <div className="overflow-auto">
                <ListGroup flush style={{ fontSize: "18px" }}>
                  <ListGroupItem className="bg-primary text-white justify-content-between">
                    Live Session
                    <div className="d-flex flex-wrap gap-2 justify-content-end">
                      <Badge color="success" pill>
                        P
                      </Badge>
                      <Badge color="danger" pill>
                        A
                      </Badge>
                      <Badge color="warning" pill>
                        L
                      </Badge>
                    </div>
                  </ListGroupItem>
                  {attendanceTab.map((attendance, i) => {
                    return (
                      <ListGroupItem
                        key={i}
                        className="justify-content-between"
                      >
                        <div className="d-flex justify-content-between">
                          <span>
                            <Link
                              to={`/Batches/${batchesId}/LiveSession/${attendance._id}`}
                            >
                              {isValid(new Date(attendance.attdate))
                                ? format(
                                    new Date(attendance.attdate),
                                    "E, MMMM do, yyyy"
                                  )
                                : attendance.attdate}
                            </Link>
                          </span>
                          <div className="d-flex flex-wrap gap-2">
                            <Badge color="success" pill>
                              {
                                attendance.report.filter(
                                  (ele) => ele.status === "present"
                                ).length
                              }
                            </Badge>
                            <Badge color="danger" pill>
                              {
                                attendance.report.filter(
                                  (ele) => ele.status === "absent"
                                ).length
                              }
                            </Badge>
                            <Badge color="warning" pill>
                              {
                                attendance.report.filter(
                                  (ele) => ele.status === "leave"
                                ).length
                              }
                            </Badge>
                          </div>
                        </div>
                      </ListGroupItem>
                    );
                  })}
                </ListGroup>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveSession;
