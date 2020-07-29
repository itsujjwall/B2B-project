import { FetchSearch } from "../constants/constants";

const initialState = [];

const fetchSearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case FetchSearch:
      if (action.payload === "") {
        return state;
      } else return action.payload;
    default:
      return state;
  }
};

export default fetchSearchReducer;
