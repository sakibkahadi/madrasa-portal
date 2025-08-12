/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState } from "react";
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
const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, teacherName }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[300px]">
        <DialogHeader>
          <DialogTitle>Confirm Delete</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p>Are you sure you want to delete leave of "{teacherName}"?</p>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="button" onClick={onConfirm}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Main Component
export default function TeacherLeaveListComponent() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);

  const [leaves, setLeaves] = useState([
    {
      id: 1,
      startDate: "2025-07-10",
      endDate: "2025-07-12",
      name: "Mr. Rahman",
      
    },
    {
      id: 2,
      startDate: "2025-06-15",
      endDate: "2025-06-16",
      name: "Ms. Jahan",
     
    },
  ]);

  const router = useRouter();

  const handleCreateLeave = () => {
    router.push('/teachers/teachers-leave/create');
  };

  const handleEditLeave = (leave) => {
    router.push(`/teachers/teachers-leave/edit?id=${leave.id}`);
  };

  const handleDeleteLeave = (leave) => {
    setSelectedLeave(leave);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setLeaves(prev => prev.filter(leave => leave.id !== selectedLeave.id));
    toast.success(`Deleted leave for "${selectedLeave.name}"`);
    setIsDeleteModalOpen(false);
  };

  const columns = [
    {
      accessorKey: "sn",
      header: "SL",
      id: "sn",
      size: 50,
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: "startDate",
      header: "Start Date",
      size: 120,
    },
    {
      accessorKey: "endDate",
      header: "End Date",
      size: 120,
    },
    {
      accessorKey: "name",
      header: "Name",
      size: 150,
    },
  
    {
      header: "Action",
      id: "actions",
      size: 100,
      cell: ({ row }) => (
        <div className="flex gap-x-2">
          <Button variant="ghost" size="sm" onClick={() => handleEditLeave(row.original)}>
            <Edit size={16} className="text-blue-500" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleDeleteLeave(row.original)}>
            <Trash size={16} className="text-red-500" />
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
          <h1 className="text-2xl font-bold">Teacher Leaves</h1>
        </div>
        <Button onClick={handleCreateLeave} className="flex items-center gap-x-2">
          <Plus size={16} /> Add Leave
        </Button>
      </div>

      <EnhancedDataTable
        columns={columns}
        data={leaves}
        allowRowSelect={true}
      />

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        teacherName={selectedLeave?.name}
      />
    </div>
  );
}
