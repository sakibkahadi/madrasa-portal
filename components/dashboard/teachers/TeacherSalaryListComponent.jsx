"use client";
import React from "react";
import { ArrowBigLeft, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { EnhancedDataTable } from "@/components/EnhancedDataTable";
import { Toaster } from "sonner";
import { Button } from "@/components/ui/button";

export default function TeacherSalaryListComponent() {
  const router = useRouter();
  const handleCreateLeave = () => {
    router.push('/teachers/teachers-salary/create');
  };


  const salaries = [
    {
      id: 1,
      name: "Mr. Rahman",
      month: "Feb-2025",
      salary: 50000,
      paid: 50000,
    },
    {
      id: 2,
      name: "Ms. Jahan",
      month: "Feb-2025",
      salary: 48000,
      paid: 40000,
    },
    {
      id: 3,
      name: "Mr. Kabir",
      month: "Feb-2025",
      salary: 60000,
      paid: 60000,
    },
  ];

  const columns = [
    {
      accessorKey: "sn",
      header: "SL",
      id: "sn",
      size: 50,
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: "name",
      header: "Name",
      size: 200,
    },
    {
      accessorKey: "month",
      header: "Month",
      size: 120,
    },
    {
      accessorKey: "salary",
      header: "Salary",
      size: 120,
      cell: ({ row }) => `৳ ${row.original.salary.toLocaleString()}`,
    },
    {
      accessorKey: "paid",
      header: "Paid",
      size: 120,
      cell: ({ row }) => `৳ ${row.original.paid.toLocaleString()}`,
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
          <h1 className="text-2xl font-bold">Teacher Salary List</h1>
        </div>
              <Button onClick={handleCreateLeave} className="flex items-center gap-x-2">
          <Plus size={16} /> Add Salary
        </Button>
      </div>

      <EnhancedDataTable
        columns={columns}
        data={salaries}
        allowRowSelect={false}
      />
    </div>
  );
}
