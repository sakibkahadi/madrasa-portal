import ExamRoutineListByClass from '@/components/dashboard/educational-department/ExamRoutineListByClass'

export default async function ExamRoutineShowByClass({ params }) {
  const { classId } = params;

  // Optional: Fetch data here using examId and sessionId
  // const res = await fetch(`https://your-api.com/api/exam/${examId}/session/${sessionId}`);
  // const data = await res.json();
  const examRoutineData = {
    class: "CLASS SIX",
    session: "2025-26",
    exam: "Final Exam",
    routineData: [
      {
        id: 1,
        subject: "MY FIRST ENGLISH READER",
        date: "08 Aug 2025",
        day: "Friday",
        room: "Room 101",
        time: "09:00",
        marks: "100",
        summary: "Bring your own stationery"
      },
      {
        id: 2,
        subject: "Mathematics",
        date: "10 Aug 2025",
        day: "Monday",
        room: "Room 102",
        time: "11:00",
        marks: "100",
        summary: "Calculator allowed"
      },
      {
        id: 3,
        subject: "Science",
        date: "12 Aug 2025",
        day: "Wednesday",
        room: "Lab 1",
        time: "14:00",
        marks: "80",
        summary: "Practical exam"
      }
    ]
  };

  return (
    <div>
        
      
<ExamRoutineListByClass data={examRoutineData}   />
     
    </div>
  );
}
