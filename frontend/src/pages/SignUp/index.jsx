import React, { useEffect, useState } from "react";
import queryString from "query-string";
import {  Button, Row, Col, Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { signUpUser } from "../../redux/actions/appActions";
import { createUser, userAvailability } from "../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { CLIENT, SUPPLIER, PARTNER } from "../../common/constants";
import "./index.css";
import Layout from "../../components/Layout";
import PageLoader from '../../common/Loader'
const SignUp = (props) => {
  const {loader} = useSelector(state => state.user)
  const dispatch = useDispatch();
  const history = useHistory();
  const [sideMenu, setSideMenu] = useState(true);
  const onSideMenu = (value) => {
    setSideMenu(value);
  };

  const params = queryString.parse(props.location.search);
  const role = params.role;
  const invitation_token = params.invitation_token;

  const clientValidationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    companyName: Yup.string().required("companyName is required"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
  });
  const supplierValidationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    companyName: Yup.string().required("companyName is required"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
    tax_id: Yup.string().required("Tax Id is required"),
  });
  const validationSchema =
    role === SUPPLIER ? supplierValidationSchema : clientValidationSchema;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  useEffect(() => {
    if ([CLIENT, SUPPLIER, PARTNER].indexOf(role) !== -1) {
      dispatch(signUpUser(role));
    } else {
      history.push("/login");
    }
  }, []);// eslint-disable-line react-hooks/exhaustive-deps
  const onSubmit = async (data) => {
    await dispatch(createUser({ ...data, role, invitation_token }));
  };
  const handleChange = async (event) => {
    const value = event.target.value;
    const name = event.target.name;
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (name === "email" && emailRegex.test(String(value).toLowerCase())) {
      await dispatch(userAvailability({ email: value }));
    } else {
      console.log("Inavlid");
    }
  };

  return (
    <div className="page-wrapper">
      <PageLoader loader={loader} >
      <Layout onClick={onSideMenu} />
      <div
        className={`main-content d-flex flex-column ${
          sideMenu ? "" : "hide-sidemenu"
        }`}
      >
        <div className="Login">
          <div className="spacer"></div>
          <div className="spacer"></div>
          <div className="spacer"></div>
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3"></div>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
              <Row>
                <Col xl={12}>
                  <div className="card mb-4">
                    <div className="card-body">
                      {/* <div className="card-header"> */}
                      <h5 className="card-title text-center">Register</h5>

                      <form
                        noValidate
                        // validated={validated}
                        // onSubmit={e => submitForm(e)}
                        // onSubmit={handleSubmit(onSubmit)}
                        onSubmit={handleSubmit(onSubmit)}
                      >
                        <Form.Group
                          type="invalid"
                          controlId="validationCustomUsername"
                        >
                          <Form.Label>Name</Form.Label>
                          <InputGroup>
                            <InputGroup.Prepend>
                              <InputGroup.Text id="inputGroupPrepend">
                                <span className="fa fa-user"></span>
                              </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                              type="text"
                              placeholder="John Britto"
                              aria-describedby="inputGroupPrepend"
                              {...register("name")}
                              className={`form-control ${
                                errors.name ? "is-invalid" : ""
                              }`}
                            />

                            <span className="invalid-feedback">
                              {errors.name?.message}
                            </span>
                          </InputGroup>
                        </Form.Group>
                        <Form.Group
                          type="invalid"
                          controlId="validationCustomUsername"
                        >
                          <Form.Label>
                            {role === CLIENT
                              ? "Organization Name"
                              : "Company Name"}
                          </Form.Label>
                          <InputGroup>
                            <InputGroup.Prepend>
                              <InputGroup.Text id="inputGroupPrepend">
                                <span className="fa fa-building"></span>
                              </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                              type="text"
                              placeholder={
                                role === CLIENT
                                  ? "Organization Name"
                                  : "Company Name"
                              }
                              aria-describedby="inputGroupPrepend"
                              {...register("companyName")}
                              className={`form-control ${
                                errors.companyName ? "is-invalid" : ""
                              }`}
                            />

                            <span className="invalid-feedback">
                              {errors.companyName?.message}
                            </span>
                          </InputGroup>
                        </Form.Group>
                        <Form.Group
                          type="invalid"
                          controlId="validationCustomUsername"
                        >
                          <Form.Label>Email </Form.Label>
                          <InputGroup>
                            <InputGroup.Prepend>
                              <InputGroup.Text id="inputGroupPrepend">
                                @
                              </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                              type="email"
                              placeholder="Enter Email"
                              aria-describedby="inputGroupPrepend"
                              {...register("email")}
                              className={`form-control ${
                                errors.email ? "is-invalid" : ""
                              }`}
                              onChange={handleChange}
                            />

                            <span className="invalid-feedback">
                              {errors.email?.message}
                            </span>
                          </InputGroup>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                          <Form.Label>Password</Form.Label>
                          <InputGroup>
                            <InputGroup.Prepend>
                              <InputGroup.Text id="inputGroupPrepend">
                                <span className="fa fa-lock"></span>
                              </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                              type="password"
                              placeholder="Password"
                              {...register("password")}
                              className={`form-control ${
                                errors.password ? "is-invalid" : ""
                              }`}
                            />
                            <span className="invalid-feedback">
                              {errors.password?.message}
                            </span>
                          </InputGroup>
                        </Form.Group>
                        {role === SUPPLIER ? (
                          <>
                            <Form.Group controlId="formBasicPassword">
                              <Form.Label>Tax Id</Form.Label>
                              <InputGroup>
                                <InputGroup.Prepend>
                                  <InputGroup.Text id="inputGroupPrepend">
                                    <span className="fa fa-lock"></span>
                                  </InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                  type="text"
                                  placeholder="Tax Id"
                                  {...register("tax_id")}
                                  className={`form-control ${
                                    errors.tax_id ? "is-invalid" : ""
                                  }`}
                                />
                                <span className="invalid-feedback">
                                  {errors.tax_id?.message}
                                </span>
                              </InputGroup>
                            </Form.Group>
                          </>
                        ) : null}

                        <div className="text-center">
                          <Button
                            variant="btn app-default-button btn btn-primary"
                            type="submit"
                          >
                            Create Account
                          </Button>
                          <div>
                            {" "}
                            Already have an Account ?{" "}
                            <Link to="login" className="custom-label">
                              Login
                            </Link>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
      </PageLoader>
    </div>
  );
};

export default SignUp;
