import { Button, Modal, ModalBody } from "reactstrap";
import StudentForm from "./StudentForm";

function ShowModel(props) {
  const {
    handleToggle,
    formSubmission,
    toggle,
    _id,
    name,
    type,
    email,
    mobileNo,
  } = props;
  return (
    <div>
      <Modal isOpen={toggle}>
        <ModalBody>
          <div className="d-flex justify-content-between">
            <h4>Edit Student </h4>
            <Button color="danger" size="xs" onClick={handleToggle}>
              x
            </Button>
          </div>
          <hr />
          <div>
            <StudentForm
              handleToggle={handleToggle}
              _id={_id}
              name={name}
              type={type}
              email={email}
              mobileNo={mobileNo}
              formSubmission={formSubmission}
            />
          </div>{" "}
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ShowModel;
