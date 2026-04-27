export type Teacher = {
    id: string,
    first_name: string,
    last_name: string,
    class_Teacher: string,
}

export type TeacherState = {
    teacher: Teacher | null,
    token: string | null,
    isAuthenticated: boolean,
}


