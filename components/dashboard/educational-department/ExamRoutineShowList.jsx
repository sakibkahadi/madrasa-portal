"use client";
import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye, ArrowBigLeft, Edit, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { EnhancedDataTable } from "@/components/EnhancedDataTable";
import { Toaster, toast } from "sonner";

// Delete Confirmation Modal Component
const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, routineInfo }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[300px]">
                <DialogHeader>
                    <DialogTitle>Confirm Delete</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <p>Are you sure you want to delete the exam routine for &quot;{routineInfo?.class} - {routineInfo?.exam}&quot;?</p>
                </div>
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                    <Button type="button" onClick={onConfirm}>Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

// Exam Routine Show Component
export default function ExamRoutineShowList({ examId, sessionId }) {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedRoutine, setSelectedRoutine] = useState(null);
    const [examRoutines, setExamRoutines] = useState([
        { 
            id: 1, 
            class: "Class 1",
            session: "2025-2026", 
            sl: "A",
            exam: "Final Exam",
            examId: 101,
            sessionId: 1001,
            classId: 201
        },
        { 
            id: 2, 
            class: "Class 2",
            session: "2025-2026", 
            sl: "B",
            exam: "Final Exam",
            examId: 101,
            sessionId: 1001,
            classId: 202
        },
        { 
            id: 3, 
            class: "Class 3",
            session: "2025-2026", 
            sl: "A",
            exam: "Final Exam",
            examId: 101,
            sessionId: 1001,
            classId: 203
        },
        { 
            id: 4, 
            class: "Class 4",
            session: "2025-2026", 
            sl: "B",
            exam: "Final Exam",
            examId: 101,
            sessionId: 1001,
            classId: 204
        },
        { 
            id: 5, 
            class: "Class 5",
            session: "2025-2026", 
            sl: "A",
            exam: "Final Exam",
            examId: 101,
            sessionId: 1001,
            classId: 205
        },
        { 
            id: 6, 
            class: "Class 6",
            session: "2024-2025", 
            sl: "A",
            exam: "Final Exam",
            examId: 105,
            sessionId: 1002,
            classId: 206
        },
        { 
            id: 7, 
            class: "Class 7",
            session: "2024-2025", 
            sl: "B",
            exam: "Final Exam",
            examId: 105,
            sessionId: 1002,
            classId: 207
        },
    ]);

    const router = useRouter();

    // Filter routines based on examId and sessionId - convert to numbers for comparison
    const filteredRoutines = examRoutines.filter(
        routine => routine.examId === parseInt(examId) && routine.sessionId === parseInt(sessionId)
    );

    const handleViewExamRoutine = (examRoutine) => {
        const { examId, sessionId, classId } = examRoutine;
        
        if (!examId || !sessionId || !classId) {
            toast.error("Missing required IDs");
            return;
        }
        
        router.push(`/educational-department/exam-routine/show/${classId}`);
        toast.success(`Viewing routine for "${examRoutine.class} - ${examRoutine.exam}"`);
    };

    const handleEditExamRoutine = (examRoutine) => {
        const { examId, sessionId, classId } = examRoutine;
        
        if (!examId || !sessionId || !classId) {
            toast.error("Missing required IDs");
            return;
        }
        
        router.push(`/educational-department/exam-routine/edit`);
        toast.success(`Editing routine for "${examRoutine.class} - ${examRoutine.exam}"`);
    };

    const handleDeleteExamRoutine = (examRoutine) => {
        setSelectedRoutine(examRoutine);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (selectedRoutine) {
            setExamRoutines(prev => prev.filter(routine => routine.id !== selectedRoutine.id));
            toast.success(`Deleted routine for "${selectedRoutine.class} - ${selectedRoutine.exam}" successfully!`);
            setIsDeleteModalOpen(false);
            setSelectedRoutine(null);
        }
    };

    const handleCloseModal = () => {
        setIsDeleteModalOpen(false);
        setSelectedRoutine(null);
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
            accessorKey: "class",
            header: "Class",
            id: "class",
            size: 120,
        },
        {
            accessorKey: "session",
            header: "Session",
            id: "session",
            size: 130,
        },
        {
            accessorKey: "sl",
            header: "SL",
            id: "sl",
            size: 80,
        },
        {
            accessorKey: "exam",
            header: "Exam",
            id: "exam",
            size: 150,
        },
        {
            header: "Action",
            size: 180,
            id: "actions",
            cell: ({ row }) => (
                <div className="flex gap-x-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-500 hover:bg-blue-700"
                        onClick={() => handleViewExamRoutine(row.original)}
                    >
                        <Eye size={16} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-green-500 hover:bg-green-700"
                        onClick={() => handleEditExamRoutine(row.original)}
                    >
                        <Edit size={16} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:bg-red-700"
                        onClick={() => handleDeleteExamRoutine(row.original)}
                    >
                        <Trash size={16} />
                    </Button>
                </div>
            ),
        },
    ];

    // Get exam and session info from first routine (they should all be the same)
    const examInfo = filteredRoutines.length > 0 ? filteredRoutines[0] : null;

    return (
        <div className="p-5">
            <Toaster />
            <div className="mb-4 flex justify-between items-center">
                <div className="flex items-center gap-x-4">
                    <div>
                        <p
                            className="cursor-pointer text-accent flex items-center gap-x-2 bg-gray-200 rounded-full"
                            onClick={() => {
                                router.back();
                            }}
                        >
                            <ArrowBigLeft size={40} />
                        </p>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">Exam Routine Details</h1>
                       
                    </div>
                </div>
            </div>

            {filteredRoutines.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-500">No exam routines found for this exam and session.</p>
                </div>
            ) : (
                <EnhancedDataTable
                    columns={columns}
                    data={filteredRoutines}
                    allowRowSelect={true}
                />
            )}

            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={handleCloseModal}
                onConfirm={confirmDelete}
                routineInfo={selectedRoutine}
            />
        </div>
    );
}