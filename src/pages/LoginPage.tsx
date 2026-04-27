import { useNavigate } from "react-router-dom";
import { login, extractToken } from "../services/auth.service";
import axios from "../services/axios";

export default function LoginPage() 
{
  const navigate = useNavigate();

  const onSubmit = async (event: any) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const id = formData.get("id");
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");

    if (!id || !firstName || !lastName) {
      alert("All fields are required");
      return;
    }

    try {
      const data = await login({
        id: id as string,
        firstName: firstName as string,
        lastName: lastName as string,
      });

      const token = extractToken(data);

      if (!token) {
        alert("Login failed");
        return;
      }

      localStorage.setItem("token", token);

      // axios global header
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Login</h1>

      <input name="id" placeholder="ID" required />
      <input name="firstName" placeholder="First Name" required />
      <input name="lastName" placeholder="Last Name" required />

      <button type="submit">Login</button>
    </form>
  );
}