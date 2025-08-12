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

// Department Modal Component
const DepartmentModal = ({
    isOpen,
    onClose,
    mode,
    initialData,
    onSubmit
}) => {
    const [formData, setFormData] = useState({
        department_name: initialData?.department_name || ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        if (!formData.department_name) {
            toast.error('Please fill in all required fields');
            return;
        }

        const submissionData = initialData?.id
            ? { ...formData, id: initialData.id }
            : { ...formData, id: Date.now() }; // Temporary ID for new departments

        onSubmit(submissionData);
        toast.success(`${mode === 'create' ? 'Created' : 'Updated'} department successfully!`);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>
                        {mode === 'create' ? 'Create New Department' : 'Edit Department'}
                    </DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-8 items-center gap-2">
                        <Label htmlFor="department_name" className="col-span-4 pl-1">
                            Department Name <span className='text-red-500'>*</span>
                        </Label>
                        <Input
                            id="department_name"
                            name="department_name"
                            value={formData.department_name}
                            onChange={handleInputChange}
                            className="col-span-8"
                            placeholder="e.g., Mathematics"
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        onClick={handleSubmit}
                    >
                        {mode === 'create' ? 'Create' : 'Update'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

// Delete Confirmation Modal Component
const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, departmentName }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[300px]">
                <DialogHeader>
                    <DialogTitle>Confirm Delete</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <p>Are you sure you want to delete the department &quot;{departmentName}&quot;?</p>
                </div>
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                    <Button type="button" onClick={onConfirm}>Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

// Main Department Settings Component
export default function DepartmentSettingsComponent() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('create');
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [departments, setDepartments] = useState([
        { id: 1, department_name: "Mathematics" },
        { id: 2, department_name: "Science" },
        { id: 3, department_name: "Literature" },
        { id: 4, department_name: "History" },
    ]);

    const router = useRouter();

    const handleCreateDepartment = () => {
        setModalMode('create');
        setSelectedDepartment(null);
        setIsModalOpen(true);
    };

    const handleEditDepartment = (department) => {
        setModalMode('edit');
        setSelectedDepartment(department);
        setIsModalOpen(true);
    };

    const handleSubmitDepartment = (departmentData) => {
        if (modalMode === 'create') {
            setDepartments(prev => [...prev, departmentData]);
        } else {
            setDepartments(prev =>
                prev.map(department =>
                    department.id === departmentData.id ? departmentData : department
                )
            );
        }
    };

    const handleDeleteDepartment = (departmentToDelete) => {
        setSelectedDepartment(departmentToDelete);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        setDepartments(prev =>
            prev.filter(department => department.id !== selectedDepartment.id)
        );
        toast.success(`Deleted department "${selectedDepartment.department_name}" successfully!`);
        setIsDeleteModalOpen(false);
    };

    const columns = [
        {
            accessorKey: "sn",
            id: "sn",
            header: "SN",
            size: 50,
            cell: ({ row }) => row.index + 1,
        },
        {
            accessorKey: "department_name",
            id: "department_name",
            header: "Department",
            size: 200,
        },
        {
            header: "Action",
            id: "actions",
            cell: ({ row }) => (
                <div className="flex gap-x-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-500 hover:bg-blue-700"
                        onClick={() => handleEditDepartment(row.original)}
                    >
                        <Edit size={16}/>
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:bg-red-700"
                        onClick={() => handleDeleteDepartment(row.original)}
                    >
                        <Trash size={16}/>
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
                    <h1 className="text-2xl font-bold">Department Settings</h1>
                </div>

                <Button
                    onClick={handleCreateDepartment}
                    className="flex items-center gap-x-2"
                >
                    <Plus size={16} /> Create Department
                </Button>
            </div>

            <EnhancedDataTable
                columns={columns}
                data={departments}
                allowRowSelect={true}
            />

            <DepartmentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                mode={modalMode}
                initialData={selectedDepartment}
                onSubmit={handleSubmitDepartment}
            />

            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                departmentName={selectedDepartment?.department_name}
            />
        </div>
    );
}
