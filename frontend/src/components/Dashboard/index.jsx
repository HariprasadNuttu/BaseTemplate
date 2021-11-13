import React ,{useState ,useEffect} from "react";
import BreadCrumb from "../BreadCrumb";
import Layout from '../Layout'
import {
 fetchDetails
} from "../../redux/actions/dashboardAction";
import { useDispatch, useSelector } from "react-redux";
import PageLoader from "../../common/Loader";
const Dashboard = (props) => {
  const dispatch = useDispatch();
  const { userDetails } = useSelector((state) => state.user);
  const { details,loader } = useSelector((state) => state.dashboard);
  const [sideMenu, setSideMenu] = useState(true);
  const onSideMenu = (value) => {
    setSideMenu(value);
  };

  useEffect(() => {
    async function fetchDashboardDetails(){
      // await  dispatch(fetchDetails({client_id:userDetails.client_id}));
    }
   
   fetchDashboardDetails();
  }, [])// eslint-disable-line react-hooks/exhaustive-deps
 
  
  
  return (
    <div className="page-wrapper">
      <Layout onClick={onSideMenu} />
      <PageLoader loader={loader} >
      <div className={`main-content d-flex flex-column ${sideMenu ? "" : "hide-sidemenu"  }`}>
        <div className="main-content-header">
          <BreadCrumb />
          </div>
          <div className="row">
            Dashboard
        
        </div>
      </div>
      </PageLoader>
    </div>      
  );
};

export default Dashboard;
