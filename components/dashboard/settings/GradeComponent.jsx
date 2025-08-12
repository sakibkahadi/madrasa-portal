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

// Grade Modal Component
const GradeModal = ({
    isOpen,
    onClose,
    mode,
    initialData,
    onSubmit,
    categories,
    statuses
}) => {
    const [formData, setFormData] = useState({
        grade_name: initialData?.grade_name || '',
        category_name: initialData?.category_name || '',
        grade_point: initialData?.grade_point || '',
        mark_from: initialData?.mark_from || '',
        mark_upto: initialData?.mark_upto || '',
        comment: initialData?.comment || '',
        status: initialData?.status || ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        if (!formData.grade_name || !formData.category_name || !formData.grade_point || !formData.mark_from || !formData.mark_upto) {
            toast.error('Please fill in all required fields');
            return;
        }

        const submissionData = initialData?.id
            ? { ...formData, id: initialData.id }
            : { ...formData, id: Date.now() }; // Temporary ID for new grades

        onSubmit(submissionData);
        toast.success(`${mode === 'create' ? 'Created' : 'Updated'} grade successfully!`);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[525px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {mode === 'create' ? 'Create New Grade' : 'Edit Grade'}
                    </DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    {/* Grade Name */}
                    <div className="grid grid-cols-8 items-center gap-2">
                        <Label htmlFor="grade_name" className="col-span-4 pl-1">
                            Grade Name <span className='text-red-500'>*</span>
                        </Label>
                        <Input
                            id="grade_name"
                            name="grade_name"
                            value={formData.grade_name}
                            onChange={handleInputChange}
                            className="col-span-8"
                            placeholder="e.g., A+"
                        />
                    </div>

                    {/* Category Name */}
                    <div className="grid grid-cols-8 items-center gap-2">
                        <Label htmlFor="category_name" className="col-span-4 pl-1">
                            Category Name <span className='text-red-500'>*</span>
                        </Label>
                        <Input
                            id="category_name"
                            name="category_name"
                            value={formData.category_name}
                            onChange={handleInputChange}
                            className="col-span-8"
                            placeholder="e.g., Academic"
                        />
                    </div>

                    {/* Select Grade Category */}
                    <div className="grid grid-cols-8 items-center gap-2">
                        <Label htmlFor="grade_category" className="col-span-4 pl-1">
                            Select Grade Category <span className='text-red-500'>*</span>
                        </Label>
                        <select
                            id="grade_category"
                            name="category_name"
                            value={formData.category_name}
                            onChange={handleInputChange}
                            className="col-span-8 border rounded-md p-2"
                        >
                            <option value="">Select Category</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.name}>{category.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Grade Point */}
                    <div className="grid grid-cols-8 items-center gap-2">
                        <Label htmlFor="grade_point" className="col-span-4 pl-1">
                            Grade Point <span className='text-red-500'>*</span>
                        </Label>
                        <Input
                            id="grade_point"
                            name="grade_point"
                            type="number"
                            value={formData.grade_point}
                            onChange={handleInputChange}
                            className="col-span-8"
                            placeholder="e.g., 4.0"
                        />
                    </div>

                    {/* Mark From */}
                    <div className="grid grid-cols-8 items-center gap-2">
                        <Label htmlFor="mark_from" className="col-span-4 pl-1">
                            Mark From <span className='text-red-500'>*</span>
                        </Label>
                        <Input
                            id="mark_from"
                            name="mark_from"
                            type="number"
                            value={formData.mark_from}
                            onChange={handleInputChange}
                            className="col-span-8"
                            placeholder="e.g., 85"
                        />
                    </div>

                    {/* Mark Upto */}
                    <div className="grid grid-cols-8 items-center gap-2">
                        <Label htmlFor="mark_upto" className="col-span-4 pl-1">
                            Mark Upto <span className='text-red-500'>*</span>
                        </Label>
                        <Input
                            id="mark_upto"
                            name="mark_upto"
                            type="number"
                            value={formData.mark_upto}
                            onChange={handleInputChange}
                            className="col-span-8"
                            placeholder="e.g., 100"
                        />
                    </div>

                    {/* Comment */}
                    <div className="grid grid-cols-8 items-center gap-2">
                        <Label htmlFor="comment" className="col-span-4 pl-1">
                            Comment
                        </Label>
                        <Input
                            id="comment"
                            name="comment"
                            value={formData.comment}
                            onChange={handleInputChange}
                            className="col-span-8"
                            placeholder="Optional comments"
                        />
                    </div>

                    {/* Status */}
                    <div className="grid grid-cols-8 items-center gap-2">
                        <Label htmlFor="status" className="col-span-4 pl-1">
                            Status <span className='text-red-500'>*</span>
                        </Label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                            className="col-span-8 border rounded-md p-2"
                        >
                            <option value="">Select Status</option>
                            {statuses.map(status => (
                                <option key={status.id} value={status.name}>{status.name}</option>
                            ))}
                        </select>
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
const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, gradeName }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[300px]">
                <DialogHeader>
                    <DialogTitle>Confirm Delete</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <p>Are you sure you want to delete the grade &quot;{gradeName}&quot;?</p>
                </div>
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                    <Button type="button" onClick={onConfirm}>Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

// Main Grade Settings Component
export default function GradeComponent() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('create');
    const [selectedGrade, setSelectedGrade] = useState(null);
    const [grades, setGrades] = useState([
        { id: 1, grade_name: "A+", category_name: "Academic", grade_point: 4.0, mark_from: 85, mark_upto: 100, comment: "Excellent", status: "Active" },
        { id: 2, grade_name: "B", category_name: "Academic", grade_point: 3.0, mark_from: 70, mark_upto: 84, comment: "Great", status: "Active" },
        // Add more initial grades as needed
    ]);

    const categories = [
        { id: 1, name: "Academic" },
        { id: 2, name: "Extracurricular" },
        // Add more categories as needed
    ];

    const statuses = [
        { id: 1, name: "Active" },
        { id: 2, name: "Inactive" },
        // Add more statuses as needed
    ];

    const router = useRouter();

    const handleCreateGrade = () => {
        setModalMode('create');
        setSelectedGrade(null);
        setIsModalOpen(true);
    };

    const handleEditGrade = (grade) => {
        setModalMode('edit');
        setSelectedGrade(grade);
        setIsModalOpen(true);
    };

    const handleSubmitGrade = (gradeData) => {
        if (modalMode === 'create') {
            setGrades(prev => [...prev, gradeData]);
        } else {
            setGrades(prev =>
                prev.map(grade =>
                    grade.id === gradeData.id ? gradeData : grade
                )
            );
        }
    };

    const handleDeleteGrade = (gradeToDelete) => {
        setSelectedGrade(gradeToDelete);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        setGrades(prev =>
            prev.filter(grade => grade.id !== selectedGrade.id)
        );
        toast.success(`Deleted grade "${selectedGrade.grade_name}" successfully!`);
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
            accessorKey: "grade_name",
            header: "Grade Name",
            id: "grade_name",
            size: 150,
        },
        {
            accessorKey: "category_name",
            header: "Category Name",
            id: "category_name",
            size: 200,
        },
        {
            accessorKey: "grade_point",
            header: "Grade Point",
            id: "grade_point",
            size: 150,
        },
        {
            accessorKey: "mark_from",
            header: "Mark From",
            id: "mark_from",
            size: 150,
        },
        {
            accessorKey: "mark_upto",
            header: "Mark Upto",
            id: "mark_upto",
            size: 150,
        },
        {
            accessorKey: "comment",
            header: "Comment",
            id: "comment",
            size: 150,
        },
        {
            accessorKey: "status",
            header: "Status",
            id: "status",
            size: 150,
        },
        {
            header: "Action",
            id: "actions",
            size: 220,
            cell: ({ row }) => (
                <div className="flex gap-x-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-500 hover:bg-blue-700"
                        onClick={() => handleEditGrade(row.original)}
                    >
                        <Edit size={16}/>
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:bg-red-700"
                        onClick={() => handleDeleteGrade(row.original)}
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
                    <h1 className="text-2xl font-bold">Grade Settings</h1>
                </div>

                <Button
                    onClick={handleCreateGrade}
                    className="flex items-center gap-x-2"
                >
                    <Plus size={16} /> Create Grade
                </Button>
            </div>

            <EnhancedDataTable
                columns={columns}
                data={grades}
                allowRowSelect={true}
            />

            <GradeModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                mode={modalMode}
                initialData={selectedGrade}
                onSubmit={handleSubmitGrade}
                categories={categories}
                statuses={statuses}
            />

            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                gradeName={selectedGrade?.grade_name}
            />
        </div>
    );
}
