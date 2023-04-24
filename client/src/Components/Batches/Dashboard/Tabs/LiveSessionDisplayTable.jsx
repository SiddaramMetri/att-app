import { Table, Tag } from "antd";
import { format, isValid } from "date-fns";
const LiveSessionDisplayTable = (props) => {
  const { liveSessionStudents } = props;

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        {
          text: "present",
          value: "present",
        },
        {
          text: "absent",
          value: "absent",
        },
        {
          text: "leave",
          value: "leave",
        },
      ],
      render: (_, { status }) => {
        let color =
          status === "present"
            ? "green"
            : status === "absent"
            ? "volcano"
            : "yellow";
        return (
          <Tag color={color} key={status}>
            {status}
          </Tag>
        );
      },
      onFilter: (value, record) => record.status.indexOf(value) === 0,
    },
    {
      title: "AttendedType",
      dataIndex: "attendedType",
      key: "attendedType",
      filters: [
        {
          text: "online",
          value: "online",
        },
        {
          text: "offline",
          value: "offline",
        },
        {
          text: "none",
          value: "none",
        },
      ],
      render: (_, { attendedType }) => {
        let color =
          attendedType === "online"
            ? "green"
            : attendedType === "offline"
            ? "volcano"
            : "yellow";
        return (
          <Tag color={color} key={attendedType}>
            {attendedType}
          </Tag>
        );
      },
      onFilter: (value, record) => record.attendedType.indexOf(value) === 0,
    },
    {
      title: "AttendedTime",
      dataIndex: "attendedTime",
      key: "attendedTime",
    },
  ];

  const data = liveSessionStudents.report.map((students, i) => {
    return {
      ids: i + 1,
      name: students.studentId.name,
      status: students.status,
      attendedType: students.attendedType,
      attendedTime: `${(students.attendedMin / 60).toFixed(2)} min`,
    };
  });

  return (
    <div>
      <div className="col-md-12">
        <div className="col-md-4">
          <table className="table table-striped table-bordered">
            <tr>
              <td>Date :</td>
              <td>
                <h4>
                  {isValid(new Date(liveSessionStudents.attdate))
                    ? format(
                        new Date(liveSessionStudents.attdate),
                        "E, MMMM do, yyyy"
                      )
                    : liveSessionStudents.attdate}
                </h4>
              </td>
            </tr>
          </table>
        </div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default LiveSessionDisplayTable;
