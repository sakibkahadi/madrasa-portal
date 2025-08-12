// pages/otp-verification.js

"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function OTPVerification() {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const router = useRouter();
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    const newOtp = [...otp];
    
    // Handle input value
    if (/^\d*$/.test(value)) {
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to the next input if input is valid
      if (value && index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }

    // Handle backspace
    if (value === "") {
      newOtp[index] = "";
      setOtp(newOtp);
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData("Text").slice(0, 6); // Limit to 6 characters
    const newOtp = pastedData.split("").slice(0, 6); // Split and limit to 6 digits

    setOtp(newOtp);
    newOtp.forEach((_, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = newOtp[index]; // Set value for each input
      }
    });

    // Focus on the next empty input
    const nextEmptyIndex = newOtp.findIndex((digit) => digit === "");
    if (nextEmptyIndex !== -1 && inputRefs.current[nextEmptyIndex]) {
      inputRefs.current[nextEmptyIndex].focus();
    }
  };

  const handleNext = () => {
    // Logic to verify OTP goes here
    console.log("OTP entered:", otp.join("")); // For debugging
    router.push("/change-password");
  };

  useEffect(() => {
    // Focus on the first input when the component mounts
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  return (
    
    <div 
      className="flex min-h-screen items-center justify-center p-4"
      style={{ 
        backgroundImage: "url('/assets/loginBg1.jpg')", // Replace with your image path
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <Card className="shadow-lg bg-white bg-opacity-30 backdrop-blur-md rounded-lg border border-white border-opacity-20">
        <CardHeader>
          <CardTitle className=" text-primary">OTP Verification</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            {otp.map((value, index) => (
              <Input
                key={index}
                type="text"
                value={value}
                onChange={(e) => handleChange(index, e.target.value)}
                onPaste={handlePaste}
                maxLength={1}
                ref={(el) => (inputRefs.current[index] = el)} // Save reference to input
                className="w-16 h-16 text-center text-lg text-primary" // Larger input fields
              />
            ))}
          </div>
          <Button onClick={handleNext} className="mt-4">
            Next
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
