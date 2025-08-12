"use client";

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LoadingSpinner({ className, size = "medium", fullScreen = false }) {
  // Map size to Tailwind classes
  const sizeClasses = {
    small: "h-4 w-4",
    medium: "h-8 w-8",
    large: "h-12 w-12",
  };
  
  // Base spinner component
  const spinner = (
    <div className={cn("flex items-center justify-center", className)}>
      <Loader2 className={cn(
        "animate-spin text-primary", 
        sizeClasses[size] || sizeClasses.medium
      )} />
    </div>
  );
  
  // If full screen, wrap with centered container
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        {spinner}
      </div>
    );
  }
  
  return spinner;
}