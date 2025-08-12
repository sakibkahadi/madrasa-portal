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

const CreateEditStudentComponent = ({ initialData = {} }) => {
    const [formData, setFormData] = useState({
        form_no: initialData?.form_no || '',
        date: initialData?.date ? new Date(initialData.date) : null,
        admission_type: initialData?.admission_type || '',
        name: initialData?.name || '',
        father_name: initialData?.father_name || '',
        mother_name: initialData?.mother_name || '',
        dob: initialData?.dob ? new Date(initialData.dob) : null,
        birth_certificate: initialData?.birth_certificate || '',
        previous_madrasha: initialData?.previous_madrasha || '',
        previous_class: initialData?.previous_class || '',
        new_student_result: initialData?.new_student_result || '',
        student_type: initialData?.student_type || '',
        session: initialData?.session || '',
        class: initialData?.class || '',
        gender: initialData?.gender || '',
        orphan: initialData?.orphan || '',
        village: initialData?.village || '',
        post_office: initialData?.post_office || '',
        police_station: initialData?.police_station || '',
        district: initialData?.district || '',
        guardian_name: initialData?.guardian_name || '',
        guardian_nid: initialData?.guardian_nid || '',
        relation: initialData?.relation || '',
        mobile: initialData?.mobile || '',
        admission_fee: initialData?.admission_fee || '',
        admission_fee_receive: initialData?.admission_fee_receive || '',
        admission_fee_discount: initialData?.admission_fee_discount || '',
        guardian_address: initialData?.guardian_address || '',
        photo: null,
        other_documents: null,
    });

    const router = useRouter();

    const handleCancel = () => {
        router.back();
    }

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

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: files[0]
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        const requiredFields = [
            'form_no', 'date', 'admission_type', 'name',
            'father_name', 'mother_name', 'birth_certificate',
            'student_type', 'session', 'class', 'gender', 'mobile',
            'admission_fee', 'admission_fee_receive'
        ];

        const missingFields = requiredFields.filter(field => !formData[field]);

        if (missingFields.length > 0) {
            toast.error(`Please fill in all required fields: ${missingFields.join(', ')}`);
            return;
        }

        // TODO: Add actual save logic here
        console.log('Form Data:', formData);
        toast.success('Student data saved successfully!');
    };

    return (
        <div className="container mx-auto p-6">
            <Toaster />
            <h1 className="text-3xl font-bold mb-6">
                {initialData?.id ? 'Edit Student' : 'Create Student'}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* General Information Section */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">General Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <Label htmlFor="form_no">Form No<span className='text-red-500'>*</span></Label>
                            <Input
                                id="form_no"
                                name="form_no"
                                value={formData.form_no}
                                onChange={handleInputChange}
                                placeholder="Enter Form No"
                                required
                            />
                        </div>
                        <div className='flex flex-col'>
                            <Label htmlFor="date" className="mb-2">Date<span className='text-red-500'>*</span></Label>
                            <DatePicker
                                selected={formData.date}
                                onChange={(date) => setFormData(prev => ({ ...prev, date }))}
                                className="w-full border rounded-md p-2 py-[6px]"
                                placeholderText="Select Date"
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="admission_type">Admission Type<span className='text-red-500'>*</span></Label>
                            <Select
                                value={formData.admission_type}
                                onValueChange={(value) => handleSelectChange('admission_type', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Admission Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="new">New</SelectItem>
                                    <SelectItem value="transfer">Transfer</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="name">Student Name<span className='text-red-500'>*</span></Label>
                            <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Enter Student Name"
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="father_name">Father Name<span className='text-red-500'>*</span></Label>
                            <Input
                                id="father_name"
                                name="father_name"
                                value={formData.father_name}
                                onChange={handleInputChange}
                                placeholder="Enter Father's Name"
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="mother_name">Mother Name<span className='text-red-500'>*</span></Label>
                            <Input
                                id="mother_name"
                                name="mother_name"
                                value={formData.mother_name}
                                onChange={handleInputChange}
                                placeholder="Enter Mother's Name"
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="dob">Date of Birth</Label>
                            <DatePicker
                                selected={formData.dob}
                                onChange={(date) => setFormData(prev => ({ ...prev, dob: date }))}
                                className="w-full border rounded-md p-2"
                                placeholderText="Select Date of Birth"
                            />
                        </div>
                        <div>
                            <Label htmlFor="birth_certificate">Birth Certificate<span className='text-red-500'>*</span></Label>
                            <Input
                                id="birth_certificate"
                                name="birth_certificate"
                                value={formData.birth_certificate}
                                onChange={handleInputChange}
                                placeholder="Enter Birth Certificate No"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Academic Information Section */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Academic Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <Label htmlFor="new_student_result">New Student Result</Label>
                            <Input
                                id="new_student_result"
                                name="new_student_result"
                                value={formData.new_student_result}
                                onChange={handleInputChange}
                                placeholder="Enter New Student Result"
                            />
                        </div>
                        <div>
                            <Label htmlFor="student_type">Student Type<span className='text-red-500'>*</span></Label>
                            <Select
                                value={formData.student_type}
                                onValueChange={(value) => handleSelectChange('student_type', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Student Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="regular">Regular</SelectItem>
                                    <SelectItem value="irregular">Irregular</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="session">Session<span className='text-red-500'>*</span></Label>
                            <Select
                                value={formData.session}
                                onValueChange={(value) => handleSelectChange('session', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Session" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="2023">2023</SelectItem>
                                    <SelectItem value="2024">2024</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="class">Class<span className='text-red-500'>*</span></Label>
                            <Select
                                value={formData.class}
                                onValueChange={(value) => handleSelectChange('class', value)}
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
                            <Label htmlFor="orphan">Orphan Status</Label>
                            <Select
                                value={formData.orphan}
                                onValueChange={(value) => handleSelectChange('orphan', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Orphan Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="yes">Yes</SelectItem>
                                    <SelectItem value="no">No</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                {/* Address Information Section */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Address Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <Label htmlFor="village">Village</Label>
                            <Input
                                id="village"
                                name="village"
                                value={formData.village}
                                onChange={handleInputChange}
                                placeholder="Enter Village Name"
                            />
                        </div>
                        <div>
                            <Label htmlFor="post_office">Post Office</Label>
                            <Input
                                id="post_office"
                                name="post_office"
                                value={formData.post_office}
                                onChange={handleInputChange}
                                placeholder="Enter Post Office Name"
                            />
                        </div>
                        <div>
                            <Label htmlFor="police_station">Police Station</Label>
                            <Input
                                id="police_station"
                                name="police_station"
                                value={formData.police_station}
                                onChange={handleInputChange}
                                placeholder="Enter Police Station Name"
                            />
                        </div>
                        <div>
                            <Label htmlFor="district">District</Label>
                            <Input
                                id="district"
                                name="district"
                                value={formData.district}
                                onChange={handleInputChange}
                                placeholder="Enter District Name"
                            />
                        </div>
                    </div>
                </div>

                {/* Guardian Information Section */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Guardian Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <Label htmlFor="guardian_name">Guardian Name</Label>
                            <Input
                                id="guardian_name"
                                name="guardian_name"
                                value={formData.guardian_name}
                                onChange={handleInputChange}
                                placeholder="Enter Guardian Name"
                            />
                        </div>
                        <div>
                            <Label htmlFor="guardian_nid">Guardian NID</Label>
                            <Input
                                id="guardian_nid"
                                name="guardian_nid"
                                value={formData.guardian_nid}
                                onChange={handleInputChange}
                                placeholder="Enter Guardian NID"
                            />
                        </div>
                        <div>
                            <Label htmlFor="relation">Relation</Label>
                            <Input
                                id="relation"
                                name="relation"
                                value={formData.relation}
                                onChange={handleInputChange}
                                placeholder="Enter Relation"
                            />
                        </div>
                        <div>
                            <Label htmlFor="mobile">Mobile<span className='text-red-500'>*</span></Label>
                            <Input
                                id="mobile"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleInputChange}
                                placeholder="Enter Mobile Number"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Admission Fee Information Section */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Admission Fee Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <Label htmlFor="admission_fee">Admission Fee<span className='text-red-500'>*</span></Label>
                            <Input
                                id="admission_fee"
                                name="admission_fee"
                                type="number"
                                value={formData.admission_fee}
                                onChange={handleInputChange}
                                placeholder="Enter Admission Fee"
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="admission_fee_receive">Admission Fee Received<span className='text-red-500'>*</span></Label>
                            <Input
                                id="admission_fee_receive"
                                name="admission_fee_receive"
                                type="number"
                                value={formData.admission_fee_receive}
                                onChange={handleInputChange}
                                placeholder="Enter Admission Fee Received"
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="admission_fee_discount">Admission Fee Discount</Label>
                            <Input
                                id="admission_fee_discount"
                                name="admission_fee_discount"
                                type="number"
                                value={formData.admission_fee_discount}
                                onChange={handleInputChange}
                                placeholder="Enter Admission Fee Discount"
                            />
                        </div>
                    </div>
                </div>

                {/* Additional Information Section */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <Label htmlFor="guardian_address">Guardian Address</Label>
                            <Input
                                id="guardian_address"
                                name="guardian_address"
                                value={formData.guardian_address}
                                onChange={handleInputChange}
                                placeholder="Enter Guardian's Address"
                            />
                        </div><div>
                            <Label htmlFor="photo">Student Photo</Label>
                            <Input
                                id="photo"
                                name="photo"
                                type="file"
                                onChange={(e) => {
                                    handleFileChange(e);
                                    const file = e.target.files[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onload = (event) => {
                                            const imgPreview = document.getElementById('photo-preview');
                                            imgPreview.src = event.target.result;
                                            imgPreview.style.display = 'block';
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                                accept="image/*"
                                className="mb-2"
                            />
                            <img id="photo-preview" alt="Photo Preview" className="w-full h-auto border rounded-md" style={{ display: 'none' }} />
                        </div>

                        <div>
                            <Label htmlFor="other_documents">Other Documents</Label>
                            <Input
                                id="other_documents"
                                name="other_documents"
                                type="file"
                                multiple
                                onChange={(e) => {
                                    handleFileChange(e);
                                    const files = Array.from(e.target.files);
                                    const previewContainer = document.getElementById('documents-preview');
                                    previewContainer.innerHTML = ''; // Clear previous previews

                                    files.forEach((file) => {
                                        const reader = new FileReader();
                                        reader.onload = (event) => {
                                            const img = document.createElement('img');
                                            img.src = event.target.result;
                                            img.className = 'w-32 h-32 object-cover border rounded-md m-1'; // Adjust size as needed
                                            previewContainer.appendChild(img);
                                        };
                                        reader.readAsDataURL(file);
                                    });
                                }}
                                className="mb-2"
                            />
                            <div id="documents-preview" className="flex flex-wrap"></div>
                        </div>

                    </div>
                </div>

                <div className="flex justify-end space-x-4">
                    <Button type="button" variant="outline" onClick={handleCancel}>Cancel</Button>
                    <Button type="submit">Save</Button>
                </div>
            </form>
        </div>
    );
};

export default CreateEditStudentComponent;
