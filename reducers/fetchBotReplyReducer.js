import { FetchBotReply } from "../constants/constants";

const initialState = {
  id: 0,
  content: [{ bot: "Hi John! How Can I help You?", user: "" }],
};

const fetchBotReplyReducer = (state = initialState, action) => {
  switch (action.type) {
    case FetchBotReply:
      state.content.push({
        bot: action.payload.bot,
        user: action.payload.user,
      });
      return { ...state, id: state.id + 1 };
    default:
      return state;
  }
};

export default fetchBotReplyReducer;
