import "./App.css";
import React, { useState, useEffect } from "react";
import { RouterConfig, UnAuthenticatedRoutes } from "./routes/RouterConfig";
import { useSelector, useDispatch } from "react-redux";
import {
  getProfileDetails
} from "./redux/actions/userActions";

import { ToastContainer } from "react-toastify";
import PageLoader from './common/Loader';
import { ADMIN , CLIENT , SUPPLIER } from "./common/constants";
const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated , userDetails } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  useEffect( () => {
    async function fetchProfileDetails(){
      await dispatch(getProfileDetails());
      setIsLoading(false);
    }       
    fetchProfileDetails();   
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  const renderSwitch =() =>{
    switch(userDetails.role) {
      case ADMIN:
        return <RouterConfig />
      case CLIENT:
        return <RouterConfig />
      case SUPPLIER:
        return <RouterConfig />
      default:
        return '';
    }
  }
   
  return (
    <div className="page-wrapper">
      <PageLoader loader={isLoading} >
        {isLoading ? (
          <></>
        ) : (
          <>
            {isAuthenticated ? (
              <div>
                {/* <RouterConfig /> */}
                  {renderSwitch()}
              </div>
            ) : (
              <div> {isAuthenticated ? null : <UnAuthenticatedRoutes />}</div>
            )}
            <ToastContainer />
          </>
        )}
    </PageLoader>
  
    </div>
  );
};

export default App;
