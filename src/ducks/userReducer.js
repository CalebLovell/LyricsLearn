import axios from "axios";

const initialState = {
  user: {}
};

const GET_DATA = "GET_DATA";
const KILL_USER = "KILL_USER";

export function getUserData() {
  let data = axios.get("/auth/user").then(res => res.data);
  return {
    type: GET_DATA,
    payload: data
  };
}

export function killUser() {
  let data = axios.get("/auth/logout");
  return {
    type: KILL_USER,
    payload: data
  };
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_DATA}_FULFILLED`:
      return { user: action.payload };
    case `${KILL_USER}_FULFILLED`:
      return { ...initialState };
    default:
      return state;
  }
}
