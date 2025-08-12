"use client";
import React, { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Toaster, toast } from "sonner";
import { useRouter } from 'next/navigation';

// Sample data
const classes = [
  { id: 1, name: "Class 10A", subjects: ["Mathematics", "English"] },
  { id: 2, name: "Class 10B", subjects: ["Science", "Social Studies"] },
  { id: 3, name: "Class 9A", subjects: ["Computer Science"] },
];

const sessions = [
  { id: 1, name: "2024-2025" },
  { id: 2, name: "2025-2026" },
];

const exams = [
  { id: 1, name: "Final Exam" },
  { id: 2, name: "Mid Term Exam" },
  { id: 3, name: "First Term Exam" },
];

// Default template for exam routine data
const getDefaultExamRoutine = (selectedClass) => {
  const classData = classes.find(cls => cls.name === selectedClass);
  if (!classData) return [];
  
  return classData.subjects.map((subject, index) => ({
    id: index + 1,
    subject: subject,
    date: "",
    day: "",
    room: "",
    time: "",
    marks: "100",
    summary: ""
  }));
};

const CreateExamRoutine = ({ initialData = {} }) => {
  const [formData, setFormData] = useState({
    class: initialData?.class || "",
    session: initialData?.session || "",
    exam: initialData?.exam || ""
  });

  const [showTable, setShowTable] = useState(false);
  const [examRoutineData, setExamRoutineData] = useState([]);

  const router = useRouter();

  // Load initial data if editing
  useEffect(() => {
    if (initialData?.class) {
      const routineData = initialData.routineData || getDefaultExamRoutine(initialData.class);
      setExamRoutineData(routineData);
      setShowTable(true);
    }
  }, [initialData]);

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle inline editing
  const handleTableEdit = (id, field, value) => {
    setExamRoutineData(prev =>
      prev.map(routine =>
        routine.id === id ? { ...routine, [field]: value } : routine
      )
    );
  };

  // When class changes, update the subjects
  const handleClassChange = (value) => {
    handleSelectChange('class', value);
    if (value) {
      const routineData = getDefaultExamRoutine(value);
      setExamRoutineData(routineData);
      toast.success(`Loaded subjects for ${value}`);
      setShowTable(true);
    } else {
      setShowTable(false);
      setExamRoutineData([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Exam Routine:", {
      filters: formData,
      routineData: examRoutineData
    });
    toast.success("Exam routine saved successfully!");
  };

  return (
    <div className="container mx-auto p-6">
      <Toaster />
      <h1 className="text-3xl font-bold mb-6">
        {initialData?.id ? 'Edit Exam Routine' : 'Create Exam Routine'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white shadow-md rounded-lg sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="flex flex-col gap-[10px]">
              <Label>Class <span className='text-red-500'>*</span></Label>
              <Select onValueChange={handleClassChange} value={formData.class}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map(cls => (
                    <SelectItem key={cls.id} value={cls.name}>{cls.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-[10px]">
              <Label>Session <span className='text-red-500'>*</span></Label>
              <Select onValueChange={(value) => handleSelectChange('session', value)} value={formData.session}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Session" />
                </SelectTrigger>
                <SelectContent>
                  {sessions.map(session => (
                    <SelectItem key={session.id} value={session.name}>{session.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-[10px]">
              <Label>Exam <span className='text-red-500'>*</span></Label>
              <Select onValueChange={(value) => handleSelectChange('exam', value)} value={formData.exam}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Exam" />
                </SelectTrigger>
                <SelectContent>
                  {exams.map(exam => (
                    <SelectItem key={exam.id} value={exam.name}>{exam.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

          <div className="mt-6">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">
                Exam Routine: 
              </h2>
              
            </div>
            
            {/* table */}
            <div className="overflow-x-auto">
  <div className="w-full overflow-x-auto">
    <table className="min-w-full border border-gray-300">
      <thead className="bg-[#E5E7EB]">
        <tr>
          <th className="px-4 py-3 text-left text-xs font-bold text-[#333333] uppercase tracking-wider border border-gray-300">Subject</th>
          <th className="px-4 py-3 text-left text-xs font-bold text-[#333333] uppercase tracking-wider border border-gray-300">Date</th>
          <th className="px-4 py-3 text-left text-xs font-bold text-[#333333] uppercase tracking-wider border border-gray-300">Day</th>
          <th className="px-4 py-3 text-left text-xs font-bold text-[#333333] uppercase tracking-wider border border-gray-300">Room</th>
          <th className="px-4 py-3 text-left text-xs font-bold text-[#333333] uppercase tracking-wider border border-gray-300">Time</th>
          <th className="px-4 py-3 text-left text-xs font-bold text-[#333333] uppercase tracking-wider border border-gray-300">Marks</th>
          <th className="px-4 py-3 text-left text-xs font-bold text-[#333333] uppercase tracking-wider border border-gray-300">Summary</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {examRoutineData.map((routine) => (
          <tr key={routine.id} className="hover:bg-gray-50">
            <td className="px-4 py-3 min-w-[40px] whitespace-nowrap text-sm font-medium text-gray-900 border border-gray-300">
              {routine.subject}
            </td>
            <td className="px-4 py-3 whitespace-nowrap border border-gray-300">
              <input
                type="date"
                value={routine.date}
                onChange={(e) => handleTableEdit(routine.id, 'date', e.target.value)}
                className="min-w-[40px] px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </td>
            <td className="px-4 py-3 whitespace-nowrap border border-gray-300">
              <input
                type="text"
                value={routine.day}
                onChange={(e) => handleTableEdit(routine.id, 'day', e.target.value)}
                className="min-w-[40px] px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </td>
            <td className="px-4 py-3 whitespace-nowrap border border-gray-300">
              <input
                type="text"
                value={routine.room}
                onChange={(e) => handleTableEdit(routine.id, 'room', e.target.value)}
                className="min-w-[40px] px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </td>
            <td className="px-4 py-3 whitespace-nowrap border border-gray-300">
              <input
                type="time"
                value={routine.time}
                onChange={(e) => handleTableEdit(routine.id, 'time', e.target.value)}
                className="min-w-[40px] px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </td>
            <td className="px-4  py-3 whitespace-nowrap border border-gray-300">
              <input
                type="number"
                value={routine.marks}
                onChange={(e) => handleTableEdit(routine.id, 'marks', e.target.value)}
                className="min-w-[40px]  py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-center"
                required
              />
            </td>
            <td className="px-4 py-3 min-w-[40px] border border-gray-300">
              <textarea
                value={routine.summary}
                onChange={(e) => handleTableEdit(routine.id, 'summary', e.target.value)}
                className=" px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                rows="1"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  <div className="flex justify-end space-x-4 mt-6">
              <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
              <Button type="submit">Save Exam Routine</Button>
            </div>
          </div>
       
      </form>
    </div>
  );
};

export default CreateExamRoutine;