import axios from "./axios";

export type Role = "Student" | "Teacher";

// Defines how the login data looks
type LoginData = {
  id: string;
  firstName: string;
  lastName: string;
};

// Defines how the registration data looks
type RegisterData = {
  id: string;
  firstName: string;
  lastName: string;
  role: Role;
  class:string
};

// gets the token from the server response
export const extractToken = (data: any): string | null => {
  return data?.token || data?.Token || null;
};

export const register = async (data: RegisterData) => {
  const res = await axios.post("/login/register", data);
  return res.data;
};

export const login = async (data: LoginData) => {
  const res = await axios.post("/login/login", data);
  return res.data;
};