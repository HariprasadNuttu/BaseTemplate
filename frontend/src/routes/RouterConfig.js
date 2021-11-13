import React from "react";
import { Switch, Route ,Redirect  } from "react-router-dom";
import LogIn from "../pages/LogIn";
import SignUp from "../pages/SignUp";
import ForgotPassword from '../pages/ForgotPassword'
import ResetPassword from '../pages/ForgotPassword/ResetPassword'
import { ROOT, SIGNUP, LOGIN,
  FORGOT_PASSWORD, RESET_PASSWORD ,DASHBOARD } from "./constants";
import Dashboard from "../components/Dashboard";
import '../assets/css/style.css';
import '../assets/css/responsive.css';

export const RouterConfig = () => {
  return (
    <div>
      <Switch>
        {/* List all public routes here */}
        <Route exact path={ROOT} >
             <Redirect to={DASHBOARD} />
        </Route>
        <Route exact path={DASHBOARD} component={Dashboard} />
        <Route exact path="*">
          <Redirect to={DASHBOARD} />
        </Route>
      </Switch>
    </div>
  );
};


export const UnAuthenticatedRoutes = () => {
  return (
    <div>
      <Switch>
        {/* List all public routes here */}
        <Route exact path={ROOT} component={LogIn} />
        <Route exact path={SIGNUP} component={SignUp} />
        <Route exact path={FORGOT_PASSWORD} component={ForgotPassword} />
        <Route  path={RESET_PASSWORD} component={ResetPassword} />
        <Route path={LOGIN}>
          <LogIn />
        </Route>
        <Redirect to={ROOT}  />
      </Switch>
    </div>
  );
};
