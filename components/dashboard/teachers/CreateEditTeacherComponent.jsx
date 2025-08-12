"use client";
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Toaster, toast } from "sonner";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from 'next/navigation';
import { Plus } from "lucide-react"; // Importing Plus icon
import { MultiSelect } from '@/components/ui/multi-select';

const CreateEditTeacherComponent = ({ initialData = {} }) => {
    const [formData, setFormData] = useState({
        reg_id: initialData?.reg_id || '', // This will be auto-generated
        name: initialData?.name || '',
        join_date: initialData?.join_date ? new Date(initialData.join_date) : null,
        gender: initialData?.gender || '',
        designation: initialData?.designation || '',
        salary: initialData?.salary || '',
        phone: initialData?.phone || '',
        email: initialData?.email || '',
        blood_group: initialData?.blood_group || '',
        address: initialData?.address || '',
        description: initialData?.description || '',
        classNames: [],
        shiftNames: [],
        subjectNames: [],
        profile_picture: null,
        academicRecords: [{ exam_title: '', passing_year: '', certificates: null }], // Array for academic records
        identityRecords: [{ id_card_type: '', identity_card_no: '', id_card: null }], // Array for identity records
    });

    const router = useRouter();

    const handleCancel = () => {
        router.back();
    };

    const handleInputChange = (e, index, section) => {
        const { name, value } = e.target;
        const updatedSection = [...formData[section]];
        updatedSection[index][name] = value;
        setFormData(prev => ({
            ...prev,
            [section]: updatedSection
        }));
    };

    const handleSelectChange = (index, value, section) => {
        const updatedSection = [...formData[section]];
        updatedSection[index].id_card_type = value; // Assuming the select is for id_card_type
        setFormData(prev => ({
            ...prev,
            [section]: updatedSection
        }));
    };

    const handleMultiSelectChange = (value, field) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleFileChange = (e, index, section) => {
        const { name, files } = e.target;
        const updatedSection = [...formData[section]];
        updatedSection[index][name] = files[0];
        setFormData(prev => ({
            ...prev,
            [section]: updatedSection
        }));
    };

    const addAcademicRecord = () => {
        setFormData(prev => ({
            ...prev,
            academicRecords: [...prev.academicRecords, { exam_title: '', passing_year: '', certificates: null }]
        }));
    };

    const addIdentityRecord = () => {
        setFormData(prev => ({
            ...prev,
            identityRecords: [...prev.identityRecords, { id_card_type: '', identity_card_no: '', id_card: null }]
        }));
    };

    const removeAcademicRecord = (index) => {
        setFormData(prev => ({
            ...prev,
            academicRecords: prev.academicRecords.filter((_, i) => i !== index)
        }));
    };
    
    const removeIdentityRecord = (index) => {
        setFormData(prev => ({
            ...prev,
            identityRecords: prev.identityRecords.filter((_, i) => i !== index)
        }));
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        const requiredFields = [
            'name', 'join_date', 'gender', 'designation',
            'salary', 'phone', 'email', 'blood_group',
            'address', 'profile_picture', 'academicRecords',
            'identityRecords'
        ];

        const missingFields = requiredFields.filter(field => !formData[field]);

        if (missingFields.length > 0) {
            toast.error(`Please fill in all required fields: ${missingFields.join(', ')}`);
            return;
        }

        // TODO: Add actual save logic here
        console.log('Form Data:', formData);
        toast.success('Teacher data saved successfully!');
    };

    return (
        <div className="container mx-auto p-6">
            <Toaster />
            <h1 className="text-3xl font-bold mb-6">
                {initialData?.id ? 'Edit Teacher' : 'Create Teacher'}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* General Information Section */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">General Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <Label htmlFor="reg_id">Reg ID</Label>
                            <Input
                                id="reg_id"
                                name="reg_id"
                                value={formData.reg_id}
                                readOnly
                            />
                        </div>
                        <div>
                            <Label htmlFor="name">Name<span className='text-red-500'>*</span></Label>
                            <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={(e) => handleInputChange(e, null, 'formData')}
                                placeholder="Enter Teacher Name"
                                required
                            />
                        </div>
                        <div className='flex flex-col'>
                            <Label htmlFor="join_date" className="mb-2">Join Date<span className='text-red-500'>*</span></Label>
                            <DatePicker
                                selected={formData.join_date}
                                onChange={(date) => setFormData(prev => ({ ...prev, join_date: date }))}
                                className="w-full border rounded-md p-2 py-[6px]"
                                placeholderText="Select Join Date"
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="gender">Gender<span className='text-red-500'>*</span></Label>
                            <Select
                                value={formData.gender}
                                onValueChange={(value) => handleSelectChange('gender', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="designation">Designation<span className='text-red-500'>*</span></Label>
                            <Input
                                id="designation"
                                name="designation"
                                value={formData.designation}
                                onChange={(e) => handleInputChange(e, null, 'formData')}
                                placeholder="Enter Designation"
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="salary">Salary<span className='text-red-500'>*</span></Label>
                            <Input
                                id="salary"
                                name="salary"
                                type="number"
                                value={formData.salary}
                                onChange={(e) => handleInputChange(e, null, 'formData')}
                                placeholder="Enter Salary"
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="phone">Phone<span className='text-red-500'>*</span></Label>
                            <Input
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={(e) => handleInputChange(e, null, 'formData')}
                                placeholder="Enter Phone Number"
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="email">Email<span className='text-red-500'>*</span></Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange(e, null, 'formData')}
                                placeholder="Enter Email"
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="blood_group">Blood Group<span className='text-red-500'>*</span></Label>
                            <Input
                                id="blood_group"
                                name="blood_group"
                                value={formData.blood_group}
                                onChange={(e) => handleInputChange(e, null, 'formData')}
                                placeholder="Enter Blood Group"
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="address">Address<span className='text-red-500'>*</span></Label>
                            <Input
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={(e) => handleInputChange(e, null, 'formData')}
                                placeholder="Enter Address"
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Input
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={(e) => handleInputChange(e, null, 'formData')}
                                placeholder="Enter Description"
                            />
                        </div>
                        <div>
                            <Label htmlFor="profile_picture">Profile Picture<span className='text-red-500'>*</span></Label>
                            <Input
                                id="profile_picture"
                                name="profile_picture"
                                type="file"
                                onChange={(e) => {
                                    handleFileChange(e, null, 'formData');
                                    const file = e.target.files[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onload = (event) => {
                                            const imgPreview = document.getElementById('profile-preview');
                                            imgPreview.src = event.target.result;
                                            imgPreview.style.display = 'block';
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                                accept="image/*"
                                className="mb-2"
                                required
                            />
                            <img id="profile-preview" alt="Profile Preview" className="w-full h-auto border rounded-md" style={{ display: 'none' }} />
                        </div>
                    </div>
                </div>

                {/* Academic Information Section */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Academic Information</h2>
                    {formData.academicRecords.map((record, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div>
                                <Label htmlFor={`exam_title_${index}`}>Exam Title<span className='text-red-500'>*</span></Label>
                                <Input
                                    id={`exam_title_${index}`}
                                    name="exam_title"
                                    value={record.exam_title}
                                    onChange={(e) => handleInputChange(e, index, 'academicRecords')}
                                    placeholder="Enter Exam Title"
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor={`passing_year_${index}`}>Passing Year<span className='text-red-500'>*</span></Label>
                                <Input
                                    id={`passing_year_${index}`}
                                    name="passing_year"
                                    type="number"
                                    value={record.passing_year}
                                    onChange={(e) => handleInputChange(e, index, 'academicRecords')}
                                    placeholder="Enter Passing Year"
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor={`certificates_${index}`}>Upload Certificate<span className='text-red-500'>*</span></Label>
                                <Input
                                    id={`certificates_${index}`}
                                    name="certificates"
                                    type="file"
                                    multiple
                                    onChange={(e) => handleFileChange(e, index, 'academicRecords')}
                                    className="mb-2"
                                    required
                                />
                            </div>
                            <div>
                                <Button type="button" onClick={() => removeAcademicRecord(index)} variant="outline" className="mt-6">
                                    Remove
                                </Button>
                            </div>
                        </div>
                    ))}
                    <Button type="button" onClick={addAcademicRecord} className="flex items-center">
                        <Plus className="mr-2" /> Add More Academic Record
                    </Button>
                </div>

                {/* Identity Information Section */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Identity Information</h2>
                    {formData.identityRecords.map((record, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div>
                                <Label htmlFor={`id_card_type_${index}`}>Select Card Name<span className='text-red-500'>*</span></Label>
                                <Select
                                    value={record.id_card_type}
                                    onValueChange={(value) => handleSelectChange(index, value, 'identityRecords')}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Card Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="nid">NID</SelectItem>
                                        <SelectItem value="passport">Passport</SelectItem>
                                        <SelectItem value="birth_certificate">Birth Certificate</SelectItem>
                                        <SelectItem value="driving_license">Driving License</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor={`identity_card_no_${index}`}>Identity Card No<span className='text-red-500'>*</span></Label>
                                <Input
                                    id={`identity_card_no_${index}`}
                                    name="identity_card_no"
                                    value={record.identity_card_no}
                                    onChange={(e) => handleInputChange(e, index, 'identityRecords')}
                                    placeholder="Enter Identity Card No"
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor={`id_card_${index}`}>Upload ID Card<span className='text-red-500'>*</span></Label>
                                <Input
                                    id={`id_card_${index}`}
                                    name="id_card"
                                    type="file"
                                    onChange={(e) => handleFileChange(e, index, 'identityRecords')}
                                    className="mb-2"
                                    required
                                />
                            </div>
                            <div>
                                <Button type="button" onClick={() => removeIdentityRecord(index)} variant="outline" className="bg-red-500 text-white hover:bg-red-700">
                                    Remove
                                </Button>
                            </div>
                        </div>
                    ))}
                    <Button type="button" onClick={addIdentityRecord} className="flex items-center">
                        <Plus className="mr-2" /> Add More Identity Record
                    </Button>
                </div>

                {/* Additional Information Section */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
                    <div className='flex gap-4'>
                        <div className="mb-4 w-full">
                        <Label htmlFor="classNames">Class Names</Label>
                        <MultiSelect
                            options={[
                                { value: 'class1', label: 'Class 1' },
                                { value: 'class2', label: 'Class 2' },
                                { value: 'class3', label: 'Class 3' },
                                // Add more options as needed
                            ]}
                            onValueChange={(value) => handleMultiSelectChange(value, 'classNames')}
                            placeholder="Select Class Names"
                        />
                    </div>

                    <div className="mb-4 w-full">
                        <Label htmlFor="shiftNames">Shift Names</Label>
                        <MultiSelect
                            options={[
                                { value: 'morning', label: 'Morning' },
                                { value: 'afternoon', label: 'Afternoon' },
                                { value: 'evening', label: 'Evening' },
                                // Add more options as needed
                            ]}
                            onValueChange={(value) => handleMultiSelectChange(value, 'shiftNames')}
                            placeholder="Select Shift Names"
                        />
                    </div>

                    <div className="mb-4 w-full">
                        <Label htmlFor="subjectNames">Subject Names</Label>
                        <MultiSelect
                            options={[
                                { value: 'math', label: 'Mathematics' },
                                { value: 'science', label: 'Science' },
                                { value: 'english', label: 'English' },
                                // Add more options as needed
                            ]}
                            onValueChange={(value) => handleMultiSelectChange(value, 'subjectNames')}
                            placeholder="Select Subject Names"
                        />
                    </div></div>
                    
                </div>

                <div className="flex justify-end space-x-4">
                    <Button type="button" variant="outline" onClick={handleCancel}>Cancel</Button>
                    <Button type="submit">Save</Button>
                </div>
            </form>
        </div>
    );
};

export default CreateEditTeacherComponent;
