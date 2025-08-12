"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Toaster, toast } from "sonner";

const TeachersLeaveComponent = ({ initialData = {}, teachers = [] }) => {
  const [formData, setFormData] = useState({
    teacher: initialData?.teacher || "",
    fromDate: initialData?.fromDate ? new Date(initialData.fromDate) : null,
    toDate: initialData?.toDate ? new Date(initialData.toDate) : null,
    totalDays: initialData?.totalDays || 0,
    note: initialData?.note || "",
  });

  useEffect(() => {
    if (formData.fromDate && formData.toDate) {
      const diffTime = Math.abs(formData.toDate - formData.fromDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      setFormData((prev) => ({ ...prev, totalDays: diffDays }));
    }
  }, [formData.fromDate, formData.toDate]);

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = ["teacher", "fromDate", "toDate"];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      toast.error(`Please fill in: ${missingFields.join(", ")}`);
      return;
    }

    console.log("Leave form data:", formData);
    toast.success("Leave data saved successfully!");
  };

  return (
    <div className="container mx-auto p-6">
      <Toaster />
      <h1 className="text-2xl font-semibold mb-4">
        {initialData?.id ? "Edit Teacher Leave" : "Create Teacher Leave"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label>Teacher</Label>
            <Select
              value={formData.teacher}
              onValueChange={(value) => handleChange("teacher", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Teacher" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">Sakib</SelectItem>
                                                                   <SelectItem value="11">Kahd</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-[10px]">
            <Label>From Date</Label>
            <DatePicker
              selected={formData.fromDate}
              onChange={(date) => handleChange("fromDate", date)}
              className="w-full border rounded-md p-2 text-sm"
              placeholderText="Select From Date"
            />
          </div>

          <div className="flex flex-col gap-[10px]">
            <Label>To Date</Label>
            <DatePicker
              selected={formData.toDate}
              onChange={(date) => handleChange("toDate", date)}
              className="w-full border rounded-md p-2 text-sm"
              placeholderText="Select To Date"
            />
          </div>

          <div>
            <Label>Total Days</Label>
            <Input
              value={formData.totalDays}
              readOnly
              className="bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div className="md:col-span-3">
            <Label>Note</Label>
            <textarea
              className="w-full border rounded-md p-2 min-h-[100px] text-sm"
              value={formData.note}
              onChange={(e) => handleChange("note", e.target.value)}
              placeholder="Enter note"
            />
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button type="submit">{initialData?.id ? "Update" : "Save"}</Button>
        </div>
      </form>
    </div>
  );
};

export default TeachersLeaveComponent;
