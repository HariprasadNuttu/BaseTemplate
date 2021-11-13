import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {  Button ,Row, Col, Form, InputGroup} from "react-bootstrap";
import { updateUser } from "../../redux/actions/userActions";
import Layout from '../../components/Layout'
import PageLoader from '../../common/Loader'
import "./index.css";
const LogIn = (props) => {
  const {loader} = useSelector(state => state.user)
  const dispatch = useDispatch();
  const [sideMenu, setSideMenu] = useState(true);
  const onSideMenu = (value) => {
    setSideMenu(value);
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = async (data) => {
    // let path = `suppliers`;
    await dispatch(updateUser(data));
  };

  return (
    <>
    <div className="page-wrapper">
      <PageLoader loader={loader} >
      <Layout onClick={onSideMenu} />
      <div className={`main-content d-flex flex-column ${sideMenu ? "" : "hide-sidemenu"  }`}>
          <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-2 col-lg-3 col-xl-3"></div>
        <div className="col-xs-12 col-sm-12 col-md-8 col-lg-6 col-xl-4" style={{ paddingRight: "0px" }}>
          <Row>
            <Col xl={12}>
              <div className="card mb-4">
                <div className="card-body">
                  {/* <div className="card-header"> */}
                  <h5 className="card-title text-center">Sign In</h5>
                  {/* </div> */}
                 
                  <div className="spacer"></div>
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
                      <Form.Label>Email Address</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type="email"
                          placeholder="Enter Email"
                          aria-describedby="inputGroupPrepend"
                          {...register("email")}
                          className={`form-control ${
                            errors.email ? "is-invalid" : ""
                          }`}
                        />

                        <InputGroup.Prepend>
                          <InputGroup.Text id="inputGroupPrepend">
                            @
                          </InputGroup.Text>
                        </InputGroup.Prepend>
                        <span className="invalid-feedback">
                          {errors.email?.message}
                        </span>
                      </InputGroup>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <InputGroup>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        {...register("password")}
                        className={`form-control ${
                          errors.password ? "is-invalid" : ""
                        }`}
                      />
                      <InputGroup.Prepend>
                          <InputGroup.Text id="inputGroupPrepend">
                            <span className="fa fa-lock"></span>
                          </InputGroup.Text>
                        </InputGroup.Prepend>
                      <span className="invalid-feedback">
                        {errors.password?.message}
                      </span>
                      </InputGroup>
                    </Form.Group>

                    <Form.Group controlId="formBasicChecbox">
                      <Form.Label ><Link className="custom-label" to="forgotPassword">Forgot Password?</Link></Form.Label>
                    </Form.Group>

                    <div className="text-center">
                      <Button
                        variant="btn app-default-button btn btn-primary"
                        type="submit"
                      >
                        Submit
                      </Button>
                    </div>
                  </Form>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>     
     </PageLoader>
   
      </div>
    </>
  );
};

export default LogIn;
