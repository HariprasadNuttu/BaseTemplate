import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import * as Icon from "react-feather";
import "./SideMenu.css";
import { useSelector } from "react-redux";
const SideMenuLight = (props) => {
  const { userDetails } = useSelector((state) => state.user);
  
  return (
    <div
      className={`sidemenu-area sidemenu-light ${
        props.sideMenu ? "sidemenu-toggle" : ""
      }`}
    >
      <Navbar className={`sidemenu ${props.sideMenu ? "hide-nav-title" : ""}`}>
        <Navbar.Collapse>
          <Nav>
            {userDetails && userDetails.role === "Client" ? (
              <>
                {/* Client dashboard routes start */}
                <NavLink to="/dashboard" className="nav-link">
                  <i className="fa fa-tachometer icon"></i>
                  <span className="title">Dashboard</span>
                </NavLink>
                <NavLink to="/user/payments" className="nav-link">
                  <Icon.User className="icon" />
                  <span className="title">Payment Details</span>
                </NavLink>

                <NavLink to="/client/formLibrary" className="nav-link">
                  <Icon.FileText className="icon" />
                  <span className="title">Add Student</span>
                </NavLink>

                <NavDropdown
                  title={
                    <div className="dropdown-title">
                      <Icon.TrendingUp className="icon" />
                      <span className="title">
                        Payment Due
                        <Icon.ChevronRight className="icon fr" />
                      </span>
                    </div>
                  }
                  id="basic-nav-dropdown"
                >
                  <NavLink
                    to="/payemnts/pending"
                    className="dropdown-item"
                    // className="nav-link"
                  >
                    <i
                      className="fa fa-comments icon-colors"
                      aria-hidden="true"
                    ></i>
                    &nbsp;&nbsp;
                    <span className="title"> Pending Payments </span>
                  </NavLink>
                  <NavLink
                    to="/payments/completed"
                    className="dropdown-item"
                    // className="nav-link"
                  >
                    <i
                      className="fa fa-comments icon-colors"
                      aria-hidden="true"
                    ></i>
                    &nbsp;&nbsp;
                    <span className="title"> Completed  Payments </span>
                  </NavLink>
                 
                </NavDropdown>
                {/* Client dashboard routes end */}
              </>
            ) : null}
            

          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default SideMenuLight;
