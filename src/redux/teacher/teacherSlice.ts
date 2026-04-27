import { createSlice } from "@reduxjs/toolkit";
import { TeacherState } from "../../types/Teacher.types";

const initialState: TeacherState = {
  teacher: null,
  token: null,
  isAuthenticated: false,
};

const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {
    setTeacher: (state, action) => {
      const { teacher, token } = action.payload;
      state.teacher = teacher;
      state.token = token;
      state.isAuthenticated = true;
    },

    logoutTeacher: () => initialState,
  },
});

export const { setTeacher, logoutTeacher } = teacherSlice.actions;
export default teacherSlice.reducer;