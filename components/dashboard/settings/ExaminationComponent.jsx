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

// Session Modal Component
const SessionModal = ({ isOpen, onClose, mode, initialData, onSubmit }) => {
    const [formData, setFormData] = useState({
        section_name: initialData?.section_name || '',
        start_date: initialData?.start_date || '',
        end_date: initialData?.end_date || '',
        status: initialData?.status || 'Active',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        if (!formData.section_name || !formData.start_date || !formData.end_date) {
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
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{mode === "create" ? "Create New Section" : "Edit Section"}</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-6 items-center gap-2">
                        <Label htmlFor="title" className="text-right">Name <span className="text-red-500">*</span></Label>
                        <Input
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="col-span-5"
                            placeholder="e.g., মাসিক পরিক্ষা"
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

export default function ExaminationComponent() {
    const [viewMode, setViewMode] = useState(null);
    const [selectedSessionItem, setSelectedSessionItem] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);
    const router = useRouter();

    // Dummy data for the table
    const data = [
        {
            id: 1,
            section_name: "মাসিক পরিক্ষা",
        },
        {
            id: 2,
            section_name: "১ম সাময়িক পরীক্ষা",
        },
        {
            id: 3,
            section_name: "২য় সাময়িক পরীক্ষা",
        },
        {
            id: 4,
            section_name: "মাসিক পরিক্ষা",
        },
        {
            id: 5,
            section_name: "১ম সাময়িক পরীক্ষা",
        },
        {
            id: 6,
            section_name: "২য় সাময়িক পরীক্ষা",
        },
        {
            id: 7,
            section_name: "মাসিক পরিক্ষা",
        },
        {
            id: 8,
            section_name: "১ম সাময়িক পরীক্ষা",
        },
        {
            id: 9,
            section_name: "২য় সাময়িক পরীক্ষা",
        },
        {
            id: 10,
            section_name: "মাসিক পরিক্ষা",
        },
        {
            id: 11,
            section_name: "১ম সাময়িক পরীক্ষা",
        },
        {
            id: 12,
            section_name: "২য় সাময়িক পরীক্ষা",
        },
        {
            id: 13,
            section_name: "মাসিক পরিক্ষা",
        },
        {
            id: 14,
            section_name: "১ম সাময়িক পরীক্ষা",
        },
        {
            id: 15,
            section_name: "২য় সাময়িক পরীক্ষা",
        },
        {
            id: 16,
            section_name: "মাসিক পরিক্ষা",
        },
        {
            id: 17,
            section_name: "১ম সাময়িক পরীক্ষা",
        },
        {
            id: 18,
            section_name: "২য় সাময়িক পরীক্ষা",
        },
        {
            id: 19,
            section_name: "মাসিক পরিক্ষা",
        },
        {
            id: 20,
            section_name: "১ম সাময়িক পরীক্ষা",
        },
        {
            id: 21,
            section_name: "২য় সাময়িক পরীক্ষা",
        },
    ];

    const columns = [
        {
            accessorKey: "sn",
            id: "sn" ,
            header: "SN",
            size: 50,
            cell: ({ row }) => row.index + 1,
        },
        {
            accessorKey: "section_name",
            id: "section_name" ,
            header: "Exam",
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
                        onClick={() => {
                            setSelectedSessionItem(row.original);
                            setViewMode("edit");
                            setIsSessionModalOpen(true);
                        }}
                    >
                        <Edit size={16}/>
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
                        <Trash size={16}/>
                    </Button>
                </div>
            ),
        },
    ];

    const handleDelete = () => {
        toast.success(`Deleted exam "${selectedSessionItem.section_name}" successfully!`);
        setIsDeleteModalOpen(false);
        // Logic to remove the item from data would go here
        setSelectedSessionItem(null);
    };

    const handleSessionSubmit = (sessionData) => {
        if (viewMode === 'create') {
            // Logic to add new session
            toast.success(`Created exam "${sessionData.section_name}" successfully!`);
        } else {
            // Logic to update existing session
            toast.success(`Updated exam "${sessionData.section_name}" successfully!`);
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
                                Examination
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
                sectionName={selectedSessionItem?.section_name}
            />
        </div>
    );
}
