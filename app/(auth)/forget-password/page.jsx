// pages/forget-password.js

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ForgetPassword() {
  const [phone, setPhone] = useState("");
  const router = useRouter();

  const handleNext = () => {
    // Logic to handle phone number submission goes here
    router.push("/otp-verification");
  };

  return (
    <div 
      className="flex min-h-screen items-center justify-center p-4"
      style={{ 
        backgroundImage: "url('/assets/loginBg1.jpg')", // Replace with your image path
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <Card className="w-full max-w-md shadow-lg bg-white bg-opacity-30 backdrop-blur-md rounded-lg border border-white border-opacity-20">
        <CardHeader className=" text-primary">
          <CardTitle>Forgot Password</CardTitle>
        </CardHeader>
        <CardContent>
          <Label htmlFor="phone" className=" text-primary">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required className=" text-primary"
          />
          <Button onClick={handleNext} className="mt-4">
            Next
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
