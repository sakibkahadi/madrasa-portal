"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Toaster, toast } from "sonner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const teacherSalaryMap = {
  sakib: 50000,
  kahadi: 55000,
};

const fundOptions = ["General Fund", "Special Grant", "Reserve"];

const TeachersSalaryComponent = () => {
  const [formData, setFormData] = useState({
    month: null,
    teacher: "",
    salary: 0,
    fund: "",
    paid: "",
    due: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };

      if (field === "teacher") {
        updated.salary = teacherSalaryMap[value] || 0;
        // Reset paid and due when teacher changes
        updated.paid = "";
        updated.due = "";
      }

      if (field === "paid") {
        const paidNum = parseFloat(value) || 0;
        const salaryNum = parseFloat(prev.salary) || 0;
        updated.due = Math.max(salaryNum - paidNum, 0); // prevent negative due
      }

      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { month, teacher, salary, fund, paid } = formData;
    if (!month || !teacher || !fund || paid === "") {
      toast.error("Please fill all required fields.");
      return;
    }

    console.log("Salary Form Data:", formData);
    toast.success("Teacher salary recorded successfully!");
  };

  return (
    <div className="container mx-auto p-6">
      <Toaster />
      <h1 className="text-2xl font-bold mb-6">Add Teacher Salary</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Month Picker */}
          <div className="flex flex-col space-y-2">
            <Label>Month</Label>
            <DatePicker
              selected={formData.month}
              onChange={(date) => handleChange("month", date)}
              dateFormat="MMMM yyyy"
              showMonthYearPicker
              className="w-full border rounded-md p-2 text-sm"
              placeholderText="Select Month"
            />
          </div>

          {/* Teacher Dropdown */}
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
                <SelectItem value="sakib">Sakib</SelectItem>
                <SelectItem value="kahadi">Kahadi</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Salary (readonly) */}
          <div>
            <Label>Salary</Label>
            <Input
              value={formData.salary}
              readOnly
              className="bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Fund Dropdown */}
          <div>
            <Label>Fund</Label>
            <Select
              value={formData.fund}
              onValueChange={(value) => handleChange("fund", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Fund" />
              </SelectTrigger>
              <SelectContent>
                {fundOptions.map((fund) => (
                  <SelectItem key={fund} value={fund}>
                    {fund}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Paid Amount */}
          <div>
            <Label>Paid Amount</Label>
            <Input
              type="number"
              value={formData.paid}
              onChange={(e) => handleChange("paid", e.target.value)}
              placeholder="Enter paid amount"
            />
          </div>

          {/* Due Amount (readonly) */}
          <div>
            <Label>Due Amount</Label>
            <Input
              value={formData.due}
              readOnly
              className="bg-gray-100 cursor-not-allowed"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
};

export default TeachersSalaryComponent;
