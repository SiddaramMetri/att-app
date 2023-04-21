import { Container, Row } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";

import StudentContainer from "./Components/StudentContainer";
import BatchesContainer from "./Components/BatchesContainer";
import DashboardContainer from "./Components/Batches/Dashboard/DashboardContainer";
import StudentReport from "./Components/Batches/Dashboard/Tabs/StudentReport";
import LiveSessionDetails from "./Components/Batches/Dashboard/Tabs/LiveSessionDetails";
import Login from "./Login";
import Home from "./Components/Home";

import { ToastContainer } from "react-toastify";
import AppHeader from "./Appheader";

const MainContainer = (props) => {
  return (
    <div>
      <Container>
        <ToastContainer theme="colored" position="top-right"></ToastContainer>
        <AppHeader></AppHeader>
        <Row>
          <br />
          <div className="conatiner">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/students" element={<StudentContainer />} />
              <Route path="/batches" element={<BatchesContainer />} />
              <Route path="/batches/:id" element={<DashboardContainer />} />
              <Route path="/batches/:id/students" element={<StudentReport />} />
              <Route
                path="/batches/:batchesId/livesession/:id"
                element={<LiveSessionDetails />}
              />
            </Routes>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default MainContainer;
