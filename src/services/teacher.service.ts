import axios from "./axios";

export const getStudentLocation = async(teacherId:string)=>{
    const res =  await axios.get(`/teacher/${teacherId}/students-locations`);
    return res.data;

}

export const getStudentsByTeacherId =async(teacherId:string)=>{
    const res = await axios.get(`/teacher/${teacherId}/students-by-teacher-id`)
    return res.data;
}