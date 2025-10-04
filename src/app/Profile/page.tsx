
"use client";

import React from "react";
import {
  User,
  Mail,
  MapPin,
  Star,
  Briefcase,
  Calendar,
  Edit,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const UserProfile: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-gray-100 dark:border-gray-600">
            <User className="h-8 w-8 text-gray-400 dark:text-gray-300" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Not Logged In
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Please log in to view your profile.
          </p>
        </div>
      </div>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const isClient = user.accountType === "client";
  const isFreelancer = !isClient;

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="bg-white dark:bg-[#3B3F42] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-600 p-8 mb-6 hover:shadow-xl transition-all duration-300">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Left Side - Profile Info */}
            <div className="flex items-center gap-6">
              {/* Profile Picture */}
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-full flex items-center justify-center overflow-hidden shadow-sm border border-gray-100 dark:border-gray-600">
                  {user.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                      {getInitials(user.fullName)}
                    </span>
                  )}
                </div>
                <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg transform hover:scale-110">
                  <Edit className="h-3 w-3" />
                </button>
              </div>

              {/* Name and Basic Info */}
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1">
                  {user.fullName}
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mb-2 font-medium">
                  {isFreelancer ? "Full-Stack Developer" : "Client"}
                </p>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  Online
                </div>
              </div>
            </div>

            {/* Right Side - Key Stats */}
            <div className="flex gap-4">
              {isFreelancer ? (
                <>
                  <div className="text-center p-4 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="text-xl font-bold text-gray-900 dark:text-white">
                      4.9
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                      Rating
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="text-xl font-bold text-gray-900 dark:text-white">
                      47
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                      Jobs
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="text-xl font-bold text-gray-900 dark:text-white">
                      $75
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                      Per Hour
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center p-4 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="text-xl font-bold text-gray-900 dark:text-white">
                      12
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                      Projects
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="text-xl font-bold text-gray-900 dark:text-white">
                      8
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                      Hired
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="text-xl font-bold text-gray-900 dark:text-white">
                      $45k
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                      Spent
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <div className="bg-white dark:bg-[#3B3F42] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-600 p-6 hover:shadow-xl transition-all duration-300">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                {isFreelancer ? "About" : "Company Overview"}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {isFreelancer
                  ? "Passionate full-stack developer with 6+ years of experience building scalable web applications. Specialized in React, Node.js, and cloud architecture."
                  : "We are a technology company focused on building innovative solutions that transform businesses. Our team delivers cutting-edge digital experiences."}
              </p>
            </div>

            {/* Skills or Services */}
            <div className="bg-white dark:bg-[#3B3F42] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-600 p-6 hover:shadow-xl transition-all duration-300">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                {isFreelancer ? "Skills" : "Services"}
              </h2>
              <div className="flex flex-wrap gap-2">
                {isFreelancer
                  ? ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS"].map(
                      (skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 text-sm rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600/50 transition-all duration-200 cursor-pointer"
                        >
                          {skill}
                        </span>
                      )
                    )
                  : [
                      "Web Development Apps",
                      "Mobile Apps",
                      "UI/UX Templates",
                      "Consulting",
                    ].map((service, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 text-sm rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600/50 transition-all duration-200 cursor-pointer"
                      >
                        {service}
                      </span>
                    ))}
              </div>
            </div>

            {/* Recent Work */}
            <div className="bg-white dark:bg-[#3B3F42] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-600 p-6 hover:shadow-xl transition-all duration-300">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                {isFreelancer ? "Recent Work" : "Recent Projects"}
              </h2>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-r-lg py-3 transition-all duration-200">
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    E-commerce Platform
                  </h3>
                  <p className="text-sm text-blue-600 dark:text-blue-400 mb-1 font-medium">
                    Completed 2 weeks ago
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Built a modern e-commerce platform with React and Node.js
                  </p>
                  {isFreelancer && (
                    <div className="flex items-center mt-2">
                      <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                      <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                        5.0 rating
                      </span>
                    </div>
                  )}
                </div>
                <div className="border-l-4 border-blue-500 pl-4 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-r-lg py-3 transition-all duration-200">
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    Mobile App Development
                  </h3>
                  <p className="text-sm text-blue-600 dark:text-blue-400 mb-1 font-medium">
                    Completed 1 month ago
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Developed a cross-platform mobile app for fitness tracking
                  </p>
                  {isFreelancer && (
                    <div className="flex items-center mt-2">
                      <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                      <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                        4.9 rating
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="bg-white dark:bg-[#3B3F42] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-600 p-6 hover:shadow-xl transition-all duration-300">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Contact
              </h3>
              <div className="space-y-4">
                <div className="flex items-center p-3 rounded-lg bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mr-3 shadow-sm">
                    <Mail className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                    {user.email}
                  </span>
                </div>
                <div className="flex items-center p-3 rounded-lg bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mr-3 shadow-sm">
                    <MapPin className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                    {isFreelancer ? "San Francisco, CA" : "New York, NY"}
                  </span>
                </div>
                <div className="flex items-center p-3 rounded-lg bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mr-3 shadow-sm">
                    <Calendar className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                    Member since January 2024
                  </span>
                </div>
              </div>
            </div>

            {/* Stats Summary */}
            <div className="bg-white dark:bg-[#3B3F42] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-600 p-6 hover:shadow-xl transition-all duration-300">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Summary
              </h3>
              <div className="space-y-4">
                {isFreelancer ? (
                  <>
                    <div className="flex justify-between p-3 rounded-lg bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200">
                      <span className="text-gray-600 dark:text-gray-300 font-medium">
                        Total Earnings
                      </span>
                      <span className="font-bold text-gray-900 dark:text-white">
                        $127,500
                      </span>
                    </div>
                    <div className="flex justify-between p-3 rounded-lg bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200">
                      <span className="text-gray-600 dark:text-gray-300 font-medium">
                        Success Rate
                      </span>
                      <span className="font-bold text-gray-900 dark:text-white">
                        98%
                      </span>
                    </div>
                    <div className="flex justify-between p-3 rounded-lg bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200">
                      <span className="text-gray-600 dark:text-gray-300 font-medium">
                        Response Time
                      </span>
                      <span className="font-bold text-gray-900 dark:text-white">
                        1 hour
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between p-3 rounded-lg bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200">
                      <span className="text-gray-600 dark:text-gray-300 font-medium">
                        Total Spent
                      </span>
                      <span className="font-bold text-gray-900 dark:text-white">
                        $45,000
                      </span>
                    </div>
                    <div className="flex justify-between p-3 rounded-lg bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200">
                      <span className="text-gray-600 dark:text-gray-300 font-medium">
                        Avg Budget
                      </span>
                      <span className="font-bold text-gray-900 dark:text-white">
                        $3,750
                      </span>
                    </div>
                    <div className="flex justify-between p-3 rounded-lg bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200">
                      <span className="text-gray-600 dark:text-gray-300 font-medium">
                        Company Size
                      </span>
                      <span className="font-bold text-gray-900 dark:text-white">
                        Small
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-[#3B3F42] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-600 p-6 hover:shadow-xl transition-all duration-300">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-medium shadow-lg transform hover:-translate-y-0.5 hover:shadow-xl">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </button>
                {isFreelancer ? (
                  <button className="w-full flex items-center justify-center px-4 py-2.5 bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600/50 transition-all duration-300 font-medium shadow-sm border border-gray-200 dark:border-gray-600 transform hover:-translate-y-0.5 hover:shadow-md">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Browse Jobs
                  </button>
                ) : (
                  <button className="w-full flex items-center justify-center px-4 py-2.5 bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600/50 transition-all duration-300 font-medium shadow-sm border border-gray-200 dark:border-gray-600 transform hover:-translate-y-0.5 hover:shadow-md">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Post Job
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;