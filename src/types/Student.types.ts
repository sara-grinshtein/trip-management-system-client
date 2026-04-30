export type Student = {
    id: string,
    firstName: string,
    lastName: string,
    classStudent: string,
}

export type StudentState = {
  student: Student | null,
  token: string | null,
  isAuthenticated: boolean,
}