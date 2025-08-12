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
import { Toaster, toast } from "sonner"; // Import Sonner for notifications

// Delete Confirmation Modal Component
const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, teacherName }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[300px]">
                <DialogHeader>
                    <DialogTitle>Confirm Delete</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <p>Are you sure you want to delete the teacher &quot;{teacherName}&quot;?</p>
                </div>
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                    <Button type="button" onClick={onConfirm}>Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

// Main Teachers List Component
export default function TeachersListComponent() {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [teachers, setTeachers] = useState([
        { id: 1, name: "Alice Johnson", designation: "Math Teacher", salary: 50000, phone: "1234567890", className: "10A", department: "Mathematics", verified: true, status: "Active", subjectName: "Algebra" },
        { id: 2, name: "Bob Smith", designation: "Science Teacher", salary: 55000, phone: "0987654321", className: "10B", department: "Science", verified: false, status: "Inactive", subjectName: "Biology" },
        // Add more initial teachers as needed
    ]);

    const router = useRouter();

    const handleCreateTeacher = () => {
        router.push('/teachers/teachers-list/create');
    };

    const handleEditTeacher = (teacher) => {
        router.push(`/teachers/teachers-list/edit?id=${teacher.id}`);
    };

    const handleDeleteTeacher = (teacherToDelete) => {
        setSelectedTeacher(teacherToDelete);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        setTeachers(prev =>
            prev.filter(teacher => teacher.id !== selectedTeacher.id)
        );
        toast.success(`Deleted teacher "${selectedTeacher.name}" successfully!`);
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
            accessorKey: "name",
            header: "Name",
            id: "name",
            size: 150,
        },
        {
            accessorKey: "designation",
            header: "Designation",
            id: "designation",
            size: 150,
        },
        {
            accessorKey: "salary",
            header: "Salary",
            id: "salary",
            size: 100,
        },
        {
            accessorKey: "phone",
            header: "Phone",
            id: "phone",
            size: 120,
        },
        // {
        //     accessorKey: "className",
        //     header: "Class Name",
        //     id: "className",
        //     size: 150,
        // },
        // {
        //     accessorKey: "department",
        //     header: "Department",
        //     id: "department",
        //     size: 150,
        // },
        // {
        //     accessorKey: "verified",
        //     header: "Verified",
        //     id: "verified",
        //     size: 100,
        //     cell: ({ row }) => (row.original.verified ? "Yes" : "No"),
        // },
        // {
        //     accessorKey: "status",
        //     header: "Status",
        //     id: "status",
        //     size: 100,
        // },
        // {
        //     accessorKey: "subjectName",
        //     header: "Subject Name",
        //     id: "subjectName",
        //     size: 150,
        // },
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
                    <h1 className="text-2xl font-bold">Teachers List</h1>
                </div>

                <Button
                    onClick={handleCreateTeacher}
                    className="flex items-center gap-x-2"
                >
                    <Plus size={16} /> Create Teacher
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
                teacherName={selectedTeacher?.name}
            />
        </div>
    );
}
