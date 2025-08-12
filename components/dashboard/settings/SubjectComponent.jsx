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

// Subject Modal Component
const SubjectModal = ({
  isOpen,
  onClose,
  mode,
  initialData,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    subject_name: initialData?.subject_name || ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (!formData.subject_name) {
      toast.error('Please fill in all required fields');
      return;
    }

    const submissionData = initialData?.id
      ? { ...formData, id: initialData.id }
      : { ...formData, id: Date.now() }; // Temporary ID for new subjects

    onSubmit(submissionData);
    toast.success(`${mode === 'create' ? 'Created' : 'Updated'} subject successfully!`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Create New Subject' : 'Edit Subject'}
          </DialogTitle>
        </DialogHeader>


        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-8 items-center gap-2">
            <Label htmlFor="department_name" className="col-span-4 pl-1">
              Subject Name <span className='text-red-500'>*</span>
            </Label>
            <Input
              id="subject_name"
              name="subject_name"
              value={formData.subject_name}
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
const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, subjectName }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[300px]">
        <DialogHeader>
          <DialogTitle>Confirm Delete</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p>Are you sure you want to delete the subject &quot;{subjectName}&quot;?</p>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="button" onClick={onConfirm}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Main Subject Settings Component
export default function SubjectComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [subjects, setSubjects] = useState([
    { id: 1, subject_name: "Mathematics" },
    { id: 2, subject_name: "Science" },
    { id: 3, subject_name: "Literature" },
    { id: 4, subject_name: "History" },
  ]);

  const router = useRouter();

  const handleCreateSubject = () => {
    setModalMode('create');
    setSelectedSubject(null);
    setIsModalOpen(true);
  };

  const handleEditSubject = (subject) => {
    setModalMode('edit');
    setSelectedSubject(subject);
    setIsModalOpen(true);
  };

  const handleSubmitSubject = (subjectData) => {
    if (modalMode === 'create') {
      setSubjects(prev => [...prev, subjectData]);
    } else {
      setSubjects(prev =>
        prev.map(subject =>
          subject.id === subjectData.id ? subjectData : subject
        )
      );
    }
  };

  const handleDeleteSubject = (subjectToDelete) => {
    setSelectedSubject(subjectToDelete);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setSubjects(prev =>
      prev.filter(subject => subject.id !== selectedSubject.id)
    );
    toast.success(`Deleted subject "${selectedSubject.subject_name}" successfully!`);
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
      accessorKey: "subject_name",
      id: "subject_name",
      header: "Subject",
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
            onClick={() => handleEditSubject(row.original)}
          >
            <Edit size={16} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-red-500 hover:bg-red-700"
            onClick={() => handleDeleteSubject(row.original)}
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
          <h1 className="text-2xl font-bold">Subject Settings</h1>
        </div>

        <Button
          onClick={handleCreateSubject}
          className="flex items-center gap-x-2"
        >
          <Plus size={16} /> Create Subject
        </Button>
      </div>

      <EnhancedDataTable
        columns={columns}
        data={subjects}
        allowRowSelect={true}
      />

      <SubjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        initialData={selectedSubject}
        onSubmit={handleSubmitSubject}
      />

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        subjectName={selectedSubject?.subject_name}
      />
    </div>
  );
}
