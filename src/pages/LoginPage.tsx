import { useNavigate } from "react-router-dom";
import { login, extractToken } from "../services/auth.service";
import axios from "../services/axios";
import { useAppDispatch } from "../redux/store";
import { setAuth } from "../redux/auth/authSlice";
import styles from "./LoginPage.module.css";


export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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

      //extract the role from the token
      const payload = JSON.parse(atob(token.split('.')[1]));
      const role = payload.role;
      dispatch(setAuth({
        user: {
          id: id as string,
          firstName: firstName as string,
          lastName: lastName as string,
          role: role
        },
        token: token
      }));


      if (role == "Teacher") {
        navigate("/teacherPage")
        return
      }


      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles["form-box"]} onSubmit={onSubmit}>
        <h1 className={styles["main-title"]}>
          בית ספר בנות משה יוצאות לטיול!
        </h1>

        <input
          className={styles.input}
          name="id"
          placeholder="תעודת זהות"
          required
        />

        <input
          className={styles.input}
          name="firstName"
          placeholder="שם פרטי"
          required
        />

        <input
          className={styles.input}
          name="lastName"
          placeholder="שם משפחה"
          required
        />

        <button className={styles.button} type="submit">
          התחברות
        </button>
      </form>
    </div>
  );

}