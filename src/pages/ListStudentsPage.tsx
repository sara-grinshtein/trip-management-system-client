import { useEffect, useState } from "react";
import { getStudentsByTeacherId } from "../services/teacher.service"
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Student } from "../types/Student.types";
import styles from "./ListStudentsPage.module.css";

export default function ListStudentPage() {
    //retrieve the teacherId from redux
    const teacherId = useSelector((state: RootState) => state.auth.user?.id);
    const [listStudents, setListStudents] = useState<Student[]>([]);

    useEffect(() => {
        const GetListStudent = async () => {
            if (!teacherId) return;
            const data = await getStudentsByTeacherId(teacherId);
            setListStudents(data);
        }
        GetListStudent();
    },[teacherId]);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>רשימת התלמידות</h2>

            {listStudents.length === 0 ? (
                <p className={styles.empty}>לא נמצאו תלמידות</p>
            ) : (
                <ul className={styles.list}>
                    {listStudents.map((student) => (
                        <li key={student.id} className={styles.card}>
                            {student.firstName} {student.lastName} - {student.classStudent}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );

}