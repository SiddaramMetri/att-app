import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

const Login = (props) => {
  const [username, usernameupdate] = useState("abc");
  const [password, passwordupdate] = useState("abc@123");

  const [token, setToken] = useState("");
  const usenavigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const ProceedLoginusingAPI = (e) => {
    e.preventDefault();
    if (validate()) {
      let inputobj = { username: username, password: password };
      axios
        .post("http://localhost:4144/api/login", inputobj)
        .then((res) => {
          console.log(res);
          if (!res.data.token) {
            toast.error("Login failed, invalid credentials");
          } else {
            toast.success("Success");
            setToken(res.data.token);
            sessionStorage.setItem("jwttoken", res.data.token);
            usenavigate("/");
          }
        })
        .catch((err) => {
          toast.error("Login Failed due to :" + err.message);
        });
    }
  };

  const validate = () => {
    let result = true;
    if (username === "" || username === null) {
      result = false;
      toast.warning("Please Enter Username");
    }
    if (password === "" || password === null) {
      result = false;
      toast.warning("Please Enter Password");
    }
    return result;
  };

  useEffect(() => {
    if (token) {
      usenavigate("/home");
    }
  }, [token, usenavigate]);

  return (
    <div className="row">
      <div style={{ marginTop: "5%" }}>
        <br />
        <div className="  d-flex justify-content-center p-2">
          <div className="col-md-4 card shadow p-3">
            <div className=" text-center   p-2">
              <h4>Login</h4>
            </div>
            <Container>
              <Row>
                <Col>
                  <Card>
                    <CardBody>
                      <Form onSubmit={ProceedLoginusingAPI}>
                        <FormGroup className="pb-2 mr-sm-2 mb-sm-0">
                          <Label className="mr-sm-2">Username</Label>
                          <Input
                            type="text"
                            placeholder="Enter Username"
                            value={username}
                            onChange={(e) => usernameupdate(e.target.value)}
                          />
                        </FormGroup>
                        <FormGroup className="pb-2 mr-sm-2 mb-sm-0">
                          <Label className="mr-sm-2">Password</Label>
                          <Input
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => passwordupdate(e.target.value)}
                          />
                        </FormGroup>
                        <Button type="submit" color="primary">
                          Login
                        </Button>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
