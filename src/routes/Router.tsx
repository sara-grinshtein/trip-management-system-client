import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import TeacherPage from "../pages/TeacherPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
   {
    path: "/teacherPage",
    element: < TeacherPage/>,
  }
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}