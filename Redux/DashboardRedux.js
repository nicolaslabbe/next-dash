import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  dashboardRequest: null,
  dashboardSuccess: ["items"],
  dashboardFailure: ["error"]
});

export const DashboardTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  items: {}
});

/* ------------- Reducers ------------- */

export const dashboardRequest = (state) => {
  return {
    ...state,
    fetching: true,
    error: false
  };
};

export const dashboardSuccess = (state, { items }) => {
  return {
    ...state,
    items: items,
    fetching: false,
    error: false
  };
};

export const dashboardFailure = (state, { error }) => {
  return {
    ...state,
    fetching: false,
    error: error
  };
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DASHBOARD_REQUEST]: dashboardRequest,
  [Types.DASHBOARD_SUCCESS]: dashboardSuccess,
  [Types.DASHBOARD_FAILURE]: dashboardFailure
});
