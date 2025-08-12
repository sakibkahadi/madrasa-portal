"use client";
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Edit, Trash, ArrowBigLeft, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { EnhancedDataTable } from "@/components/EnhancedDataTable";
import { Toaster, toast } from "sonner"; // Import Sonner for notifications

// Session Modal Component
const SessionModal = ({
  isOpen, 
  onClose, 
  mode, 
  initialData,
  onSubmit
}) => {
  // State for form data
  const [formData, setFormData] = useState({
    session_name: initialData?.session_name || ''
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    // Validation
    if (!formData.session_name) {
      toast.error('Please fill in all required fields');
      return;
    }

    // If editing, include the original ID
    const submissionData = initialData?.id 
      ? { ...formData, id: initialData.id } 
      : { ...formData, id: Date.now() }; // Generate temporary ID for new sessions

    onSubmit(submissionData);
    toast.success(`${mode === 'create' ? 'Created' : 'Updated'} session successfully!`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Create New Session' : 'Edit Session'}
          </DialogTitle>
        </DialogHeader>
        

                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-8 items-center gap-2">
                        <Label htmlFor="department_name" className="col-span-4 pl-1">
              Title <span className='text-red-500'>*</span>
            </Label>
            <Input
              id="session_name"
              name="session_name"
              value={formData.session_name}
              onChange={handleInputChange}
              className="col-span-8"
              placeholder="e.g., Spring 2025"
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
const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, sessionName }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[300px]">
        <DialogHeader>
          <DialogTitle>Confirm Delete</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p>Are you sure you want to delete the session &quot;{sessionName}&quot;?</p>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="button" onClick={onConfirm}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Main Session Settings Component
export default function SessionSettingsComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedSession, setSelectedSession] = useState(null);
  const [sessions, setSessions] = useState([
    {
        id: 1,
        session_name: "Spring 2025",
    },
    {
        id: 2,
        session_name: "Fall 2025",
    },
    {
        id: 3,
        session_name: "Winter 2025",
    },
    {
        id: 4,
        session_name: "Spring 2025",
    },
    {
        id: 5,
        session_name: "Fall 2025",
    },
    {
        id: 6,
        session_name: "Winter 2025",
    },
    {
        id: 7,
        session_name: "Spring 2025",
    },
    {
        id: 8,
        session_name: "Fall 2025",
    },
    {
        id: 9,
        session_name: "Winter 2025",
    },
    {
        id: 10,
        session_name: "Spring 2025",
    },
    {
        id: 11,
        session_name: "Fall 2025",
    },
    {
        id: 12,
        session_name: "Winter 2025",
    },
    {
        id: 13,
        session_name: "Spring 2025",
    },
    {
        id: 14,
        session_name: "Fall 2025",
    },
    {
        id: 15,
        session_name: "Winter 2025",
    },
    {
        id: 16,
        session_name: "Spring 2025",
    },
    {
        id: 17,
        session_name: "Fall 2025",
    },
    {
        id: 18,
        session_name: "Winter 2025",
    },
    {
        id: 19,
        session_name: "Spring 2025",
    },
    {
        id: 20,
        session_name: "Fall 2025",
    },
    {
        id: 21,
        session_name: "Winter 2025",
    },
// Add more initial sessions as needed
]);

  const router = useRouter();

  // Open modal for creating a new session
  const handleCreateSession = () => {
    setModalMode('create');
    setSelectedSession(null);
    setIsModalOpen(true);
  };

  // Open modal for editing an existing session
  const handleEditSession = (session) => {
    setModalMode('edit');
    setSelectedSession(session);
    setIsModalOpen(true);
  };

  // Handle session submission (create or update)
  const handleSubmitSession = (sessionData) => {
    if (modalMode === 'create') {
      // Add new session
      setSessions(prev => [...prev, sessionData]);
    } else {
      // Update existing session
      setSessions(prev => 
        prev.map(session => 
          session.id === sessionData.id ? sessionData : session
        )
      );
    }
  };

  // Handle session deletion
  const handleDeleteSession = (sessionToDelete) => {
    setSelectedSession(sessionToDelete);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setSessions(prev => 
      prev.filter(session => session.id !== selectedSession.id)
    );
    toast.success(`Deleted session "${selectedSession.session_name}" successfully!`);
    setIsDeleteModalOpen(false);
  };

  // Define columns for the data table
  const columns = [
    {
      accessorKey: "sn",
      id: "sn",
      header: "SN",
      size: 50,
      cell: ({ row }) => row.index + 1, // Serial Number based on row index
    },
    {
      accessorKey: "session_name",
      id: "session_name",
      header: "Session",
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
            onClick={() => handleEditSession(row.original)}
          >
            <Edit size={16} />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-red-500 hover:bg-red-700"
            onClick={() => handleDeleteSession(row.original)}
          >
            <Trash size={16} />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-5">
      <Toaster /> {/* Render Sonner Toaster for notifications */}
      {/* Header */}
      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center gap-x-4">
          <div>
            <p
              className="cursor-pointer text-accent lex items-center gap-x-2 bg-gray-200 rounded-full"
              onClick={() => {
                router.back();
              }}
            >
              <ArrowBigLeft size={40} />
            </p>
          </div>
          <h1 className="text-2xl font-bold">Session Settings</h1>
        </div>

        <Button 
          onClick={handleCreateSession}
          className="flex items-center gap-x-2"
        >
          <Plus size={16} /> Create Session
        </Button>
      </div>

      {/* Data Table */}
      <EnhancedDataTable 
        columns={columns}
        data={sessions}
        allowRowSelect={true}
      />

      {/* Modal for Create/Edit */}
      <SessionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        initialData={selectedSession}
        onSubmit={handleSubmitSession}
      />

      {/* Confirm Delete Modal */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        sessionName={selectedSession?.session_name}
      />
    </div>
  );
}
