import React, { useEffect, useState } from "react";
import {  Button, Row, Col, Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch ,useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { resetPassword } from "../../redux/actions/userActions";
import queryString from "query-string";
import Layout from "../../components/Layout";
import PageLoader from '../../common/Loader';
const ForgotPassword = (props) => {
  const {loader} = useSelector(state => state.user)
  const dispatch = useDispatch();
  const history = useHistory();
  const [sideMenu, setSideMenu] = useState(true);
  const onSideMenu = (value) => {
    setSideMenu(value);
  };
  const validationSchema = Yup.object().shape({
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string().required("Confirmation Password is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const params = queryString.parse(props.location.search);
  const token = params.reset_password_token;
  useEffect(() => {
    if (token) {
    } else {
      history.push("/login");
    }
  }, []);// eslint-disable-line react-hooks/exhaustive-deps
  const onSubmit = async (data) => {
    await dispatch(resetPassword({ ...data, reset_password_token: token }));
    // history.push("login");
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
                      <h5 className="card-title text-center">Reset Password</h5>

                      <Form
                        noValidate
                        // validated={validated}
                        // onSubmit={e => submitForm(e)}
                        onSubmit={handleSubmit(onSubmit)}
                      >
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
                        <Form.Group controlId="formBasicPassword">
                          <Form.Label>Confirm Password</Form.Label>
                          <InputGroup>
                            <InputGroup.Prepend>
                              <InputGroup.Text id="inputGroupPrepend">
                                <span className="fa fa-lock"></span>
                              </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                              type="password"
                              placeholder="Confirmation Password"
                              {...register("confirmPassword")}
                              className={`form-control ${
                                errors.confirmPassword ? "is-invalid" : ""
                              }`}
                            />
                            <span className="invalid-feedback">
                              {errors.confirmPassword?.message}
                            </span>
                          </InputGroup>
                        </Form.Group>

                        <div className="text-center">
                          <Button
                            variant="btn app-default-button btn btn-primary"
                            type="submit"
                          >
                            Submit
                          </Button>
                          <div>
                            {" "}
                            Already have an Account ?{" "}
                            <Link className="custom-label" to="login">
                              Login
                            </Link>
                          </div>
                        </div>
                      </Form>
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

export default ForgotPassword;
