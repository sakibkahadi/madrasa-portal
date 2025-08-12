"use client";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowBigLeft, Edit, Calendar, Clock, MapPin, BookOpen, Target } from "lucide-react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";

// Complete exam routine data - same as in other components
const examRoutineData = [
  {
    id: 1,
    examId: 103,
    sessionId: 1003,
    classId: 1,
    class: "Class 6A",
    session: "2025-2026",
    exam: "Final Exam",
    sl: "A",
    routineData: [
      {
        id: 1,
        subject: "Mathematics",
        date: "2025-12-01",
        day: "Monday",
        room: "Room 101",
        time: "09:00",
        marks: "100",
        summary: "Algebra and Geometry"
      },
      {
        id: 2,
        subject: "English",
        date: "2025-12-03",
        day: "Wednesday",
        room: "Room 102",
        time: "09:00",
        marks: "100",
        summary: "Grammar and Literature"
      },
      {
        id: 3,
        subject: "Science",
        date: "2025-12-05",
        day: "Friday",
        room: "Room 103",
        time: "09:00",
        marks: "100",
        summary: "Physics and Chemistry basics"
      }
    ]
  },
  {
    id: 2,
    examId: 103,
    sessionId: 1003,
    classId: 2,
    class: "Class 6B",
    session: "2025-2026",
    exam: "Final Exam",
    sl: "B",
    routineData: [
      {
        id: 1,
        subject: "Mathematics",
        date: "2025-12-02",
        day: "Tuesday",
        room: "Room 201",
        time: "10:00",
        marks: "100",
        summary: "Basic Algebra"
      },
      {
        id: 2,
        subject: "English",
        date: "2025-12-04",
        day: "Thursday",
        room: "Room 202",
        time: "10:00",
        marks: "100",
        summary: "Reading and Writing"
      },
      {
        id: 3,
        subject: "Science",
        date: "2025-12-06",
        day: "Saturday",
        room: "Room 203",
        time: "10:00",
        marks: "100",
        summary: "General Science"
      },
      {
        id: 4,
        subject: "Social Studies",
        date: "2025-12-08",
        day: "Monday",
        room: "Room 204",
        time: "10:00",
        marks: "50",
        summary: "History and Geography"
      }
    ]
  },
  {
    id: 3,
    examId: 102,
    sessionId: 1003,
    classId: 5,
    class: "Class 8A",
    session: "2025-2026",
    exam: "Mid Term Exam",
    sl: "A",
    routineData: [
      {
        id: 1,
        subject: "Mathematics",
        date: "2025-08-15",
        day: "Friday",
        room: "Room 301",
        time: "09:00",
        marks: "80",
        summary: "Quadratic Equations"
      },
      {
        id: 2,
        subject: "English",
        date: "2025-08-17",
        day: "Sunday",
        room: "Room 302",
        time: "09:00",
        marks: "80",
        summary: "Essay and Comprehension"
      },
      {
        id: 3,
        subject: "Physics",
        date: "2025-08-19",
        day: "Tuesday",
        room: "Lab 1",
        time: "09:00",
        marks: "80",
        summary: "Motion and Force"
      },
      {
        id: 4,
        subject: "Chemistry",
        date: "2025-08-21",
        day: "Thursday",
        room: "Lab 2",
        time: "09:00",
        marks: "80",
        summary: "Acids and Bases"
      },
      {
        id: 5,
        subject: "Biology",
        date: "2025-08-23",
        day: "Saturday",
        room: "Lab 3",
        time: "09:00",
        marks: "80",
        summary: "Cell Structure"
      }
    ]
  }
];

