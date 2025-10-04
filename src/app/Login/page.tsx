"use client";
import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Briefcase } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

interface LoginPageProps {
  onBackToHome: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onBackToHome }) => {
  const { login } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const validateField = (field: string, value: string) => {
    if (field === "email") {
      if (!value) {
        return "Email is required";
      }
      if (!emailRegex.test(value)) {
        return "Please enter a valid email address";
      }
      return "";
    }
    if (field === "password") {
      if (!value) {
        return "Password is required";
      }
      if (!passwordRegex.test(value)) {
        return "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character";
      }
      return "";
    }
    return "";
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate both fields before submission
    const emailError = validateField("email", formData.email);
    const passwordError = validateField("password", formData.password);

    setErrors({ email: emailError, password: passwordError });

    if (emailError || passwordError) {
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const adminEmail = process.env.ADMIN_EMAIL ;
      const adminPassword = process.env.ADMIN_PASSWORD ;

      if (
        formData.email === adminEmail &&
        formData.password === adminPassword
      ) {
        // Admin login: redirect to AdminDashboard
        const adminUser = {
          id: "admin_" + Math.random().toString(36).substr(2, 9),
          fullName: "Admin",
          email: formData.email,
          profilePicture: undefined,
          isAdmin: true, // Add isAdmin flag for admin role
        };
        login(adminUser);
        router.push("/adminDashboard"); // Assuming /admin is the route for AdminDashboard
      } else {
        // Regular user login (mock)
        const mockUser = {
          id: Math.random().toString(36).substr(2, 9),
          fullName: "John Doe",
          email: formData.email,
          profilePicture: undefined,
        };
        login(mockUser);
      }
      setIsLoading(false);
      onBackToHome();
    }, 10000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-8 text-center">
          <div className="mx-auto w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
            <Briefcase className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-blue-100">Sign in to your FreelanceHub account</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 text-black ${
                    errors.email
                      ? "border-red-500 focus:ring-red-500/20 focus:border-red-500"
                      : "border-gray-200 focus:ring-blue-500/20 focus:border-blue-500"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200  text-black ${
                    errors.password
                      ? "border-red-500 focus:ring-red-500/20 focus:border-red-500"
                      : "border-gray-200 focus:ring-blue-500/20 focus:border-blue-500"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              /* !! (double negation): Coerces value to boolean (true/false) by inverting twice.
               !!"" (empty str) -> false (no error); !!"error" (non-empty) -> true (has error).
               Ensures disabled prop gets explicit boolean, avoiding React warnings.*/
              disabled={isLoading || !!errors.email || !!errors.password}
              className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 font-medium transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={() => router.push("/AccountType")}
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Sign up here
              </button>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100">
            <button
              onClick={onBackToHome}
              className="w-full text-gray-500 hover:text-gray-700 text-sm transition-colors"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;