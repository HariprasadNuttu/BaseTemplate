import React from "react";
import Navigation from "../../components/Navigation/Navigation";
import { useSelector, useDispatch } from "react-redux";
import {redirectToLogin } from "../../redux/actions/userActions";
import { signUpUser } from "../../redux/actions/appActions";
const Layout = (props) => {
  const dispatch = useDispatch();
  const { isAuthenticated, userDetails } = useSelector((state) => state.user);
  const { signUpUserRole } = useSelector((state) => state.app);
  // const [sideMenu, setSideMenu] = useState(true);
  const onSideMenu = (value) => {
    props.onClick(value);
  };
  const logout = () => {
    dispatch(signUpUser(null));
    dispatch(redirectToLogin());
  };
  return (
    <Navigation isAuthenticated={isAuthenticated} userInfo={userDetails} onClick={onSideMenu} redirectToLogin={logout} signUpUserRole={signUpUserRole}/>
  );
};

export default Layout;
