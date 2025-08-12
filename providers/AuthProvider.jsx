"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

// Create auth context
const AuthContext = createContext({});

// Auth routes (these don't require authentication)
const authRoutes = ["/login", "/register", "/forget-password" , "/otp-verification" , "/change-password"];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check for stored session on initial load
    const checkSession = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        
        if (token) {
          // Mock user data - in a real app, you would fetch user data from your API
          setUser({
            id: "1",
            name: "Admin User",
            email: "admin@example.com",
            role: "admin",
          });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Session check failed:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  // Handle route protection
  useEffect(() => {
    if (!loading) {
      if (!user && !authRoutes.includes(pathname)) {
        router.push("/login");
      }
      if (user && authRoutes.includes(pathname)) {
        router.push("/dashboard");
      }
    }
  }, [user, loading, pathname, router]);

  // Login function
  const login = async (credentials) => {
    try {
      setLoading(true);
      
      // Simulate API response
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update this condition to match the new credentials
      if (credentials.phone === "01987654321" && credentials.password === "admin123") {
        const userData = {
          id: "1",
          name: "Admin User",
          email: "admin@example.com",
          phone: "01987654321",
          role: "admin",
        };
        
        setUser(userData);
        localStorage.setItem("adminToken", "mock-jwt-token");
        
        return { success: true };
      }
      
      return { 
        success: false, 
        error: "Invalid credentials" 
      };
    } catch (error) {
      console.error("Login error:", error);
      return { 
        success: false, 
        error: "An error occurred during login" 
      };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setLoading(true);
      localStorage.removeItem("adminToken");
      setUser(null);
      router.push("/");
      return { success: true };
    } catch (error) {
      console.error("Logout error:", error);
      return { success: false, error: "Logout failed" };
    } finally {
      setLoading(false);
    }
  };

  const contextValue = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
