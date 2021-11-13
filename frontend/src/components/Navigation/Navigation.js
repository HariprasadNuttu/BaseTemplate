import React from "react";
import { withRouter, Link, NavLink } from "react-router-dom";
import * as Icon from "react-feather";
import "./Navigation.css";
import {
  Navbar,
  Nav,
  NavDropdown,
  Image,
} from "react-bootstrap";


// If want to active light sidebar then please uncomment below & comment above component
import SideMenuLight from "./SideMenu/SideMenuLight";

// Logo image path
import Logo from "../../assets/images/logo.jpeg";

// Profile & user image path
import profile from "../../assets/images/profile.jpg";
import { CLIENT } from "../../common/constants";

class Navigation extends React.Component {
  state = {
    sideMenu: false,
    term: "",
    menuColor: false,
  };
  

  _toggleClass = () => {
    const currentSideMenu = this.state.sideMenu;
    this.setState({ sideMenu: !currentSideMenu });
    this.props.onClick(this.state.sideMenu);
  };

  _handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.term) {
      this.props.history.push("/search/");
    }
  };

  onSideMenuHandler = (activeColor) => {
    this.setState({ menuColor: activeColor });
  };

  LogOut = () => {
    localStorage.removeItem("Authentication_Token");
    this.props.redirectToLogin();
    this.props.history.push("login");
  };

  render() {
    return (
      <div className="page-wrapper">
        <Navbar fixed="top" className="top-menu">
          <Link
            to="/dashboard"
            className={`navbar-brand ${
              this.state.sideMenu ? "navbar-logo" : ""
            }`}
          >
            {/* Large logo */}
            <Image src={Logo} alt="Logo" className="large-logo" />
            {/* Small logo */}
            <Image src={Logo} alt="Small Logo" className="small-logo" />
          </Link>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          {/* Burger menu */}
          {this.props.isAuthenticated ? (
            <>
              <div
                className={`burger-menu ${
                  this.state.sideMenu ? "toggle-menu" : ""
                }`}
                onClick={this._toggleClass}
              >
                <span className="top-bar"></span>
                <span className="middle-bar"></span>
                <span className="bottom-bar"></span>
              </div>
            </>
          ) : null}
          {/* End Burger menu */}

          <Navbar.Collapse id="basic-navbar-nav">
            <h1>
              {this.props.signUpUserRole
                }
            </h1>
            <h1>
              {this.props.userInfo &&
              this.props.userInfo.userDetails &&
              this.props.userInfo.userDetails.role
                ? `${this.props.userInfo.userDetails.role}`
                : " "}
            </h1>

            {this.props.isAuthenticated ? (
              <>
                <Nav className="ml-auto right-nav">
                  <NavDropdown
                    title={
                      <div className="count-info">
                        <Icon.Mail className="icon" />
                        <span className="ci-number theme-bg">
                          <span className="ripple theme-bg"></span>
                          <span className="ripple theme-bg"></span>
                          <span className="ripple theme-bg"></span>
                        </span>
                      </div>
                    }
                    id="basic-nav-dropdown"
                    className="message-box d-none d-sm-block"
                  ></NavDropdown>

                  <NavDropdown
                    title={
                      <div className="count-info">
                        <Icon.Bell className="icon" />
                        <span className="ci-number">
                          <span className="ripple"></span>
                          <span className="ripple"></span>
                          <span className="ripple"></span>
                        </span>
                      </div>
                    }
                    id="basic-nav-dropdown"
                    className="message-box"
                  ></NavDropdown>
                  <NavDropdown
                    title={
                      <div className="menu-profile">
                        <span className="name">{this.props.userInfo.name}</span>
                        <Image
                          src={profile}
                          alt="Profile Image"
                          roundedCircle
                        />
                      </div>
                    }
                    id="basic-nav-dropdown"
                    className="profile-nav-item"
                  >
                    {this.props.userInfo.role === CLIENT ? (<NavLink to="/profile" className="dropdown-item">
                      <Icon.User className="icon" />
                      Profile
                    </NavLink> ) : null }
                    <NavLink
                      to="/login"
                      className="dropdown-item"
                      onClick={this.LogOut}
                    >
                      <Icon.LogOut className="icon" />
                      Logout
                    </NavLink>
                  </NavDropdown>
                </Nav>
              </>
            ) : null}
          </Navbar.Collapse>
        </Navbar>

        {this.props.isAuthenticated ? (
          <>
            <SideMenuLight sideMenu={this.state.sideMenu} />
          </>
        ) : null}
      </div>
    );
  }
}

export default withRouter(Navigation);
