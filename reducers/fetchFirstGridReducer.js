import {
    totalCustomer,
    totalOpenAR,
    totalOpenInvoices,
    avgDaysDelay,
  } from "../constants/constants";
  
  const initialState = {
    totalCustomer: null,
    totalOpenAR: null,
    totalOpenInvoices: null,
    avgDaysDelay: null,
  };
  
  const fetchFirstGridReducer = (state = initialState, action) => {
    switch (action.type) {
      case totalCustomer:
        return { ...state, totalCustomer: action.payload };
      case totalOpenAR:
        return { ...state, totalOpenAR: action.payload };
      case totalOpenInvoices:
        return { ...state, totalOpenInvoices: action.payload };
      case avgDaysDelay:
        return { ...state, avgDaysDelay: action.payload };
      default:
        return state;
    }
  };
  
  export default fetchFirstGridReducer;
  