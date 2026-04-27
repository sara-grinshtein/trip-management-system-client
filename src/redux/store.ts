import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authReducer from "./auth/authSlice";
import studentReducer from "./student/studentSlice"
import teacherReducer from "./teacher/teacherSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    teachers:teacherReducer,
    students:studentReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
