import * as types from "./ActionTypes";
import axios, { AxiosResponse } from "axios";
import { Dispatch } from "@reduxjs/toolkit";

//  Get user Logged data

const getdatareq = () => {
  return {
    type: types.GETLOGEEDUSERDATAREQ,
  };
};

const getdatasuccess = (payload: AxiosResponse<any, any>) => {
  return {
    type: types.GETLOGEEDUSERDATASUCESS,
    payload,
  };
};

const getdatafailure = () => {
  return {
    type: types.GETLOGEEDUSERDATAFAILURE,
  };
};

//  Get user Admin data

const AdmingetuserReq = () => {
  return {
    type: types.ADMINUSERDATAREQ,
  };
};

const AdmingetuserSuccess = (payload: AxiosResponse<any, any>) => {
  return {
    type: types.ADMINUSERDATASUCESS, 
    payload,
  };
};

const AdmingetuserFail = () => {
  return {
    type: types.ADMINUSERDATAFAILURE,
  };
};

/***------------------------  Create tournament ---------------- */

const CreatetournamentReq = () => {
  return {
    type: types.CREATTOURNAMNETREQ,
  };
};

const CreateTournamentSuccess = (payload: AxiosResponse<any, any>) => {
  return {
    type: types.CREATTOURNAMNETSUCESS, // Assuming you have a constant named CREATE_TOURNAMENT_SUCCESS defined in a file named 'types'.
    payload,
  };
};

const CreatetournamentFail = () => {
  return {
    type: types.CREATTOURNAMNETFAILURE,
  };
};

//  /---------------------Admin Credit ------------- //

const AdmincreditReq = () => {
  return {
    type: types.ADMINCREDITREQ,
  };
};

const AdmincreditSuccess = (payload: AxiosResponse<any, any>) => {
  return {
    type: types.ADMINCREDITSUCESS, // Assuming you have a constant named CREATE_TOURNAMENT_SUCCESS defined in a file named 'types'.
    payload,
  };
};

const AdmincreditFail = () => {
  return {
    type: types.ADMINCREDITFAILURE,
  };
};

//  /---------------------Admin DEBIT ------------- //

const AdmindebitReq = () => {
  return {
    type: types.ADMINDEBITREQ,
  };
};

const AdmindebitSuccess = (payload: AxiosResponse<any, any>) => {
  return {
    type: types.ADMINCREDITSUCESS, // Assuming you have a constant named CREATE_TOURNAMENT_SUCCESS defined in a file named 'types'.
    payload,
  };
};

const AdmindebitFail = () => {
  return {
    type: types.ADMINDEBITFAILURE,
  };
};

// ------------------- JOINPRIVATETABLE  -------------------- //

const JOinprivatetableReq = () => {
  return {
    type: types.JOINPRIVATETABLEREQ,
  };
};

const JOinprivatetableSuccess = (payload: AxiosResponse<any, any>) => {
  return {
    type: types.JOINPRIVATETABLESUCESS,
    payload,
  };
};

const JOinprivatetableFail = () => {
  return {
    type: types.JOINPRIVATETABLEFAILURE,
  };
};

export const playprivatetableSuccess = (payload: any) => {
  return {
    type: types.PLAYPRIVATETABLESUCESS,
    payload,
  };
};

// interface Usertoken {
//   token: string;
// }

// const utoken = localStorage.getItem("token");
// const token: Usertoken | null = utoken ? JSON.parse(utoken) : null;

export const GetloggedData = (dispatch: Dispatch) => {
  interface Usertoken {
    token: string;
  }

  const utoken = localStorage.getItem("token");
  const token: Usertoken | null = utoken ? JSON.parse(utoken) : null;

  dispatch(getdatareq());

  return axios
    .get(`https://blue-seahorse-suit.cyclic.cloud/api/v1/user/get/profile`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((r) => {
      return dispatch(getdatasuccess(r.data));
    })
    .catch((err) => {
      dispatch(getdatafailure());
    });
};

{
  /** CRETE TOURNAMENT  */
}

export const GETADMINALLUSERDATA = (dispatch: Dispatch) => {
  interface Usertoken {
    token: string;
  }

  const utoken = localStorage.getItem("token");
  const token: Usertoken | null = utoken ? JSON.parse(utoken) : null;

  dispatch(AdmingetuserReq());
  return axios
    .get(`https://blue-seahorse-suit.cyclic.cloud/api/v1/user/gets/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return dispatch(AdmingetuserSuccess(res.data));
    })
    .catch((e) => {
      return dispatch(AdmingetuserFail());
    });
};

{
  /** CREATE TOURNAMENT  */
}

export const Createtounament =
  (id: any, payload: any) => (dispatch: Dispatch) => {
    dispatch(CreatetournamentReq());
    return axios
      .put(
        `https://blue-seahorse-suit.cyclic.cloud/api/v1/user/update/${id}`,
        payload
      )
      .then((res) => {
        return dispatch(CreateTournamentSuccess(res.data));
      })
      .catch((e) => {
        return dispatch(CreatetournamentFail());
      });
  };

{
  /** ADMIN CREDIT POST  */
}

export const ADMINCREDIT = (payload: any) => (dispatch: Dispatch) => {
  dispatch(AdmincreditReq());
  return axios
    .post(
      `https://blue-seahorse-suit.cyclic.cloud/api/v1/transaction/update-user-wallet/credit`,
      payload
    )
    .then((res) => {
      return dispatch(AdmincreditSuccess(res.data));
    })
    .catch((e) => {
      return dispatch(AdmincreditFail());
    });
};

{
  /** ADMIN DEBIT POST  */
}

export const ADMINDEBIT = (payload: any) => (dispatch: Dispatch) => {
  dispatch(AdmindebitReq());
  return axios
    .post(
      `https://blue-seahorse-suit.cyclic.cloud/api/v1/transaction/update-user-wallet/debit`,
      payload
    )
    .then((res) => {
      return dispatch(AdmindebitSuccess(res.data));
    })
    .catch((e) => {
      return dispatch(AdmindebitFail());
    });
};

export const CREATEPRIVATETABLE = (dispatch: Dispatch) => {
  interface Usertoken {
    token: string;
  }

  const utoken = localStorage.getItem("token");
  const token: Usertoken | null = utoken ? JSON.parse(utoken) : null;

  dispatch(JOinprivatetableReq());
  return axios
    .post(
      `https://blue-seahorse-suit.cyclic.cloud/api/v1/table/create/private`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      return dispatch(JOinprivatetableSuccess(res.data));
    })
    .catch((e) => {
      return dispatch(JOinprivatetableFail());
    });
};
