import CreateExamRoutine from '@/components/dashboard/educational-department/CreateExamRoutine'

const EditExamRoutinePage = ()=>{
    const existingData = {
  id: 123,
  class: "Class 10A",
  session: "2024-2025",
  exam: "Final Exam",
  routineData: [
    {
      id: 1,
      subject: "Mathematics",
      date: "2024-12-15",
      day: "Monday",
      room: "Room 101",
      time: "09:00",
      marks: "100",
      summary: "Algebra and Geometry"
    }
  ]
};


    return (
        <div>
       <CreateExamRoutine initialData={existingData} mode="edit" />
        </div>
    )
}
export default EditExamRoutinePage