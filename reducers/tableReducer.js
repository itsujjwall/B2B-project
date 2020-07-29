import { FetchTable } from "../constants/constants";

const initialState = [];

const tableReducer = (state = initialState, action) => {
  switch (action.type) {
    case FetchTable:
      return action.payload;
    default:
      return state;
  }
};

export default tableReducer;
