import * as types from "./ActionTypes";

const initailState = {
  isLoading: false,
  isError: false,
  Userloggeddata: [],
  Adminalluserdata:[],
  Privatecode:{}
};

export const Reducer = (state = initailState, action: { type: any; payload: any; }) => {
  const { type, payload } = action;

  switch (type) {
    case types.GETLOGEEDUSERDATAREQ:
      return {
        ...state,
        isLoading: true,
      };

    case types.GETLOGEEDUSERDATASUCESS:
      return {
        ...state,
        isLoading: false,
        Userloggeddata: payload,
      };

    case types.GETLOGEEDUSERDATAFAILURE:
      return {
        ...state,
        isLoading: true,
        Userloggeddata: [],
      };
    case types.ADMINUSERDATASUCESS:
      return {
        ...state,
        isLoading: false,
        Adminalluserdata: payload,
      };
    case types.JOINPRIVATETABLESUCESS:
      return {
        ...state,
        isLoading: false,
        Privatecode: payload,
      };
    case types.PLAYPRIVATETABLESUCESS:
      return {
        ...state,
        isLoading: false,
        Privatecode: payload,
      };
    default:
      return state;
  }
};
