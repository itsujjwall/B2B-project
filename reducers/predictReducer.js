import { PredictTable } from "../constants/constants";

const initialState = [];

const PredictReducer = (state = initialState, action) => {
  switch (action.type) {
    case PredictTable:
      var data = state;
      for (var j = 0; j < action.payload.length; j++) {
        var flag = 0;
        for (var i = 0; i < data.length; i++) {
          if (data[i].pk_id === action.payload[j].pk_id) flag = 1;
        }
        if (
          flag === 0 &&
          parseFloat(action.payload[j].actual_open_amount) -
            parseFloat(action.payload[j].predictions) ===
            0
        )
          data.push({ ...action.payload[j], predictedState: "full" });
        else if (flag === 0) {
          data.push({ ...action.payload[j], predictedState: "partial" });
        }
      }
      return Object.create(data);
    default:
      return state;
  }
};

export default PredictReducer;
