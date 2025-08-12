import StudentLeaveComponent from '@/components/dashboard/students/StudentLeaveComponent'
const StudentLeaveEdit = ()=>{
    const initialLeaveData = {
  id: "12345", // optional, only needed if you're updating
  class: "10",
  student: "11",
  fromDate: "2025-07-15", // string or Date object is fine
  toDate: "2025-07-18",
  totalDays: 4,
  takenBy: "guardian",
  note: "Medical leave",
};
    return (
        <StudentLeaveComponent initialData={initialLeaveData} />
    )
}
export default StudentLeaveEdit