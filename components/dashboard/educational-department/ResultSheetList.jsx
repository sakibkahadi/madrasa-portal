"use client";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Eye, ArrowBigLeft, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { EnhancedDataTable } from "@/components/EnhancedDataTable";
import { Toaster, toast } from "sonner"; // Import Sonner for notifications

// Main Result Sheet List Component
export default function ResultSheetListComponent() {
    const [resultSheets, setResultSheets] = useState([
        { 
            id: 1, 
            studentName: "John Doe",
            registerName: "REG001",
            examName: "Final Exam",
            class: "Class 10",
            totalMarks: 850,
            examId: 101,
            studentId: 2001
        },
        { 
            id: 2, 
            studentName: "Jane Smith",
            registerName: "REG002",
            examName: "Mid Term Exam",
            class: "Class 9",
            totalMarks: 720,
            examId: 102,
            studentId: 2002
        },
        { 
            id: 3, 
            studentName: "Mike Johnson",
            registerName: "REG003",
            examName: "First Term Exam",
            class: "Class 10",
            totalMarks: 680,
            examId: 103,
            studentId: 2003
        },
        { 
            id: 4, 
            studentName: "Sarah Wilson",
            registerName: "REG004",
            examName: "Final Exam",
            class: "Class 8",
            totalMarks: 790,
            examId: 104,
            studentId: 2004
        },
        { 
            id: 5, 
            studentName: "David Brown",
            registerName: "REG005",
            examName: "Final Exam",
            class: "Class 9",
            totalMarks: 650,
            examId: 105,
            studentId: 2005
        },
        { 
            id: 6, 
            studentName: "Emma Davis",
            registerName: "REG006",
            examName: "Mid Term Exam",
            class: "Class 10",
            totalMarks: 780,
            examId: 106,
            studentId: 2006
        },
        // Add more initial result sheets as needed
    ]);

    const router = useRouter();

    const handleCreateResultSheet = () => {
        router.push('/educational-department/result-sheet/create');
    };

    const handleViewResultSheet = (resultSheet) => {
        const { examId, studentId } = resultSheet;
        
        // Check if examId and studentId exist
        if (!examId || !studentId) {
            toast.error("Missing exam ID or student ID");
            return;
        }
        
        router.push(`/educational-department/result-sheet/show/${studentId}`);
        toast.success(`Viewing result sheet for "${resultSheet.studentName} - ${resultSheet.examName}"`);
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
            accessorKey: "studentName",
            header: "Student",
            id: "studentName",
            size: 180,
        },
        {
            accessorKey: "registerName",
            header: "Reg No",
            id: "registerName",
            size: 150,
        },
        {
            accessorKey: "examName",
            header: "Exam ",
            id: "examName",
            size: 150,
        },
        {
            accessorKey: "class",
            header: "Class",
            id: "class",
            size: 120,
        },
        {
            accessorKey: "totalMarks",
            header: "Total Marks",
            id: "totalMarks",
            size: 120,
            cell: ({ row }) => (
                <span className="font-medium text-green-600">
                    {row.original.totalMarks}
                </span>
            ),
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
                        onClick={() => handleViewResultSheet(row.original)}
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
                    <h1 className="text-2xl font-bold">Result Sheet List</h1>
                </div>

                <Button
                    onClick={handleCreateResultSheet}
                    className="flex items-center gap-x-2"
                >
                    <Plus size={16} /> Create Result Sheet
                </Button>
            </div>

            <EnhancedDataTable
                columns={columns}
                data={resultSheets}
                allowRowSelect={true}
            />
        </div>
    );
}