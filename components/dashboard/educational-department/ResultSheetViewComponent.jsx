"use client";
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowBigLeft, Printer } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ResultSheetViewComponent({ resultData }) {
    const router = useRouter();
    const data = resultData;

    useEffect(() => {
        const printStyles = `
            @media print {
                body * {
                    visibility: hidden;
                }
                .printable-area, .printable-area * {
                    visibility: visible;
                }
                .printable-area {
                    position: absolute !important;
                    left: 0 !important;
                    top: 0 !important;
                    width: 210mm !important;
                    height: auto !important;
                    margin: 0 !important;
                    padding: 15mm !important;
                    box-sizing: border-box !important;
                    background: white !important;
                    font-size: 12px !important;
                    line-height: 1.4 !important;
                    box-shadow: none !important;
                }
                .no-print {
                    display: none !important;
                }
                @page {
                    size: A4;
                    margin: 0;
                }
            }
        `;

        const styleElement = document.createElement('style');
        styleElement.textContent = printStyles;
        document.head.appendChild(styleElement);

        return () => {
            document.head.removeChild(styleElement);
        };
    }, []);

    const handlePrint = () => {
        setTimeout(() => {
            window.print();
        }, 100);
    };

    return (
        <div className="p-5 bg-gray-100 min-h-screen">
            {/* Header with controls (excluded from print) */}
            <div className="mb-4 flex justify-between items-center no-print">
                <div className="flex items-center gap-x-4">
                    <div>
                        <p
                            className="cursor-pointer text-accent flex items-center gap-x-2 bg-gray-200 rounded-full"
                            onClick={() => router.back()}
                        >
                            <ArrowBigLeft size={40} />
                        </p>
                    </div>
                    <h1 className="text-2xl font-bold">Result Sheet View</h1>
                </div>

                <Button
                    onClick={handlePrint}
                    className="flex items-center gap-x-2"
                >
                    <Printer size={16} /> Print Result Sheet
                </Button>
            </div>

            {/* Printable Result Sheet */}
            <div className="printable-area max-w-4xl mx-auto bg-white shadow-lg p-8 rounded-lg">
                {/* Header with logos and school info */}
                <div className="flex items-center justify-between mb-8">
                    <div className="w-20 h-20 rounded-full border-4 border-green-600 flex items-center justify-center">
                        <div className="w-12 h-12 bg-green-600 rounded-sm flex items-center justify-center">
                            <span className="text-white font-bold text-lg">🏠</span>
                        </div>
                    </div>

                    <div className="text-center flex-1 mx-8">
                        <h1 className="text-2xl font-bold text-green-700 mb-2">
                            {data.schoolInfo.name}
                        </h1>
                        <p className="text-lg text-green-600 mb-1">
                            {data.schoolInfo.subtitle}
                        </p>
                        <p className="text-orange-500 font-medium border-t border-b border-orange-400 py-1">
                            {data.schoolInfo.phone}
                        </p>
                    </div>

                    <div className="w-20 h-20 rounded-full border-4 border-green-600 flex items-center justify-center">
                        <div className="w-12 h-12 bg-green-600 rounded-sm flex items-center justify-center">
                            <span className="text-white font-bold text-lg">🏠</span>
                        </div>
                    </div>
                </div>

                {/* Result Sheet Title */}
                <div className="text-center mb-8">
                    <h2 className="text-xl font-bold mb-2">বার্ষিক পরীক্ষা</h2>
                    <h3 className="text-lg">Marksheet</h3>
                </div>

                {/* Student Information */}
                <div className="grid grid-cols-2 gap-x-8 mb-6 text-sm">
                    <div className="space-y-2">
                        <div className="flex">
                            <span className="font-medium w-24">Name:</span>
                            <span>{data.studentInfo.name}</span>
                        </div>
                        <div className="flex">
                            <span className="font-medium w-24">Roll No:</span>
                            <span>{data.studentInfo.rollNo}</span>
                        </div>
                        <div className="flex">
                            <span className="font-medium w-24">Register No:</span>
                            <span>{data.studentInfo.registerNo}</span>
                        </div>
                    </div>
                    <div className="space-y-2 text-right">
                        <div className="flex justify-end">
                            <span className="font-medium w-32 text-left">Class:</span>
                            <span className="w-20 text-right">{data.studentInfo.class}</span>
                        </div>
                        <div className="flex justify-end">
                            <span className="font-medium w-32 text-left">Year:</span>
                            <span className="w-20 text-right">{data.studentInfo.year}</span>
                        </div>
                        <div className="flex justify-end">
                            <span className="font-medium w-32 text-left">Merit Position:</span>
                            <span className="w-20 text-right">{data.studentInfo.meritPosition}</span>
                        </div>
                    </div>
                </div>

                {/* Marks Table */}
                <div className="border border-gray-400 mb-6">
                    <div className="grid grid-cols-6 bg-gray-100 border-b border-gray-400 text-sm font-medium">
                        <div className="p-2 border-r border-gray-400 text-center">#</div>
                        <div className="p-2 border-r border-gray-400 text-center">Subject</div>
                        <div className="p-2 border-r border-gray-400 text-center">Subject Mark</div>
                        <div className="p-2 border-r border-gray-400 text-center">Obtained Mark</div>
                        <div className="p-2 border-r border-gray-400 text-center">Grade</div>
                        <div className="p-2 text-center">GPA</div>
                    </div>

                    {data.subjects.map((subject, index) => (
                        <div key={subject.id} className="grid grid-cols-6 border-b border-gray-300 text-sm">
                            <div className="p-2 border-r border-gray-300 text-center">{index + 1}</div>
                            <div className="p-2 border-r border-gray-300">{subject.subject}</div>
                            <div className="p-2 border-r border-gray-300 text-center">{subject.subjectMark}</div>
                            <div className="p-2 border-r border-gray-300 text-center">{subject.obtainedMark}</div>
                            <div className="p-2 border-r border-gray-300 text-center">{subject.grade}</div>
                            <div className="p-2 text-center">{subject.gpa}</div>
                        </div>
                    ))}

                    <div className="grid grid-cols-6 bg-gray-50 font-medium text-sm">
                        <div className="p-2 border-r border-gray-300 text-center">Total</div>
                        <div className="p-2 border-r border-gray-300"></div>
                        <div className="p-2 border-r border-gray-300 text-center">{data.totalMarks}</div>
                        <div className="p-2 border-r border-gray-300 text-center">{data.obtainedTotalMarks}</div>
                        <div className="p-2 border-r border-gray-300 text-center">GPA: {data.overallGPA}</div>
                        <div className="p-2 text-center">{data.result}</div>
                    </div>
                </div>

                {/* Signature Section */}
                <div className="mt-16">
                    <div className="grid grid-cols-3 gap-8 mb-4">
                        <div className="text-center">
                            <div className="border-t border-black w-full mb-2"></div>
                            <p className="text-sm">Teacher Signature</p>
                        </div>
                        <div className="text-center">
                            <div className="border-t border-black w-full mb-2"></div>
                            <p className="text-sm">Guardian Signature</p>
                        </div>
                        <div className="text-center">
                            <div className="border-t border-black w-full mb-2"></div>
                            <p className="text-sm">Principal Signature</p>
                        </div>
                    </div>

                    <div className="text-right mt-8">
                        <div className="border-t border-black w-32 ml-auto mb-2"></div>
                        <p className="text-sm">তারিখ</p>
                    </div>
                </div>

                {/* Footer Note */}
                <div className="mt-8 border border-black p-2">
                    <p className="text-xs text-center">
                        সমস্ত কাজের ফলাফল নিজের কাজে নিয়মিত উপরে আর প্রতিটি বার্ষিক যা নিয়মিত করেছে, তাই পারে । সহীহ আমল বুখারী ।
                    </p>
                </div>
            </div>
        </div>
    );
}
