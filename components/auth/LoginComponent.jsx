"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";

export default function LoginComponent() {
  const [formData, setFormData] = useState({
    email: "lamptechs@university.com",  // Set default phone number
    password: "lamptechs@university.com",  // Set default password
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // const { login } = useAuth();
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const {email,password} = formData;
      console.log("before")
      console.log(email,password)
      const result = await signIn("credentials",{
        email,password,redirect:false
      })
      console.log('after')
      if (result.error) {
        setError( "Invalid email or password.");
      } else {
        router.push("/dashboard")
        router.refresh()
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    router.push("/forget-password");
  };

  return (
    <div 
      className="flex min-h-screen items-center justify-center p-4"
      style={{ 
        backgroundImage: "url('/assets/bannerBg.png')", // Replace with your image path
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <Card className="w-full max-w-md shadow-lg bg-white bg-opacity-30 backdrop-blur-md rounded-lg border border-white border-opacity-20">
        <CardHeader className="space-y-4 text-center">
          <CardTitle className="text-2xl font-bold text-white">Admin Login</CardTitle>
          <CardDescription className=" text-white">
            Enter your credentials to access the admin dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email" className=" text-white">Phone Number</Label>
              <Input
                id="email"
                name="email"
                type="tel"
                placeholder="01987654321"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="tel"
                className="w-full text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className=" text-white">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  className="w-full pr-10 text-white"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Log in"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm text-text-muted">
          <div className="w-full">
            <p className="mb-2 underline cursor-pointer" onClick={handleForgotPassword}>Forget Password?</p>
            {/* <Button 
              type="button" 
              onClick={handleForgotPassword} 
              className="w-full"
            >
              Forgot Password?
            </Button> */}
            © {new Date().getFullYear()} Admin Dashboard
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
