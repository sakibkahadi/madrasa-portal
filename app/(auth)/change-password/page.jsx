// pages/change-password.js

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";

export default function ChangePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError(""); // Clear previous errors
    // Logic to change the password goes here
    console.log("Password changed successfully!"); // Placeholder for actual logic
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
        <CardHeader>
          <CardTitle className=" text-primary">Change Password</CardTitle>
        </CardHeader>
        <CardContent>
          {error && <p className="text-red-500">{error}</p>}
          
          <Label htmlFor="new-password" className=" text-primary">New Password</Label>
          
          <div className="relative">
            <Input
              id="new-password"
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required className=" text-primary"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2 text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <Label htmlFor="confirm-password" className="mt-4 text-primary">Confirm Password</Label>
          <div className="relative">
            <Input
              id="confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required className=" text-primary"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-2 top-2 text-gray-500"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <Button onClick={handleSubmit} className="mt-4">
            Change Password
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
