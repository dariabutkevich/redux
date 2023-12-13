const DEFAULT_STATE = {
  data: {},
  loading: false,
  error: null,
};

export function userReducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case "USER/LOADING/SET":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "USER/SET":
      return {
        data: action.payload,
        loading: false,
        error: null,
      };
    case "USER/ERROR/SET":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
