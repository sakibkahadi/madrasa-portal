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
import { useRouter } from "next/navigation";

const StudentLeaveComponent = ({ initialData = {}, students = [], classes = [] }) => {
  const [formData, setFormData] = useState({
    class: initialData?.class || "",
    student: initialData?.student || "",
    fromDate: initialData?.fromDate ? new Date(initialData.fromDate) : null,
    toDate: initialData?.toDate ? new Date(initialData.toDate) : null,
    totalDays: initialData?.totalDays || 0,
    takenBy: initialData?.takenBy || "",
    note: initialData?.note || "",
  });

  const router = useRouter();

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

    const requiredFields = ["class", "student", "fromDate", "toDate", "takenBy"];
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
        {initialData?.id ? "Edit Student Leave" : "Create Student Leave"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label>Class</Label>
            <Select
              value={formData.class}
              onValueChange={(value) => handleChange("class", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Class" />
              </SelectTrigger>
              <SelectContent>
                                                 <SelectItem value="10">10</SelectItem>
                                                 <SelectItem value="11">11</SelectItem>
                                             </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Student</Label>
            <Select
              value={formData.student}
              onValueChange={(value) => handleChange("student", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Student" />
              </SelectTrigger>
              <SelectContent>
                <SelectContent>
                                                   <SelectItem value="10">Sakib</SelectItem>
                                                   <SelectItem value="11">Kahd</SelectItem>
                                               </SelectContent>
              </SelectContent>
            </Select>
          </div>

          {/* <div>
            <Label>From Date</Label>
            <DatePicker
              selected={formData.fromDate}
              onChange={(date) => handleChange("fromDate", date)}
              className="w-full border rounded-md p-2"
              placeholderText="Select From Date"
            />
          </div> */}
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

          {/* <div>
            <Label>To Date</Label>
            <DatePicker
              selected={formData.toDate}
              onChange={(date) => handleChange("toDate", date)}
              className="w-full border rounded-md p-2"
              placeholderText="Select To Date"
            />
          </div> */}

          <div>
            <Label>Total Days</Label>
            <Input
              value={formData.totalDays}
              readOnly
              className="bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div>
            <Label>Taken By</Label>
            <Select
              value={formData.takenBy}
              onValueChange={(value) => handleChange("takenBy", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Taken By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="self">Self</SelectItem>
                <SelectItem value="guardian">Guardian</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-3 ">
            <Label>Note</Label>
            <Input
              name="note"
              value={formData.note} 
              onChange={(e) => handleChange("note", e.target.value)}
              placeholder="Enter any note"
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

export default StudentLeaveComponent;
