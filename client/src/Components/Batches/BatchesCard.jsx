import {
  EditOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Card, Col, Row } from "antd";
import { Link } from "react-router-dom";

const { Meta } = Card;

const BatchesCard = (props) => {
  const { _id, batchName, startDate, endDate, students, handleToggle } = props;

  const handleMakeInActive = () => {
    const confirmRemove = window.confirm("Are you sure?");
    if (confirmRemove) {
      alert("inactive");
    }
  };

  return (
    <div>
      <Card
        className="shadow"
        style={{
          width: 300,
        }}
        actions={[
          <EditOutlined key="edit" onClick={handleToggle} />,
          <Link to={`/batches/${_id}`}>
            <EyeOutlined key="view" />
          </Link>,
          <SettingOutlined key="setting" />,
          <EyeInvisibleOutlined onClick={handleMakeInActive} />,
        ]}
      >
        <Meta
          title={<b style={{ fontWeight: "bolder" }}>{batchName}</b>}
          description={
            <div>
              <Row>
                <Col span={10}>Start Date:</Col>
                <Col span={10}>
                  <b>{startDate.slice(0, 10)}</b>
                </Col>
              </Row>
              <Row>
                <Col span={10}>End Date:</Col>
                <Col span={10}>
                  <b>{endDate.slice(0, 10)}</b>
                </Col>
              </Row>
              <Row>
                <Col span={10}>Total Students:</Col>
                <Col span={10}>
                  <b>{students.length}</b>
                </Col>
              </Row>
            </div>
          }
        />
      </Card>
    </div>
  );
};

export default BatchesCard;
