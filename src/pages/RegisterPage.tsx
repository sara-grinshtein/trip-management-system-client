import { useNavigate } from "react-router-dom";
import { register } from "../services/auth.service";

export default function RegisterPage() {
  const navigate = useNavigate();

  const onSubmit = async (event: any) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const id = formData.get("id")?.toString();
    const firstName = formData.get("firstName")?.toString();
    const lastName = formData.get("lastName")?.toString();
    const role = formData.get("role")?.toString();
    const userClass = formData.get("class")?.toString();

    if (!id || !firstName || !lastName || !role || !userClass) {
      alert("All fields are required");
      return;
    }

    try {
      await register({
        id,
        firstName,
        lastName,
        role: role as "Student" | "Teacher",
        class: userClass,
      });

      alert("Registered successfully!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Register</h1>

      <input name="id" placeholder="ID" required />
      <input name="firstName" placeholder="First Name" required />
      <input name="lastName" placeholder="Last Name" required />
      <input name="class" placeholder="Class" required />

      <select name="role" required>
        <option value="">Select role</option>
        <option value="Student">Student</option>
        <option value="Teacher">Teacher</option>
      </select>

      <button type="submit">Register</button>
    </form>
  );
}