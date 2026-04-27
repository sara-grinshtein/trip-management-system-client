export type Student = {
    id: string,
    first_name: string,
    last_name: string,
    class_student: string,
}

export type StudentState = {
  student: Student | null,
  token: string | null,
  isAuthenticated: boolean,
}