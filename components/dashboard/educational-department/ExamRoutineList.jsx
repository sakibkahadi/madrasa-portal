"use client";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Eye, ArrowBigLeft, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { EnhancedDataTable } from "@/components/EnhancedDataTable";
import { Toaster, toast } from "sonner"; // Import Sonner for notifications

// Main Exam Routine List Component
export default function ExamRoutineListComponent() {
    const [examRoutines, setExamRoutines] = useState([
        { 
            id: 1, 
            session: "2025-2026", 
            exam: "Final Exam",
            examId: 101,
            sessionId: 1001
        },
        { 
            id: 2, 
            session: "2024-2025", 
            exam: "Mid Term Exam",
            examId: 102,
            sessionId: 1002
        },
        { 
            id: 3, 
            session: "2025-2026", 
            exam: "First Term Exam",
            examId: 103,
            sessionId: 1001
        },
        { 
            id: 4, 
            session: "2025-2026", 
            exam: "Final Exam",
            examId: 104,
            sessionId: 1001
        },
        { 
            id: 5, 
            session: "2024-2025", 
            exam: "Final Exam",
            examId: 105,
            sessionId: 1002
        },
        // Add more initial exam routines as needed
    ]);

    const router = useRouter();

    const handleCreateExamRoutine = () => {
        router.push('/educational-department/exam-routine/create');
    };

    const handleViewExamRoutine = (examRoutine) => {
        const { examId, sessionId } = examRoutine;
        
        // Check if examId and sessionId exist
        if (!examId || !sessionId) {
            toast.error("Missing exam ID or session ID");
            return;
        }
        
        router.push(`/educational-department/exam-routine/show/exam/${examId}/session/${sessionId}`);
        toast.success(`Viewing exam routine for "${examRoutine.session} - ${examRoutine.exam}"`);
    };

    const columns = [
        {
            accessorKey: "sn",
            header: "SN",
            id: "sn",
            size: 50,
            cell: ({ row }) => row.index + 1,
        },
        {
            accessorKey: "session",
            header: "Session",
            id: "session",
            size: 150,
        },
        {
            accessorKey: "exam",
            header: "Exam",
            id: "exam",
            size: 200,
        },
        {
            header: "Action",
            size: 120,
            id: "actions",
            cell: ({ row }) => (
                <div className="flex gap-x-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-500 hover:bg-blue-700"
                        onClick={() => handleViewExamRoutine(row.original)}
                    >
                        <Eye size={16} /> View
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className="p-5">
            <Toaster />
            <div className="mb-4 flex justify-between items-center">
                <div className="flex items-center gap-x-4">
                    <div>
                        <p
                            className="cursor-pointer text-accent  flex items-center gap-x-2 bg-gray-200 rounded-full"
                            onClick={() => {
                                router.back();
                            }}
                        >
                            <ArrowBigLeft size={40} />
                        </p>
                    </div>
                    <h1 className="text-2xl font-bold">Exam Routine List</h1>
                </div>

                <Button
                    onClick={handleCreateExamRoutine}
                    className="flex items-center gap-x-2"
                >
                    <Plus size={16} /> Create Exam Routine
                </Button>
            </div>

            <EnhancedDataTable
                columns={columns}
                data={examRoutines}
                allowRowSelect={true}
            />
        </div>
    );
}