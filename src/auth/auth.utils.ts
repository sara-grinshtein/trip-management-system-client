import axiosInstance from "../services/axios";

//keep the token in the localstorage and axiosInstance

export const setSession = (token: string) => {
  localStorage.setItem("token", token);
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// retrieve the token from the localStorage 
export const getSession = () => {
  return localStorage.getItem("token");
};

export const removeSession = () => {
  localStorage.removeItem("token");
  delete axiosInstance.defaults.headers.common["Authorization"];
//   store.dispatch(logout());
};
