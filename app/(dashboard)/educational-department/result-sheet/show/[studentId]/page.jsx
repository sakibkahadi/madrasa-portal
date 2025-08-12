import ResultSheetViewComponent from '@/components/dashboard/educational-department/ResultSheetViewComponent'

export default async function ParentResultSheetComponent({ params }) {
  const { studentId } = params;

    // This is how you would pass data from parent component
    const dynamicResultData = {
        studentInfo: {
            name: "আহমেদ হাসান",
            rollNo: "15",
            registerNo: "M25053015",
            class: "৮ম",
            year: "2025-26",
            meritPosition: "3"
        },
        schoolInfo: {
            name: "বেফাকুল মাদরিস মাদরাসা",
            subtitle: "ম্যানেজমেন্ট সফটওয়ার",
            phone: "মোবাইল নাম্বার ০১৮০৪-৯০৯৫০০"
        },
        subjects: [
            {
                id: 1,
                subject: "কোরআন মজিদ",
                subjectMark: "100",
                obtainedMark: "92",
                grade: "জাইয়িদ জিদ্দান (A+)",
                gpa: "5.00"
            },
            {
                id: 2,
                subject: "হাদিস শরীফ",
                subjectMark: "100",
                obtainedMark: "88",
                grade: "জাইয়িদ জিদ্দান (A+)",
                gpa: "5.00"
            },
            {
                id: 3,
                subject: "ফিকহ",
                subjectMark: "100",
                obtainedMark: "85",
                grade: "জাইয়িদ (A)",
                gpa: "4.00"
            },
            {
                id: 4,
                subject: "আরবি ব্যাকরণ",
                subjectMark: "100",
                obtainedMark: "78",
                grade: "জাইয়িদ (A)",
                gpa: "4.00"
            },
            {
                id: 5,
                subject: "বাংলা",
                subjectMark: "100",
                obtainedMark: "82",
                grade: "জাইয়িদ (A)",
                gpa: "4.00"
            },
            {
                id: 6,
                subject: "ইংরেজি",
                subjectMark: "100",
                obtainedMark: "74",
                grade: "মাকবুল (B+)",
                gpa: "3.50"
            }
        ],
        totalMarks: "600",
        obtainedTotalMarks: "499",
        overallGPA: "4.25",
        result: "পাস"
    };

    return(
        <div>
            <ResultSheetViewComponent resultData={dynamicResultData}  />
        </div>
    );
}