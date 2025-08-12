import TeachersLeaveComponent from '@/components/dashboard/teachers/TeachersLeaveComponent'
const TeacherLeaveEdit = ()=>{
    const initialLeaveData = {
  id: "12345", // optional, only needed if you're updating
  
  fromDate: "2025-07-15", // string or Date object is fine
  toDate: "2025-07-18",
  totalDays: 4,
  teacher: "Sakib",
  
};
    return (
        <TeachersLeaveComponent initialData={initialLeaveData} />
    )
}
export default TeacherLeaveEdit