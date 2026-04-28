import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { getStudentLocation } from "../services/teacher.service";

export default function TeacherPage() {
  const teacherId = useSelector((state: RootState) => state.auth.user?.id);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    if (!teacherId) return;

    const fetchData = async () => {
      try {
        const data = await getStudentLocation(teacherId);
        setStudents(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [teacherId]);

  return (
    <div>
    </div>
  );
}