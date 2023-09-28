import * as types from "./ActionTypes";

type userdata = {
  name: string;
  lastname: string;
  email: string;
  password: string;
};

const initialState = {
  isLoading: false,
  isError: false,
  token: "",
  isAuth: false,
  userdata: [] as string[], // Initialize userdata as an empty string array
};

type authAction = {
  type: string;
  payload?: string;
};

export const Reducer = (state = initialState, action: authAction) => {
  const { type, payload } = action;

  switch (type) {
    case types.LOGINUSERREQ:
      return {
        ...state,
        isLoading: true,
        isError:false,
        isAuth: false,
      };
    case types.LOGINUSERSUCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        token: payload,
        isAuth: true,
      };
    case types.LOGINUSERFAILURE:
      return {
        ...state,
        isLoading: true,
        isError: true,
        isAuth: false,
      };

    case types.SIGNUPUSERSUCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        userdata: payload,
      };
    case types.ADMINUSERSUCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
      };
    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isAuth: false,
      };

    default:
      return state;
  }
};
