"use client";
import React, { useEffect, useState } from 'react';
import CreateEditStudentComponent from './CreateEditStudentComponent';

const EditStudentComponent = () => {
    const [studentData, setStudentData] = useState(null);

    useEffect(() => {
        const fetchStudentData = async () => {
            const id = new URLSearchParams(window.location.search).get('id');
            try {
                // Replace with your actual API endpoint
                const response = await fetch(`/api/students/${id}`);
                const data = await response.json();
                setStudentData(data);
            } catch (error) {
                console.error('Failed to fetch student data', error);
                // Handle error (e.g., show toast, redirect)
            }
        };

        fetchStudentData();
    }, []);

    return (
        <div>
            {studentData && <CreateEditStudentComponent initialData={studentData} />}
        </div>
    );
};

export default EditStudentComponent;