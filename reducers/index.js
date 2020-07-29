import fetchFirstGridReducer from "./fetchFirstGridReducer";
import tableReducer from "./tableReducer";
import fetchSearchReducer from "./fetchSearch";
import fetchCustomerDetailsReducer from "./fetchCustomerDetailsReducer";
import updateTableReducer from "./updateTableReducer";
import fetchBotReplyReducer from "./fetchBotReplyReducer";
import selectedTableReducer from "./selectedTableReducer";
import PredictReducer from "./predictReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  firstGrid: fetchFirstGridReducer,
  table: tableReducer,
  search: fetchSearchReducer,
  customerDetails: fetchCustomerDetailsReducer,
  updatedTable: updateTableReducer,
  botReply: fetchBotReplyReducer,
  selectedTable: selectedTableReducer,
  predict: PredictReducer,
});

export default allReducers;
