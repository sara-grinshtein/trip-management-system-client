import { createSlice } from "@reduxjs/toolkit";
import { StudentState } from "../../types/Student.types";

const initialState: StudentState = {
  student: null,
  token: null,
  isAuthenticated: false,
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    setStudent: (state, action) => {
      const { student, token } = action.payload;
      state.student = student;
      state.token = token;
      state.isAuthenticated = true;
    },

    logoutStudent: () => initialState,
  },
});

export const { setStudent, logoutStudent } = studentSlice.actions;
export default studentSlice.reducer;