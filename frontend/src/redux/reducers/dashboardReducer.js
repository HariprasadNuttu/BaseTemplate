import { CLOSE_LOADER, OPEN_LOADER } from "../actions/appActions";
import { GET_DASHBOARD_DETAILS } from "../actions/dashboardAction";
  
  const initialState = {
    loader: false,
    details: []
  };
  
  export const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_DASHBOARD_DETAILS:
      return {
        ...state,
        details: action.payload,
      };
      case OPEN_LOADER:
        return {
          ...state,
          loader: action.payload,
        };
      case CLOSE_LOADER:
        return {
          ...state,
          loader: action.payload,
        };
      default:
        return state;
    }
  };
  