// Exam Routine Detail View Component
export default function ExamRoutineViewDetail({ examId, sessionId, classId }) {
    const router = useRouter();

    // Find the specific routine data
    const routineData = examRoutineData.find(
        routine => 
            routine.examId === parseInt(examId) && 
            routine.sessionId === parseInt(sessionId) && 
            routine.classId === parseInt(classId)
    );

    const handleEdit = () => {
        if (!routineData) {
            toast.error("Routine data not found");
            return;
        }
        
        router.push(`/educational-department/exam-routine/edit/exam/${examId}/session/${sessionId}/class/${classId}`);
        toast.success("Redirecting to edit mode");
    };

    const handleGoBack = () => {
        router.push(`/educational-department/exam-routine/show/exam/${examId}/session/${sessionId}`);
        toast.info("Going back to exam routine list");
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatTime = (timeString) => {
        const [hours, minutes] = timeString.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minutes} ${ampm}`;
    };

    if (!routineData) {
        return (
            <div className="p-5">
                <Toaster />
                <div className="text-center py-12">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Routine Not Found</h1>
                    <p className="text-gray-600 mb-6">
                        The requested exam routine could not be found.
                    </p>
                    <Button onClick={() => router.back()}>
                        Go Back
                    </Button>
                </div>
            </div>
        );
    }

    const totalMarks = routineData.routineData.reduce((sum, item) => sum + parseInt(item.marks), 0);

    return (
        <div className="p-5">
            <Toaster />
            
            {/* Header */}
            <div className="mb-6 flex justify-between items-center">
                <div className="flex items-center gap-x-4">
                    <button
                        className="cursor-pointer text-accent flex items-center gap-x-2 bg-gray-200 hover:bg-gray-300 rounded-full p-1 transition-colors"
                        onClick={handleGoBack}
                    >
                        <ArrowBigLeft size={40} />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Exam Routine Details</h1>
                        <p className="text-gray-600 font-medium">
                            {routineData.class} - {routineData.session} - {routineData.exam}
                        </p>
                    </div>
                </div>
                
                <Button
                    onClick={handleEdit}
                    className="flex items-center gap-x-2 bg-green-600 hover:bg-green-700"
                >
                    <Edit size={16} /> Edit Routine
                </Button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold text-blue-800">Total Subjects</h3>
                            <p className="text-2xl font-bold text-blue-600">{routineData.routineData.length}</p>
                        </div>
                        <BookOpen className="text-blue-400" size={24} />
                    </div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold text-green-800">Total Marks</h3>
                            <p className="text-2xl font-bold text-green-600">{totalMarks}</p>
                        </div>
                        <Target className="text-green-400" size={24} />
                    </div>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold text-purple-800">Exam Days</h3>
                            <p className="text-2xl font-bold text-purple-600">
                                {new Set(routineData.routineData.map(r => r.date)).size}
                            </p>
                        </div>
                        <Calendar className="text-purple-400" size={24} />
                    </div>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold text-orange-800">Unique Rooms</h3>
                            <p className="text-2xl font-bold text-orange-600">
                                {new Set(routineData.routineData.map(r => r.room)).size}
                            </p>
                        </div>
                        <MapPin className="text-orange-400" size={24} />
                    </div>
                </div>
            </div>

            {/* Detailed Schedule */}
            <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-4 border-b bg-gray-50">
                    <h2 className="text-lg font-semibold text-gray-700">Exam Schedule</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Detailed subject-wise exam schedule for {routineData.class}
                    </p>
                </div>
                
                <div className="divide-y divide-gray-200">
                    {routineData.routineData
                        .sort((a, b) => new Date(a.date) - new Date(b.date))
                        .map((item, index) => (
                        <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold">
                                            {index + 1}
                                        </span>
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {item.subject}
                                        </h3>
                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            {item.marks} marks
                                        </span>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                                        <div className="flex items-center text-gray-600">
                                            <Calendar size={16} className="mr-2 text-gray-400" />
                                            <div>
                                                <p className="font-medium">{formatDate(item.date)}</p>
                                                <p className="text-sm text-gray-500">{item.day}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center text-gray-600">
                                            <Clock size={16} className="mr-2 text-gray-400" />
                                            <div>
                                                <p className="font-medium">{formatTime(item.time)}</p>
                                                <p className="text-sm text-gray-500">Start time</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center text-gray-600">
                                            <MapPin size={16} className="mr-2 text-gray-400" />
                                            <div>
                                                <p className="font-medium">{item.room}</p>
                                                <p className="text-sm text-gray-500">Exam venue</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {item.summary && (
                                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                                            <p className="text-sm text-gray-700">
                                                <span className="font-medium">Exam Coverage:</span> {item.summary}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Print/Export Actions */}
            <div className="mt-6 flex justify-center gap-4">
                <Button variant="outline" onClick={() => window.print()}>
                    Print Schedule
                </Button>
                <Button variant="outline" onClick={() => toast.info("Export functionality coming soon")}>
                    Export as PDF
                </Button>
            </div>
        </div>
    );
}