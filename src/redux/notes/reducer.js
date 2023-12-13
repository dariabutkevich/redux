const DEFAULT_STATE = {
  data: [],
  loading: false,
  error: null,
};

export const notesReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case "NOTES/SET":
      return {
        loading: false,
        error: null,
        data: action.payload,
      };
    case "NOTES/LOADING":
      return {
        loading: false,
        error: null,
        data: [],
      };
    case "NOTES/ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
