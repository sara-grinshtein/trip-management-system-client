import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// represents an authenticated user in the system
interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  role: "Student" | "Teacher" ;
}

// represents the authentication state in the application
interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  error: string | null;
}

// initial authentication state.

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    
    // sets authentication data after successful login
    setAuth: (
      state,
      action: PayloadAction<{ user: AuthUser; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
