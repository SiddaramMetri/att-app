import { useEffect, useState } from "react";
import { Container, Nav, Navbar as NavbarBs } from "react-bootstrap";

import { NavLink, useLocation, useNavigate } from "react-router-dom";

const NavbarContainer = (props) => {
  const [displayusername, displayusernameupdate] = useState("");
  const [showmenu, showmenuupdateupdate] = useState(false);
  const usenavigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/register") {
      showmenuupdateupdate(false);
    } else {
      showmenuupdateupdate(true);
      let username = sessionStorage.getItem("username");
      if (username === "" || username === null) {
        usenavigate("/login");
      } else {
        displayusernameupdate(username);
      }
    }
  }, [location, usenavigate]);
  return (
    <div>
      {showmenu && (
        <NavbarBs
          sticky="top"
          className="bg-primary  shadow-sm mb-1 mt-2 "
          style={{ color: "white" }}
        >
          <Container>
            <NavbarBs.Brand href="#home" className="text-white">
              App
            </NavbarBs.Brand>
            <NavbarBs.Toggle aria-controls="basic-navbar-nav" />
            <NavbarBs.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link to="/" as={NavLink} className="text-white">
                  Home <b>{displayusername}</b>
                </Nav.Link>
                <Nav.Link to="/students" as={NavLink} className="text-white">
                  Students
                </Nav.Link>
                <Nav.Link to="/batches" as={NavLink} className="text-white">
                  Batches
                </Nav.Link>
              </Nav>
            </NavbarBs.Collapse>
          </Container>
        </NavbarBs>
      )}
    </div>
  );
};

export default NavbarContainer;
