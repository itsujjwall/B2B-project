import { SelectedTable, SelectedTableDelete } from "../constants/constants";

const intialState = [];

const selectedTable = (state = intialState, action) => {
  switch (action.type) {
    case SelectedTable:
      return action.payload;
    case SelectedTableDelete:
      return [];
    default:
      return state;
  }
};

export default selectedTable;
