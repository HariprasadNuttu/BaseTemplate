import React, {  useState } from "react";
import {  Button, Row, Col, Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch , useSelector} from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { forgotPassword } from "../../redux/actions/userActions";
import Layout from "../../components/Layout";
import PageLoader from '../../common/Loader';
const ForgotPassword = (props) => {
  const dispatch = useDispatch();
  const {loader} = useSelector(state => state.user)
  const [sideMenu, setSideMenu] = useState(true);
  const onSideMenu = (value) => {
    setSideMenu(value);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = async (data) => {
    await dispatch(forgotPassword({ ...data }));
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
                      <h5 className="card-title text-center">
                        Forgot Password
                      </h5>

                      <Form
                        noValidate
                        // validated={validated}
                        // onSubmit={e => submitForm(e)}
                        onSubmit={handleSubmit(onSubmit)}
                      >
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
                            />

                            <span className="invalid-feedback">
                              {errors.email?.message}
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
