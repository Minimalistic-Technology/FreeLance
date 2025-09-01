"use client";

import React, { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Upload,
  MapPin,
  DollarSign,
  Clock,
  Award,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Camera,
  Briefcase,
  Star,
  Target,
  Calendar,
  UserCheck,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface FormData {
  // Account Information
  TypeofAccount: string;
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  profilePicture: File | null;

  // Professional Information
  title: string;
  location: string;
  hourlyRate: string;
  skills: string[];
  description: string;
  availability: string;

  // Additional Profile Metrics
  yearsExperience: string;
  completedJobs: string;

  // System Generated Fields
  responseTime: string;
  successRate: number;
  badges: string[];
}

interface ValidationErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  profilePicture?: string;
  title?: string;
  location?: string;
  hourlyRate?: string;
  skills?: string;
  description?: string;
  availability?: string;
  yearsExperience?: string;
}

interface SignupPageProps {
  onSuccess: () => void;
  onBack: () => void;
}

const SignupPage: React.FC<SignupPageProps> = ({ onSuccess, onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const { login } = useAuth();
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [formData, setFormData] = useState<FormData>({
    TypeofAccount: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePicture: null,
    title: "",
    location: "",
    hourlyRate: "",
    skills: [],
    description: "",
    availability: "",
    yearsExperience: "",
    completedJobs: "",
    responseTime: "Not calculated yet",
    successRate: 0,
    badges: [],
  });

  const skillOptions = [
    "React",
    "Node.js",
    "TypeScript",
    "JavaScript",
    "Python",
    "Java",
    "Figma",
    "Sketch",
    "Adobe XD",
    "Photoshop",
    "Illustrator",
    "UI/UX Design",
    "Web Development",
    "Mobile Development",
    "Data Science",
    "Machine Learning",
    "DevOps",
    "AWS",
    "Docker",
    "Content Writing",
    "SEO",
    "Digital Marketing",
    "Project Management",
  ];

  const availabilityOptions = [
    "Immediate",
    "1 week",
    "2 weeks",
    "1 month",
    "2+ months",
  ];

  const validateField = (
    field: keyof FormData,
    value: string | File | null | string[]
  ): string | undefined => {
    switch (field) {
      case "fullName":
        if (!value || (typeof value === "string" && value.trim().length < 2)) {
          return "Full name must be at least 2 characters long";
        }
        if (typeof value === "string" && value.trim().length > 50) {
          return "Full name must be less than 50 characters";
        }
        if (typeof value === "string" && !/^[a-zA-Z\s]+$/.test(value.trim())) {
          return "Full name can only contain letters and spaces";
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

      case "title":
        if (!value || (typeof value === "string" && value.trim().length < 3)) {
          return "Professional title must be at least 3 characters long";
        }
        if (typeof value === "string" && value.trim().length > 100) {
          return "Professional title must be less than 100 characters";
        }
        break;

      case "location":
        if (!value || (typeof value === "string" && value.trim().length < 2)) {
          return "Location must be at least 2 characters long";
        }
        break;

      case "hourlyRate":
        if (!value || typeof value !== "string") {
          return "Hourly rate is required";
        }
        const rateMatch = value.match(/\$?(\d+(?:\.\d{1,2})?)/);
        if (!rateMatch) {
          return "Please enter a valid hourly rate (e.g., $50 or 50)";
        }
        const rate = parseFloat(rateMatch[1]);
        if (rate < 5) {
          return "Hourly rate must be at least $5";
        }
        if (rate > 1000) {
          return "Hourly rate must be less than $1000";
        }
        break;

      case "skills":
        if (Array.isArray(value) && value.length === 0) {
          return "Please select at least one skill";
        }
        if (Array.isArray(value) && value.length > 15) {
          return "Please select no more than 15 skills";
        }
        break;

      case "description":
        if (!value || (typeof value === "string" && value.trim().length < 50)) {
          return "Description must be at least 50 characters long";
        }
        if (typeof value === "string" && value.trim().length > 1000) {
          return "Description must be less than 1000 characters";
        }
        break;

      case "availability":
        if (!value || typeof value !== "string") {
          return "Please select your availability";
        }
        break;

      case "yearsExperience":
        if (!value || typeof value !== "string") {
          return "Please select your years of experience";
        }
        break;
    }
    return undefined;
  };

  const validateStep = (step: number): boolean => {
    const newErrors: ValidationErrors = {};
    let fieldsToValidate: (keyof FormData)[] = [];

    switch (step) {
      case 1:
        fieldsToValidate = [
          "fullName",
          "email",
          "password",
          "confirmPassword",
          "profilePicture",
        ];
        break;
      case 2:
        fieldsToValidate = [
          "title",
          "location",
          "hourlyRate",
          "skills",
          "description",
          "availability",
        ];
        break;
      case 3:
        fieldsToValidate = ["yearsExperience"];
        break;
    }

    fieldsToValidate.forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);

    // Mark all validated fields as touched
    const newTouched: Record<string, boolean> = { ...touched };
    fieldsToValidate.forEach((field) => {
      newTouched[field] = true;
    });
    setTouched(newTouched);

    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    field: keyof FormData,
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

  const handleBlur = (field: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleSkillToggle = (skill: string) => {
    const newSkills = formData.skills.includes(skill)
      ? formData.skills.filter((s) => s !== skill)
      : [...formData.skills, skill];

    setFormData((prev) => ({
      ...prev,
      skills: newSkills,
    }));

    // Validate skills if touched
    if (touched.skills) {
      const error = validateField("skills", newSkills);
      setErrors((prev) => ({ ...prev, skills: error }));
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    handleInputChange("profilePicture", file);
    handleBlur("profilePicture");
  };

  const getInputClassName = (field: keyof FormData) => {
    const baseClass =
      "w-full pl-10 pr-4 py-3 rounded-xl transition-all duration-200";
    if (errors[field] && touched[field]) {
      return `${baseClass} border-2 border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 bg-red-50`;
    }
    return `${baseClass} border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500`;
  };

  const nextStep = () => {
    if (!validateStep(currentStep)) {
      return;
    }

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Initialize system-generated fields when account is created
      const updatedFormData = {
        ...formData,
        responseTime: "Within 1 hour",
        successRate: 95,
        badges: ["New Member", "Profile Complete"],
      };
      setFormData(updatedFormData);

      // Log in the user with their data
      login({
        id: Math.random().toString(36).substr(2, 9), // Generate random ID for template
        fullName: updatedFormData.fullName,
        email: updatedFormData.email,
        profilePicture: updatedFormData.profilePicture
          ? URL.createObjectURL(updatedFormData.profilePicture)
          : undefined,
      });

      setIsSuccess(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center transform transition-all duration-500 scale-100">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Account Created Successfully!
          </h2>
          <p className="text-gray-600 mb-8">
            Welcome to our platform! Your profile has been set up and you're
            ready to start finding amazing opportunities.
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
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden">
        {/* Progress Bar */}
        <div className="bg-gray-50 px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Create Your Account
            </h1>
            <span className="text-sm text-gray-500">
              Step {currentStep} of 3
            </span>
          </div>
          <div className="flex space-x-2">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                  step <= currentStep
                    ? "bg-gradient-to-r from-blue-500 to-indigo-500"
                    : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="p-8">
          {/* Step 1: Account Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  Account Information
                </h2>
                <p className="text-gray-600">
                  Let's start with your basic details
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type of Account
                  </label>
                  <div className="relative">
                    <UserCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value="Freelancer/Job Seeker"
                      disabled
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-600 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="e.g., Michael Chen"
                      value={formData.fullName}
                      onChange={(e) =>
                        handleInputChange("fullName", e.target.value)
                      }
                      onBlur={() => handleBlur("fullName")}
                      className={getInputClassName("fullName")}
                    />
                    {errors.fullName && touched.fullName && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      </div>
                    )}
                  </div>
                  {errors.fullName && touched.fullName && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
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
                    Profile Picture
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="profile-upload"
                    />
                    <label
                      htmlFor="profile-upload"
                      className={`flex items-center justify-center w-full py-3 border-2 border-dashed rounded-xl transition-colors cursor-pointer group ${
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
                            : "Upload Image"}
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
                  <p className="text-xs text-gray-500 mt-1">
                    Max 5MB, JPEG/PNG/GIF/WebP only
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Professional Information */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  Professional Information
                </h2>
                <p className="text-gray-600">
                  Tell us about your professional background
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title / Role *
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="e.g., Senior UI/UX Designer"
                      value={formData.title}
                      onChange={(e) =>
                        handleInputChange("title", e.target.value)
                      }
                      onBlur={() => handleBlur("title")}
                      className={getInputClassName("title")}
                    />
                    {errors.title && touched.title && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      </div>
                    )}
                  </div>
                  {errors.title && touched.title && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.title}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
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
                    Hourly Rate *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="e.g., $55/hr"
                      value={formData.hourlyRate}
                      onChange={(e) =>
                        handleInputChange("hourlyRate", e.target.value)
                      }
                      onBlur={() => handleBlur("hourlyRate")}
                      className={getInputClassName("hourlyRate")}
                    />
                    {errors.hourlyRate && touched.hourlyRate && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      </div>
                    )}
                  </div>
                  {errors.hourlyRate && touched.hourlyRate && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.hourlyRate}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    Enter amount between $5 - $1000 per hour
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Skills *
                  </label>
                  <div
                    className={`border rounded-xl p-4 max-h-48 overflow-y-auto transition-all duration-200 ${
                      errors.skills && touched.skills
                        ? "border-2 border-red-300 bg-red-50"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="flex flex-wrap gap-2">
                      {skillOptions.map((skill) => (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => handleSkillToggle(skill)}
                          className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-200 ${
                            formData.skills.includes(skill)
                              ? "bg-blue-100 text-blue-700 border border-blue-200"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-gray-500">
                      Selected: {formData.skills.length} skills (max 15)
                    </p>
                    {touched.skills && (
                      <button
                        type="button"
                        onClick={() => handleBlur("skills")}
                        className="text-xs text-blue-600 hover:text-blue-700"
                      >
                        Validate selection
                      </button>
                    )}
                  </div>
                  {errors.skills && touched.skills && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.skills}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description / Bio *
                  </label>
                  <div className="relative">
                    <textarea
                      placeholder="Short summary about your expertise and experience... (minimum 50 characters)"
                      value={formData.description}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                      onBlur={() => handleBlur("description")}
                      rows={4}
                      className={`w-full px-4 py-3 rounded-xl transition-all duration-200 resize-none ${
                        errors.description && touched.description
                          ? "border-2 border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 bg-red-50"
                          : "border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      }`}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-gray-500">
                      {formData.description.length}/1000 characters (min 50)
                    </p>
                  </div>
                  {errors.description && touched.description && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.description}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Availability *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <select
                      value={formData.availability}
                      onChange={(e) =>
                        handleInputChange("availability", e.target.value)
                      }
                      onBlur={() => handleBlur("availability")}
                      className={`${getInputClassName(
                        "availability"
                      )} appearance-none bg-white`}
                    >
                      <option value="">Select availability</option>
                      {availabilityOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {errors.availability && touched.availability && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      </div>
                    )}
                  </div>
                  {errors.availability && touched.availability && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.availability}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Additional Profile Metrics */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  Additional Profile Metrics
                </h2>
                <p className="text-gray-600">
                  Help us understand your experience level
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Years of Experience *
                  </label>
                  <div className="relative">
                    <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <select
                      value={formData.yearsExperience}
                      onChange={(e) =>
                        handleInputChange("yearsExperience", e.target.value)
                      }
                      onBlur={() => handleBlur("yearsExperience")}
                      className={`${getInputClassName(
                        "yearsExperience"
                      )} appearance-none bg-white`}
                    >
                      <option value="">Select experience level</option>
                      <option value="0-1">0-1 years</option>
                      <option value="1-3">1-3 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="5-10">5-10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                    {errors.yearsExperience && touched.yearsExperience && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      </div>
                    )}
                  </div>
                  {errors.yearsExperience && touched.yearsExperience && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.yearsExperience}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Completed Jobs{" "}
                    <span className="text-gray-400">(optional)</span>
                  </label>
                  <div className="relative">
                    <Target className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      placeholder="Number of completed projects"
                      value={formData.completedJobs}
                      onChange={(e) =>
                        handleInputChange("completedJobs", e.target.value)
                      }
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    This field is optional and helps showcase your experience
                  </p>
                </div>

                <div className="bg-blue-50 rounded-xl p-6 space-y-4">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    System-Generated Metrics
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-blue-500 mr-2" />
                        <span className="text-gray-700">Response Time</span>
                      </div>
                      <span className="text-gray-500">
                        {formData.responseTime}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-2" />
                        <span className="text-gray-700">Success Rate</span>
                      </div>
                      <span className="text-gray-500">
                        {formData.successRate}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Award className="h-4 w-4 text-purple-500 mr-2" />
                        <span className="text-gray-700">
                          Badges & Achievements
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {formData.badges.length > 0 ? (
                          formData.badges.map((badge, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-md"
                            >
                              {badge}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-500 text-xs">
                            None yet
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
            <button
              onClick={currentStep === 1 ? onBack : prevStep}
              disabled={currentStep === 1 && !onBack}
              className={`flex items-center px-6 py-3 rounded-xl transition-all duration-300 ${
                currentStep === 1 && !onBack
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {currentStep === 1 ? "Back to Account Type" : "Previous"}
            </button>

            <button
              onClick={nextStep}
              className="flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 font-medium transform hover:-translate-y-0.5"
            >
              {currentStep === 3 ? "Create Account" : "Continue"}
              <ArrowRight className="h-4 w-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;































































// 
