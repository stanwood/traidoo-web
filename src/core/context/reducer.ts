import { Actions, State } from "./types";

const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case "addMessage": {
      return {
        ...state,
        message: { message: action.payload.message, open: true },
      };
    }
    case "removeMessage": {
      return {
        ...state,
        message: { message: null, open: false },
      };
    }
    default:
      return state;
  }
};

export default reducer;
