import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { extractToken, register } from "../services/auth.service";
import { useAppDispatch } from "../redux/store";
import { setAuth } from "../redux/auth/authSlice";

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [message, setMessage] = useState("");

  const onSubmit = async (event: any) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const id = formData.get("id")?.toString();
    const firstName = formData.get("firstName")?.toString();
    const lastName = formData.get("lastName")?.toString();
    const role = formData.get("role")?.toString();
    const userClass = formData.get("class")?.toString();

    if (!id || !firstName || !lastName || !role || !userClass) {
      setMessage("All fields are required");
      return;
    }

    try {
      const data = await register({
        id, firstName, lastName,
        role: role as "Student" | "Teacher",
        class: userClass,
      });

      const token = extractToken(data)


      dispatch(setAuth({
        user: {
          id,
          firstName,
          lastName,
          role: role as "Student" | "Teacher"
        },
        token: token as string
      }));

      setMessage("Registered successfully!");
      setTimeout(() => navigate("/"), 1500);

    } catch (err: any) {
      setMessage(err.response?.data || "Registration failed");
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h1>Register</h1>

        <input name="id" placeholder="ID" />
        <input name="firstName" placeholder="First Name" />
        <input name="lastName" placeholder="Last Name" />
        <input name="class" placeholder="Class" />

        <select name="role">
          <option value="">Select role</option>
          <option value="Student">Student</option>
          <option value="Teacher">Teacher</option>
        </select>

        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}