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
import { Edit, Trash, ArrowBigLeft, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { EnhancedDataTable } from "@/components/EnhancedDataTable";
import { Toaster, toast } from "sonner";

// Delete Confirmation Modal
const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, studentName }) => (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[300px]">
            <DialogHeader>
                <DialogTitle>Confirm Delete</DialogTitle>
            </DialogHeader>
            <div className="py-4">
                <p>Are you sure you want to delete the student &quot;{studentName}&quot;?</p>
            </div>
            <DialogFooter>
                <Button variant="outline" onClick={onClose}>Cancel</Button>
                <Button onClick={onConfirm}>Delete</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
);

export default function StudentAttendanceList() {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [students, setStudents] = useState([
        { id: 1, class: "10", session: "2024", date: "2024-07-19" },
        { id: 2, class: "10", session: "2023", date: "2023-09-10" },
    ]);

    const router = useRouter();

    const handleCreateAttendance = () => {
        router.push('/students/students-attendance/create');
    };

    const handleEditStudent = (student) => {
        router.push(`/students/students-attendance/edit?id=${student.id}`);
    };

    const handleDeleteStudent = (student) => {
        setSelectedStudent(student);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        setStudents(prev => prev.filter(s => s.id !== selectedStudent.id));
        toast.success(`Deleted student "${selectedStudent.name || selectedStudent.id}" successfully!`);
        setIsDeleteModalOpen(false);
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
            size: 100,
        },
        {
            accessorKey: "session",
            header: "Session",
            id: "session",
            size: 100,
        },
        {
            accessorKey: "date",
            header: "Date",
            id: "date",
            size: 150,
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
                        onClick={() => handleEditStudent(row.original)}
                    >
                        <Edit size={16} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:bg-red-700"
                        onClick={() => handleDeleteStudent(row.original)}
                    >
                        <Trash size={16} />
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
                    <p
                        className="cursor-pointer text-accent flex items-center gap-x-2 bg-gray-200 rounded-full"
                        onClick={() => router.back()}
                    >
                        <ArrowBigLeft size={40} />
                    </p>
                    <h1 className="text-2xl font-bold">Students Attendance</h1>
                </div>
                <Button
                    onClick={handleCreateAttendance}
                    className="flex items-center gap-x-2"
                >
                    <Plus size={16} /> Create Attendance
                </Button>
            </div>

            <EnhancedDataTable
                columns={columns}
                data={students}
                allowRowSelect={true}
            />

            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                studentName={selectedStudent?.id}
            />
        </div>
    );
}
