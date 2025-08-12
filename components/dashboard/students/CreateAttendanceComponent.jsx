"use client";
import React, { useState } from 'react';
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
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from 'next/navigation';

const students = [
  { id: 1, name: "John Doe", regNo: "REG001" },
  { id: 2, name: "Jane Smith", regNo: "REG002" },
];

const CreateAttendanceComponent = ({ initialData = {} }) => {
  const [formData, setFormData] = useState({
    class: initialData?.class || '',
    session: initialData?.session || '',
    date: initialData?.date ? new Date(initialData.date) : null,
  });

  const [showTable, setShowTable] = useState(false);
  const [attendanceData, setAttendanceData] = useState(() =>
    students.map(student => ({ ...student, status: "Half Day" }))
  );

  const router = useRouter();

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAttendanceChange = (id, status) => {
    setAttendanceData(prev =>
      prev.map(student =>
        student.id === id ? { ...student, status } : student
      )
    );
  };

  const handleFindClick = () => {
    toast.success("Data loaded");
    setShowTable(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Attendance:", attendanceData);
    toast.success("Attendance submitted successfully!");
  };

  const isFindEnabled = formData.class && formData.session && formData.date;

  return (
    <div className="container mx-auto p-6">
      <Toaster />
      <h1 className="text-3xl font-bold mb-6">
        {initialData?.id ? 'Edit Student Attendance' : 'Create Student Attendance'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white shadow-md rounded-lg sm:p-6 flex flex-col md:flex-row gap-5 items-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:w-[95%]">
            <div>
              <Label>Class <span className='text-red-500'>*</span></Label>
              <Select value={formData.class} onValueChange={val => handleSelectChange('class', val)}>
                <SelectTrigger><SelectValue placeholder="Select Class" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="11">11</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Session <span className='text-red-500'>*</span></Label>
              <Select value={formData.session} onValueChange={val => handleSelectChange('session', val)}>
                <SelectTrigger><SelectValue placeholder="Select Session" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-[10px]">
              <Label>Date <span className='text-red-500'>*</span></Label>
              <DatePicker
                selected={formData.date}
                onChange={(date) => setFormData(prev => ({ ...prev, date }))}
                className="w-full border rounded-md p-2 text-sm"
                placeholderText="Select Date"
              />
            </div>
          </div>

          <div className="sm:mt-[22px] py-4 sm:py-0 md:w-[5%]">
            <Button type="button" onClick={handleFindClick} disabled={!isFindEnabled}>Find</Button>
          </div>
        </div>

        {showTable && (
          <div className="mt-6">
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border">SL</th>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Register No</th>
                  <th className="p-2 border">Attendance</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((student, index) => (
                  <tr key={student.id} className="text-center">
                    <td className="border p-2">{index + 1}</td>
                    <td className="border p-2">{student.name}</td>
                    <td className="border p-2">{student.regNo}</td>
                    <td className="border p-2">
                      {['Present', 'Absent', 'Late', 'Leave', 'Half Day'].map(option => (
                        <label key={option} className={`mr-2 `}>
                          <input
                            type="radio"
                            name={`attendance-${student.id}`}
                            value={option}
                            checked={student.status === option}
                            onChange={() => handleAttendanceChange(student.id, option)}
                            className="mr-1"
                          />
                          {option}
                        </label>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

               <div className="flex justify-end space-x-4 mt-6">
          <Button type="button" variant="outline" onClick={()=>router.back()}>Cancel</Button>
          <Button type="submit">Save</Button>
        </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateAttendanceComponent;
