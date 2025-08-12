"use client";

import { SubscriptIcon } from "lucide-react";
import { createContext, useContext, useState, useEffect } from "react";

// Create language context
const LanguageContext = createContext({});

// Available languages
const languages = {
  en: "English",
  bn: "বাংলা", // Bangla
};

// Default translations
const translations = {
  en: {
    // Navigation items
    dashboard: "Dashboard",
    settings: "Settings",
    students: "Students",
    studentsList : "Students List" ,
    studentsAttendance:"Students Attendance",
    studentsLeave:"Students Leave",
    teachersLeave:"Teachers Leave",
    teachersAttendance:"Teacher Attendance",
    salary:"Salary",
    teachers: "Teachers",
    teachersList: "Teachers List",
    educationalDepartment: "Educational Department",
    administrationDepartment: "Administration Department",
    accountingDepartment: "Accounting Department",
    boardingDepartment: "Boarding Department",
    library: "Library",
    mosque: "Mosque",
    helpline: "Helpline",
    subscription : "Subscription package",
    expirationMessage: "Your subscription will expire on" ,
    examRoutine:"Exam Routine",
   resultSheet:"Result Sheet",
    // Common UI elements
    search: "Search",
    notifications: "Notifications",
    viewAllNotifications: "View all notifications",
    newUserRegistered: "New user registered",
    userAccountCreated: "User account was created successfully",
    logout: "Logout",
    adminPortal: "Admin Portal",
    expandSidebar: "Expand sidebar",
    collapseSidebar: "Collapse sidebar",
    
    // Auth
    login: "Login",
    register: "Register",
    forgotPassword: "Forgot Password",
    email: "Email",
    password: "Password",
    submit: "Submit",
    
    // Status messages
    loading: "Loading...",
    successLogin: "Successfully logged in",
    errorLogin: "Login failed",
    successLogout: "Successfully logged out",

    //settings menu
    academicSettings: "Academic Settings",
    session: "Session",
    department: "Department",
    subject: "Subject",
    examination: "Examination",
    class: "Class",
    book: "Book",
    bookAssign: "Book assign",
    responsibility: "Responsibily",
    donorType: "Donor type",
    donationType: "Donation type",
    grade: "Grade system",
    shop: "Shop",
    invoiceDesign: "Invoice design",
    user: "User",
    admissionFee: "Admission fee",
    smsSettings: "SMS setting",
    websiteSettings: "Website Setting",
    security: "Security",
    profileSettings : "Profile Settings",
    pageSettings: "Page Settings" , 
    domainSettings: "Domain Settings" , 

    //Dashboard
    totalStudents: "Total Students",
    totalCollection: "Total Collection",
    totalExpenditure: "Total Expenditure" , 
    totalTeachers: "Total Teachers"
  },
  bn: {
    // Navigation items
    dashboard: "ড্যাশবোর্ড",
    settings: "সেটিংস",
    students: "শিক্ষার্থী",
    studentsList: "শিক্ষার্থী তালিকা",
     studentsAttendance: "শিক্ষার্থীদের হাজিরা",
     studentsLeave: "শিক্ষার্থীদের ছুটি",
     teachersLeave:  "শিক্ষকদের ছুটি",
     teachersAttendance: "শিক্ষকদের হাজিরা",
     salary:"বেতন-ভাতা",
    teachers: "শিক্ষক",
    teachersList: "শিক্ষক তালিকা",
    educationalDepartment: "শিক্ষা বিভাগ",
    administrationDepartment: "প্রশাসন বিভাগ",
    accountingDepartment: "হিসাব বিভাগ",
    boardingDepartment: "বোর্ডিং বিভাগ",
    library: "লাইব্রেরী",
    mosque: "মসজিদ",
    helpline: "হেল্পলাইন",
    expirationMessage: "আপনার সাবস্ক্রিপশন শেষ হবে" ,
    examRoutine: "পরীক্ষার রুটিন",
    resultSheet:"ফলাফল শীট",
    
    // Common UI elements
    search: "অনুসন্ধান",
    notifications: "বিজ্ঞপ্তি",
    viewAllNotifications: "সমস্ত বিজ্ঞপ্তি দেখুন",
    newUserRegistered: "নতুন ব্যবহারকারী নিবন্ধিত হয়েছে",
    userAccountCreated: "ব্যবহারকারীর অ্যাকাউন্ট সফলভাবে তৈরি করা হয়েছে",
    logout: "লগআউট",
    adminPortal: "অ্যাডমিন পোর্টাল",
    expandSidebar: "সাইডবার প্রসারিত করুন",
    collapseSidebar: "সাইডবার সংকুচিত করুন",
    
    // Auth
    login: "লগইন",
    register: "নিবন্ধন",
    forgotPassword: "পাসওয়ার্ড ভুলে গেছেন",
    email: "ইমেইল",
    password: "পাসওয়ার্ড",
    submit: "জমা দিন",
    
    // Status messages
    loading: "লোড হচ্ছে...",
    successLogin: "সফলভাবে লগইন হয়েছে",
    errorLogin: "লগইন ব্যর্থ হয়েছে",
    successLogout: "সফলভাবে লগআউট হয়েছে",

    //settings menu
    academicSettings: "একাডেমিক সেটিংস",
    session: "সেশন",
    department: "বিভাগ",
    subject: "বিষয়",
    examination: "পরীক্ষা",
    class: "ক্লাস",
    book: "বই",
    bookAssign: "বই এসাইন",
    responsibility: "দায়িত্ব",
    donorType: "দাতার ধরণ",
    donationType: "অনুদানের ধরন",
    grade: "গ্রেড সিস্টেম",
    shop: "দোকান",
    invoiceDesign: "ইনভয়েস ডিসাইন ",
    user: "ইউজার",
    admissionFee: "ভর্তি ফি",
    smsSettings: "এসএমএস সেটিংস",
    websiteSettings: "ওয়েবসাইট সেটিংস",
    pageSettings: "পেজ সেটিংস" , 
    domainSettings: "ডোমেইন সেটিংস" ,
    security: "নিরাপত্তা",
    profileSettings : "প্রোফাইল সেটিংস",
    subscription : "সাবস্ক্রিপশন",

    //Dashbaord
    totalStudents: "মোট শিক্ষার্থী",
    totalCollection: "সর্বমোট সংগ্রহ",
    totalExpenditure: "সর্বমোট খরচ" , 
    totalTeachers: "সর্বমোট শিক্ষক"
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");
  const [currentTranslations, setCurrentTranslations] = useState(translations.en);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored language preference
    const storedLanguage = localStorage.getItem("language") || "en";
    setLanguage(storedLanguage);
    
    // Load translations
    loadTranslations(storedLanguage);
  }, []);

  const loadTranslations = async (lang) => {
    setLoading(true);
    try {
      setCurrentTranslations(translations[lang] || translations.en);
    } catch (error) {
      console.error("Failed to load translations:", error);
      setCurrentTranslations(translations.en);
    } finally {
      setLoading(false);
    }
  };

  const changeLanguage = (lang) => {
    if (languages[lang]) {
      setLanguage(lang);
      localStorage.setItem("language", lang);
      loadTranslations(lang);
    }
  };

  // Helper function to get translated text
  const t = (key) => {
    return currentTranslations[key] || key;
  };

  const contextValue = {
    language,
    languages,
    changeLanguage,
    t,
    loading,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);