"use client";
import React from 'react';

const ExamRoutineListByClass = ({ data }) => {
  // Destructure the data
  const { class: className, session, exam, routineData = [] } = data || {};

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Exam Routine Details</h1>

      {/* Class/Session/Exam Info Table */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Exam Information</h2>
        <table className="min-w-full border border-gray-300 mb-6">
          <thead className="bg-[#E5E7EB]">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-bold text-[#333333] uppercase tracking-wider border border-gray-300">Class</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-[#333333] uppercase tracking-wider border border-gray-300">Session</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-[#333333] uppercase tracking-wider border border-gray-300">Exam</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-3 border border-gray-300">{className || '-'}</td>
              <td className="px-4 py-3 border border-gray-300">{session || '-'}</td>
              <td className="px-4 py-3 border border-gray-300">{exam || '-'}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Routine Data Table */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Exam Schedule</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-[#E5E7EB]">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold text-[#333333] uppercase tracking-wider border border-gray-300">Sn</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-[#333333] uppercase tracking-wider border border-gray-300">Subject</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-[#333333] uppercase tracking-wider border border-gray-300">Date</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-[#333333] uppercase tracking-wider border border-gray-300">Day</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-[#333333] uppercase tracking-wider border border-gray-300">Room</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-[#333333] uppercase tracking-wider border border-gray-300">Time</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-[#333333] uppercase tracking-wider border border-gray-300">Marks</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-[#333333] uppercase tracking-wider border border-gray-300">Summary</th>
              </tr>
            </thead>
            <tbody>
              {routineData.length > 0 ? (
                routineData.map((routine,index) => (
                  <tr key={routine.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 border border-gray-300">{index +1}</td>
                    <td className="px-4 py-3 border border-gray-300">{routine.subject}</td>
                    <td className="px-4 py-3 border border-gray-300">{routine.date || '-'}</td>
                    <td className="px-4 py-3 border border-gray-300">{routine.day || '-'}</td>
                    <td className="px-4 py-3 border border-gray-300">{routine.room || '-'}</td>
                    <td className="px-4 py-3 border border-gray-300">{routine.time || '-'}</td>
                    <td className="px-4 py-3 border border-gray-300">{routine.marks || '-'}</td>
                    <td className="px-4 py-3 border border-gray-300">{routine.summary || '-'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-4 py-3 text-center border border-gray-300 text-gray-500">
                    No exam routine data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExamRoutineListByClass;