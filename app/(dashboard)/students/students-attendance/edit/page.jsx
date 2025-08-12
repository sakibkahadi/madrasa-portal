import CreateAttendanceComponent from '@/components/dashboard/students/CreateAttendanceComponent'
import EditStudentComponent from '@/components/dashboard/students/EditStudentComponent'
import EditStudent from '@/components/dashboard/students/EditStudentComponent'
import React from 'react'

const StudentEdit = () => {
  return (
   <CreateAttendanceComponent initialData={{
    class: '10',
    session: '2024',
    date: '2025-07-19', // Use ISO string or date string
    attendanceData: [
      { id: 1, name: 'John Doe', regNo: 'REG001', status: 'Present' },
      { id: 2, name: 'Jane Smith', regNo: 'REG002', status: 'Absent' },
    ],
    id: 'attendance-id-123', // Optional: useful if you want to send ID to backend
  }} />
  )
}

export default StudentEdit