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
const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, teacherName }) => (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[300px]">
            <DialogHeader>
                <DialogTitle>Confirm Delete</DialogTitle>
            </DialogHeader>
            <div className="py-4">
                <p>Are you sure you want to delete the teacher &quot;{teacherName}&quot;?</p>
            </div>
            <DialogFooter>
                <Button variant="outline" onClick={onClose}>Cancel</Button>
                <Button onClick={onConfirm}>Delete</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
);

export default function TeacherAttendanceList() {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [teachers, setTeachers] = useState([
        { id: 1,  date: "2024-07-19",teacher:1 },
        { id: 2,  date: "2023-09-10", teacher:3 },
    ]);

    const router = useRouter();

    const handleCreateAttendance = () => {
        router.push('/teachers/teachers-attendance/create');
    };

    const handleEditTeacher = (teacher) => {
        router.push(`/teachers/teachers-attendance/edit?id=${teacher.id}`);
    };

    const handleDeleteTeacher = (teacher) => {
        setSelectedTeacher(teacher);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        setTeachers(prev => prev.filter(s => s.id !== selectedTeacher.id));
        toast.success(`Deleted Teacher "${selectedTeacher.name || selectedTeacher.id}" successfully!`);
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
            accessorKey: "date",
            header: "Date",
            id: "date",
            size: 150,
        },
        {
            accessorKey: "teacher",
            header: "Teacher",
            id: "teacher",
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
                        onClick={() => handleEditTeacher(row.original)}
                    >
                        <Edit size={16} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:bg-red-700"
                        onClick={() => handleDeleteTeacher(row.original)}
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
                    <h1 className="text-2xl font-bold">Teachers Attendance</h1>
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
                data={teachers}
                allowRowSelect={true}
            />

            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                teacherName={selectedTeacher?.id}
            />
        </div>
    );
}
