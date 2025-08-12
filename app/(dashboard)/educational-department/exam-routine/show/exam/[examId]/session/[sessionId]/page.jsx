import ExamRoutineShowList from '@/components/dashboard/educational-department/ExamRoutineShowList'

export default async function ExamRoutineDetailPage({ params }) {
  const { examId, sessionId } = params;

  // Optional: Fetch data here using examId and sessionId
  // const res = await fetch(`https://your-api.com/api/exam/${examId}/session/${sessionId}`);
  // const data = await res.json();

  return (
    <div>
      
<ExamRoutineShowList  examId={examId} sessionId={sessionId} />
      {/* Render fetched data if needed */}
      {/* <div>{data.title}</div> */}
    </div>
  );
}
