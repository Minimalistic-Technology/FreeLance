"use client";

import React, { useState } from "react";
import {
  Building2,
  Mail,
  Lock,
  MapPin,
  Camera,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface ClientFormData {
  companyName: string;
  email: string;
  password: string;
  confirmPassword: string;
  location: string;
  profilePicture: File | null;
}

interface ValidationErrors {
  companyName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  location?: string;
  profilePicture?: string;
}

interface ClientSignupPageProps {
  onSuccess: () => void;
  onBack: () => void;
}

const ClientSignupPage: React.FC<ClientSignupPageProps> = ({
  onSuccess,
  onBack,
}) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const { login } = useAuth();
  const [formData, setFormData] = useState<ClientFormData>({
    companyName: "",
    email: "",
    password: "",
    confirmPassword: "",
    location: "",
    profilePicture: null,
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (
    field: keyof ClientFormData,
    value: string | File | null
  ): string | undefined => {
    switch (field) {
      case "companyName":
        if (!value || (typeof value === "string" && value.trim().length < 2)) {
          return "Company name must be at least 2 characters long";
        }
        if (typeof value === "string" && value.trim().length > 100) {
          return "Company name must be less than 100 characters";
        }
        break;

      case "email":
        if (!value || typeof value !== "string") {
          return "Email is required";
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return "Please enter a valid email address";
        }
        break;

      case "password":
        if (!value || typeof value !== "string") {
          return "Password is required";
        }
        if (value.length < 8) {
          return "Password must be at least 8 characters long";
        }
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          return "Password must contain at least one uppercase letter, one lowercase letter, and one number";
        }
        break;

      case "confirmPassword":
        if (!value || typeof value !== "string") {
          return "Please confirm your password";
        }
        if (value !== formData.password) {
          return "Passwords do not match";
        }
        break;

      case "location":
        if (!value || (typeof value === "string" && value.trim().length < 2)) {
          return "Location must be at least 2 characters long";
        }
        break;

      case "profilePicture":
        if (value && value instanceof File) {
          const maxSize = 5 * 1024 * 1024; // 5MB
          if (value.size > maxSize) {
            return "File size must be less than 5MB";
          }
          const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/webp",
          ];
          if (!allowedTypes.includes(value.type)) {
            return "Only JPEG, PNG, GIF, and WebP images are allowed";
          }
        }
        break;
    }
    return undefined;
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    Object.keys(formData).forEach((key) => {
      const field = key as keyof ClientFormData;
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    field: keyof ClientFormData,
    value: string | File | null
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }

    // Validate field in real-time if it has been touched
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  const handleBlur = (field: keyof ClientFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    handleInputChange("profilePicture", file);
    handleBlur("profilePicture");
  };

  const handleSubmit = () => {
    // Mark all fields as touched
    const allFields = Object.keys(formData) as (keyof ClientFormData)[];
    const newTouched: Record<string, boolean> = {};
    allFields.forEach((field) => {
      newTouched[field] = true;
    });
    setTouched(newTouched);

    if (!validateForm()) {
      return;
    }

    // Log in the user with their data
    login({
      id: Math.random().toString(36).substr(2, 9), // Generate random ID for template
      fullName: formData.companyName,
      email: formData.email,
      profilePicture: formData.profilePicture
        ? URL.createObjectURL(formData.profilePicture)
        : undefined,
      accountType: "client",
    });

    setIsSuccess(true);
  };

  const getInputClassName = (field: keyof ClientFormData) => {
    const baseClass =
      "w-full pl-10 pr-4 py-3 rounded-xl transition-all duration-200";
    if (errors[field] && touched[field]) {
      return `${baseClass} border-2 border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 bg-red-50`;
    }
    return `${baseClass} border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500`;
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center transform transition-all duration-500 scale-100">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Client Account Created Successfully!
          </h2>
          <p className="text-gray-600 mb-8">
            Welcome to FreelanceHub! Your company profile has been set up and
            you're ready to start hiring talented freelancers.
          </p>

          <button
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 font-medium transform hover:-translate-y-0.5"
            onClick={onSuccess}
          >
            Continue to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold">Create Client Account</h1>
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <Building2 className="h-5 w-5" />
            </div>
          </div>
          <p className="text-blue-100">
            Set up your company profile to start hiring freelancers
          </p>
        </div>

        <div className="p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type of Account
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value="Client"
                  disabled
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-600 cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name *
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="e.g., TechCorp Solutions"
                  value={formData.companyName}
                  onChange={(e) =>
                    handleInputChange("companyName", e.target.value)
                  }
                  onBlur={() => handleBlur("companyName")}
                  className={getInputClassName("companyName")}
                />
                {errors.companyName && touched.companyName && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  </div>
                )}
              </div>
              {errors.companyName && touched.companyName && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.companyName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Email *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="contact@company.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  onBlur={() => handleBlur("email")}
                  className={getInputClassName("email")}
                />
                {errors.email && touched.email && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  </div>
                )}
              </div>
              {errors.email && touched.email && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  onBlur={() => handleBlur("password")}
                  className={getInputClassName("password")}
                />
                {errors.password && touched.password && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  </div>
                )}
              </div>
              {errors.password && touched.password && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.password}
                </p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Must be at least 8 characters with uppercase, lowercase, and
                number
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleInputChange("confirmPassword", e.target.value)
                  }
                  onBlur={() => handleBlur("confirmPassword")}
                  className={getInputClassName("confirmPassword")}
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  </div>
                )}
              </div>
              {errors.confirmPassword && touched.confirmPassword && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Location *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="City, Country"
                  value={formData.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  onBlur={() => handleBlur("location")}
                  className={getInputClassName("location")}
                />
                {errors.location && touched.location && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  </div>
                )}
              </div>
              {errors.location && touched.location && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.location}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Logo
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="company-logo-upload"
                />
                <label
                  htmlFor="company-logo-upload"
                  className={`flex items-center justify-center w-full py-4 border-2 border-dashed rounded-xl transition-colors cursor-pointer group ${
                    errors.profilePicture && touched.profilePicture
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300 hover:border-blue-500"
                  }`}
                >
                  <div
                    className={`flex items-center space-x-2 ${
                      errors.profilePicture && touched.profilePicture
                        ? "text-red-600"
                        : "text-gray-600 group-hover:text-blue-600"
                    }`}
                  >
                    <Camera className="h-5 w-5" />
                    <span>
                      {formData.profilePicture
                        ? formData.profilePicture.name
                        : "Upload Company Logo"}
                    </span>
                  </div>
                </label>
              </div>
              {errors.profilePicture && touched.profilePicture && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.profilePicture}
                </p>
              )}
              <p className="text-xs text-gray-500 mt-2">
                Recommended: Square logo, at least 200x200px, max 5MB
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
            <button
              onClick={onBack}
              className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-300"
            >
              Back to Account Type
            </button>

            <button
              onClick={handleSubmit}
              className="flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 font-medium transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              Create Client Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientSignupPage;