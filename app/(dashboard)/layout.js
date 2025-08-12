"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/providers/AuthProvider";
import LoadingSpinner from "@/components/ui/loading-spinner";
import MainSidebar from "@/components/layout/MainSidebar";
import MainHeader from "@/components/layout/MainHeader";

export default function DashboardLayout({ children }) {
 
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Check if sidebar state is saved in localStorage
    const savedState = localStorage.getItem("sidebarCollapsed");
    if (savedState !== null) {
      setIsSidebarCollapsed(savedState === "true");
    }
    
    setIsMounted(true);
  }, []);

  const toggleSidebar = () => {
    const newState = !isSidebarCollapsed;
    setIsSidebarCollapsed(newState);
    localStorage.setItem("sidebarCollapsed", newState.toString());
  };

  if (!isMounted) {
    return <LoadingSpinner />;
  }

  return (
    <div 
      className="min-h-screen bg-background-light" 
      // style={{
      //   backgroundImage: "url('/assets/bg1.jpg')",
      //   backgroundSize: "100%",
      //   backgroundPosition: "center",
      // }}
    >
      <MainSidebar 
        isCollapsed={isSidebarCollapsed} 
        toggleSidebar={toggleSidebar} 
      />
      <div className={`transition-all duration-300 ease-in-out ${
        isSidebarCollapsed 
          ? "lg:pl-20" 
          : "lg:pl-64"
      }`}>
        <MainHeader 
          isCollapsed={isSidebarCollapsed} 
          toggleSidebar={toggleSidebar} 
        />
        <main className="sm:pt-[70px] p-4 sm:p-6 sm:mt-8">
          <div className="rounded-lg bg-background-card p-4 md:p-6 shadow-sm">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
