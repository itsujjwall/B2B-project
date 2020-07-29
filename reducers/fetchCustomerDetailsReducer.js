import { customerDetails } from "../constants/constants";

const initialState = [];

const fetchCustomerDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case customerDetails:
      return action.payload;
    default:
      return state;
  }
};

export default fetchCustomerDetailsReducer;
