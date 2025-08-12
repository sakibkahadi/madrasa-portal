"use client";
import CommonButton from "@/components/CommonButton";
import { EnhancedDataTable } from "@/components/EnhancedDataTable";
import { ArrowBigLeft, Edit, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Toaster, toast } from "sonner"; // Import Sonner for notifications
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"; // Import Dialog components
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MultiSelect } from "@/components/ui/multi-select";

// Session Modal Component
const SessionModal = ({ isOpen, onClose, mode, initialData, onSubmit }) => {
    const [formData, setFormData] = useState({
        class_name: initialData?.class_name || '',
        subject_names: initialData?.subject_names || [],
        departments: initialData?.departments || [],
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSelectChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        if (!formData.class_name || formData.subject_names.length === 0 || formData.departments.length === 0) {
            toast.error('Please fill in all required fields');
            return;
        }

        const submissionData = initialData?.id
            ? { ...formData, id: initialData.id }
            : { ...formData, id: Date.now() }; // Temporary ID for new sessions

        onSubmit(submissionData);
        toast.success(`${mode === 'create' ? 'Created' : 'Updated'} exam successfully!`);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px] w-[95%] sm:w-full rounded-lg">
                <DialogHeader>
                    <DialogTitle>{mode === "create" ? "Create New Section" : "Edit Section"}</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-8 items-center gap-2">
                        <Label htmlFor="class_name" className="col-span-4 pl-1">Class Name <span className="text-red-500">*</span></Label>
                        <Input
                            id="class_name"
                            name="class_name"
                            value={formData.class_name}
                            onChange={handleInputChange}
                            className="col-span-8 shadow-md"
                            placeholder="e.g., One"
                        />
                    </div>

                    <div className="grid grid-cols-8 items-center gap-2">
                        <Label htmlFor="subject_names" className="col-span-4 pl-1">Subject Name <span className="text-red-500">*</span></Label>
                        <MultiSelect
                            id="subject_names"
                            name="subject_names"
                            options={[
                                { label: "Bangla", value: "Bangla" },
                                { label: "English", value: "English" },
                                { label: "Math", value: "Math" },
                                { label: "Social", value: "Social" },
                                { label: "Science", value: "Science" },
                            ]}
                            value={formData.subject_names}
                            onValueChange={(value) => handleSelectChange('subject_names', value)}
                            className="col-span-8"
                            placeholder="Select subjects"
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-2">
                        <Label htmlFor="departments"  className="col-span-4 pl-1">Department <span className="text-red-500">*</span></Label>
                        <MultiSelect
                            id="departments"
                            name="departments"
                            options={[
                                { label: "Morning shift", value: "Morning shift" },
                                { label: "Day shift", value: "Day shift" },
                            ]}
                            value={formData.departments}
                            onValueChange={(value) => handleSelectChange('departments', value)}
                            className="col-span-8"
                            placeholder="Select departments"
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                    <Button type="submit" onClick={handleSubmit}>{mode === "create" ? "Create" : "Update"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

// Delete Confirmation Modal Component
const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, sectionName }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[300px]">
                <DialogHeader>
                    <DialogTitle>Confirm Delete</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <p>Are you sure you want to delete the exam &quot;{sectionName}&quot;?</p>
                </div>

                <DialogFooter>
                    <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                    <Button type="button" onClick={onConfirm}>Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default function ClassComponent() {
    const [viewMode, setViewMode] = useState(null);
    const [selectedSessionItem, setSelectedSessionItem] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);
    const router = useRouter();

    // Dummy data for the table
    const data = [
        { id: 1, class_name: "One", subject_names: "Bangla, English, Math, Social, Science", departments: "Morning shift, Day shift" },
        { id: 2, class_name: "Two", subject_names: "Bangla, English, Math, Social, Science", departments: "Morning shift, Day shift" },
        { id: 3, class_name: "Three", subject_names: "Bangla, English, Math, Social, Science", departments: "Morning shift, Day shift" },
    ];

    const columns = [
        {
            id: "sn", // Explicitly set the id
            accessorKey: "sn",
            header: "SN",
            size: 50,
            cell: ({ row }) => row.index + 1,
        },
        {
            id: "class_name", // Ensure id matches accessorKey
            accessorKey: "class_name",
            header: "Class Name",
            size: 150,
        },
        {
            id: "subject_names", // Explicitly set id
            accessorKey: "subject_names",
            header: "Subject Name",
            size: 200,
        },
        {
            id: "departments", // Explicitly set id
            accessorKey: "departments",
            header: "Department",
            size: 200,
        },
        {
            id: "actions", // Explicitly set id for action column
            header: "Action",
            size: 200,
            cell: ({ row }) => (
                <div className="flex">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-500 hover:bg-blue-700"
                        onClick={() => {
                            setSelectedSessionItem(row.original);
                            setViewMode("edit");
                            setIsSessionModalOpen(true);
                        }}
                    >
                        <Edit size={16}  />
                    </Button>
    
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:bg-red-700"
                        onClick={() => {
                            setSelectedSessionItem(row.original);
                            setIsDeleteModalOpen(true);
                        }}
                    >
                        <Trash size={16} />
                    </Button>
                </div>
            ),
        },
    ];

    const handleDelete = () => {
        toast.success(`Deleted exam "${selectedSessionItem.class_name}" successfully!`);
        setIsDeleteModalOpen(false);
        // Logic to remove the item from data would go here
        setSelectedSessionItem(null);
    };

    const handleSessionSubmit = (sessionData) => {
        if (viewMode === 'create') {
            // Logic to add new session
            toast.success(`Created exam "${sessionData.class_name}" successfully!`);
        } else {
            // Logic to update existing session
            toast.success(`Updated exam "${sessionData.class_name}" successfully!`);
        }
        setIsSessionModalOpen(false);
        setSelectedSessionItem(null);
    };

    return (
        <div className="p-5">
            <Toaster /> {/* Render Sonner Toaster for notifications */}
            {viewMode === null && (
                <div>
                    <div className="mb-4 flex justify-between">
                        <div className="flex gap-x-4">
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
                            <div className="text-[24px] font-[700] ">
                                Class
                            </div>
                        </div>

                        <CommonButton
                            name="Create"
                            bgColor="#08381a"
                            textColor="#ffffff"
                            textSize="16px"
                            fontWeight="500"
                            leading="22.4px"
                            px="20px"
                            height="40px"
                            hoverColor="rgb(8, 56, 26 , 0.9)"
                            onClick={() => {
                                setViewMode("create");
                                setIsSessionModalOpen(true);
                            }}
                        />
                    </div>
                    <EnhancedDataTable
                        columns={columns}
                        data={data} // Use the dummy data here
                        allowRowSelect={true} // Optional: Enable row selection if needed
                    />
                </div>
            )}

            {viewMode && (
                <SessionModal
                    isOpen={isSessionModalOpen}
                    onClose={() => {
                        setIsSessionModalOpen(false);
                        setViewMode(null);
                    }}
                    mode={viewMode}
                    initialData={selectedSessionItem}
                    onSubmit={handleSessionSubmit}
                />
            )}

            {/* Delete Confirmation Modal */}
            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
                sectionName={selectedSessionItem?.class_name}
            />
        </div>
    );
}
