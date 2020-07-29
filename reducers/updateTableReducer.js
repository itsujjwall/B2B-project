import { UpdateTable } from "../constants/constants";

const initialState = [];

const updateTableReducer = (state = initialState, action) => {
  switch (action.type) {
    case UpdateTable:
      return action.payload;
    default:
      return state;
  }
};

export default updateTableReducer;
