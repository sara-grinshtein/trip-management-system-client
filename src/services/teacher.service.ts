export const getStudentLocation = async(teacherId:string)=>{
    const res = await fetch(`/api/teacher/${teacherId}/students-locations`);
    return res.json();

}