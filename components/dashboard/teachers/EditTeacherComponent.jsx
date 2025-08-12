"use client";
import React, { useEffect, useState } from 'react';
import CreateEditTeacherComponent from './CreateEditTeacherComponent';

const EditTeacherComponent = () => {
    const [teacherData, setTeacherData] = useState(null);

    useEffect(() => {
        const fetchTeacherData = async () => {
            const id = new URLSearchParams(window.location.search).get('id');
            try {
                // Replace with your actual API endpoint
                const response = await fetch(`/api/teachers/${id}`);
                const data = await response.json();
                setTeacherData(data);
            } catch (error) {
                console.error('Failed to fetch teacher data', error);
                // Handle error (e.g., show toast, redirect)
            }
        };

        fetchTeacherData();
    }, []);

    return (
        <div>
            {teacherData && <CreateEditTeacherComponent initialData={teacherData} />}
        </div>
    );
};

export default EditTeacherComponent;