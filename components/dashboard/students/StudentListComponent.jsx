"use client";
import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Edit, Trash, ArrowBigLeft, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { EnhancedDataTable } from "@/components/EnhancedDataTable";
import { Toaster, toast } from "sonner"; // Import Sonner for notifications

// Delete Confirmation Modal Component
const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, studentName }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[300px]">
                <DialogHeader>
                    <DialogTitle>Confirm Delete</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <p>Are you sure you want to delete the student &quot;{studentName}&quot;?</p>
                </div>
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                    <Button type="button" onClick={onConfirm}>Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

// Main Student List Component
export default function StudentListComponent() {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [students, setStudents] = useState([
        { id: 1, register_no: "REG001", name: "John Doe", class: "10", department: "Science", roll: 1, type: "Regular", admission_type: "New", phone: "1234567890", year: 2023 },
        { id: 2, register_no: "REG002", name: "Jane Smith", class: "10", department: "Commerce", roll: 2, type: "Regular", admission_type: "Transfer", phone: "0987654321", year: 2023 },
        // Add more initial students as needed
    ]);

    const router = useRouter();

    const handleCreateStudent = () => {
        router.push('/students/students-list/create');
    };

    const handleEditStudent = (student) => {
        router.push(`/students/students-list/edit?id=${student.id}`);
    };

    const handleDeleteStudent = (studentToDelete) => {
        setSelectedStudent(studentToDelete);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        setStudents(prev =>
            prev.filter(student => student.id !== selectedStudent.id)
        );
        toast.success(`Deleted student "${selectedStudent.name}" successfully!`);
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
            accessorKey: "register_no",
            header: "Register No",
            id: "register_no",
            size: 130,
        },
        {
            accessorKey: "name",
            header: "Name",
            id: "name",
            size: 150,
        },
        {
            accessorKey: "class",
            header: "Class",
            id: "class",
            size: 100,
        },
        // {
        //     accessorKey: "department",
        //     header: "Department",
        //     id: "department",
        //     size: 150,
        // },
        // {
        //     accessorKey: "roll",
        //     header: "Student Roll",
        //     id: "roll",
        //     size: 150,
        // },
        {
            accessorKey: "type",
            header: "Student Type",
            id: "type",
            size: 150,
        },
        {
            accessorKey: "admission_type",
            header: "Admission Type",
            id: "admission_type",
            size: 170,
        },
        // {
        //     accessorKey: "phone",
        //     header: "Phone",
        //     id: "phone",
        //     size: 150,
        // },
        // {
        //     accessorKey: "year",
        //     header: "Year",
        //     id: "year",
        //     size: 100,
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
                    <h1 className="text-2xl font-bold">Student List</h1>
                </div>

                <Button
                    onClick={handleCreateStudent}
                    className="flex items-center gap-x-2"
                >
                    <Plus size={16} /> Create Student
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
                studentName={selectedStudent?.name}
            />
        </div>
    );
}
