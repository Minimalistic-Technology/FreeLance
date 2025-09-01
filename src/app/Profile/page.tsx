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
      <div className="min-h-screen bg-gradient-to-br  flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <User className="h-8 w-8 text-gray-500" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Not Logged In
          </h2>
          <p className="text-gray-600">Please log in to view your profile.</p>
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
    <div className="min-h-screen ">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 mb-6 hover:shadow-2xl transition-all duration-300">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Left Side - Profile Info */}
            <div className="flex items-center gap-6">
              {/* Profile Picture */}
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 rounded-full flex items-center justify-center overflow-hidden shadow-lg ring-4 ring-white/50">
                  {user.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      {getInitials(user.fullName)}
                    </span>
                  )}
                </div>
                <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg transform hover:scale-110">
                  <Edit className="h-3 w-3" />
                </button>
              </div>

              {/* Name and Basic Info */}
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-1">
                  {user.fullName}
                </h1>
                <p className="text-gray-600 mb-2 font-medium">
                  {isFreelancer ? "Full-Stack Developer" : "Client"}
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mr-2 animate-pulse shadow-sm"></div>
                  Online
                </div>
              </div>
            </div>

            {/* Right Side - Key Stats */}
            <div className="flex gap-4">
              {isFreelancer ? (
                <>
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg border border-blue-200/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                      4.9
                    </div>
                    <div className="text-xs text-blue-600 font-medium">
                      Rating
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl shadow-lg border border-emerald-200/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">
                      47
                    </div>
                    <div className="text-xs text-emerald-600 font-medium">
                      Jobs
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-lg border border-purple-200/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">
                      $75
                    </div>
                    <div className="text-xs text-purple-600 font-medium">
                      Per Hour
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg border border-blue-200/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                      12
                    </div>
                    <div className="text-xs text-blue-600 font-medium">
                      Projects
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl shadow-lg border border-emerald-200/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">
                      8
                    </div>
                    <div className="text-xs text-emerald-600 font-medium">
                      Hired
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-lg border border-purple-200/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">
                      $45k
                    </div>
                    <div className="text-xs text-purple-600 font-medium">
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
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300">
              <h2 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
                {isFreelancer ? "About" : "Company Overview"}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {isFreelancer
                  ? "Passionate full-stack developer with 6+ years of experience building scalable web applications. Specialized in React, Node.js, and cloud architecture."
                  : "We are a technology company focused on building innovative solutions that transform businesses. Our team delivers cutting-edge digital experiences."}
              </p>
            </div>

            {/* Skills or Services */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300">
              <h2 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
                {isFreelancer ? "Skills" : "Services"}
              </h2>
              <div className="flex flex-wrap gap-2">
                {isFreelancer
                  ? ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS"].map(
                      (skill, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full text-sm font-semibold border border-indigo-200/50 hover:from-indigo-200 hover:to-purple-200 transition-all duration-200 transform hover:scale-105 shadow-sm"
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
                        className="px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full text-sm font-semibold border border-indigo-200/50 hover:from-indigo-200 hover:to-purple-200 transition-all duration-200 transform hover:scale-105 shadow-sm"
                      >
                        {service}
                      </span>
                    ))}
              </div>
            </div>

            {/* Recent Work */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300">
              <h2 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
                {isFreelancer ? "Recent Work" : "Recent Projects"}
              </h2>
              <div className="space-y-4">
                <div className="border-l-4 border-gradient-to-b  pl-4 bg-gradient-to-r to-transparent rounded-r-lg py-3 from-blue-50 transition-all duration-200">
                  <h3 className="font-bold text-gray-900">
                    E-commerce Platform
                  </h3>
                  <p className="text-sm text-blue-600 mb-1 font-medium">
                    Completed 2 weeks ago
                  </p>
                  <p className="text-sm text-gray-700">
                    Built a modern e-commerce platform with React and Node.js
                  </p>
                  {isFreelancer && (
                    <div className="flex items-center mt-2">
                      <Star className="h-4 w-4 text-amber-500 mr-1 drop-shadow-sm" />
                      <span className="text-sm text-gray-600 font-medium">
                        5.0 rating
                      </span>
                    </div>
                  )}
                </div>
                <div className="border-l-4 border-gradient-to-b  pl-4 bg-gradient-to-r to-transparent rounded-r-lg py-3 from-emerald-50 transition-all duration-200">
                  <h3 className="font-bold text-gray-900">
                    Mobile App Development
                  </h3>
                  <p className="text-sm text-emerald-600 mb-1 font-medium">
                    Completed 1 month ago
                  </p>
                  <p className="text-sm text-gray-700">
                    Developed a cross-platform mobile app for fitness tracking
                  </p>
                  {isFreelancer && (
                    <div className="flex items-center mt-2">
                      <Star className="h-4 w-4 text-amber-500 mr-1 drop-shadow-sm" />
                      <span className="text-sm text-gray-600 font-medium">
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
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300">
              <h3 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
                Contact
              </h3>
              <div className="space-y-4">
                <div className="flex items-center p-3 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100/50 hover:from-gray-100 hover:to-gray-100 transition-all duration-200">
                  <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center mr-3 shadow-sm">
                    <Mail className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm text-gray-700 font-medium">
                    {user.email}
                  </span>
                </div>
                <div className="flex items-center p-3 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100/50 hover:from-gray-100 hover:to-gray-100 transition-all duration-200">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center mr-3 shadow-sm">
                    <MapPin className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm text-gray-700 font-medium">
                    {isFreelancer ? "San Francisco, CA" : "New York, NY"}
                  </span>
                </div>
                <div className="flex items-center p-3 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100/50 hover:from-gray-100 hover:to-gray-100 transition-all duration-200">
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg flex items-center justify-center mr-3 shadow-sm">
                    <Calendar className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm text-gray-700 font-medium">
                    Member since January 2024
                  </span>
                </div>
              </div>
            </div>

            {/* Stats Summary */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300">
              <h3 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
                Summary
              </h3>
              <div className="space-y-4">
                {isFreelancer ? (
                  <>
                    <div className="flex justify-between p-3 rounded-lg bg-gradient-to-r from-blue-50/50 to-indigo-50/50 hover:from-blue-50 hover:to-indigo-50 transition-all duration-200">
                      <span className="text-gray-600 font-medium">
                        Total Earnings
                      </span>
                      <span className="font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        $127,500
                      </span>
                    </div>
                    <div className="flex justify-between p-3 rounded-lg bg-gradient-to-r from-emerald-50/50 to-teal-50/50 hover:from-emerald-50 hover:to-teal-50 transition-all duration-200">
                      <span className="text-gray-600 font-medium">
                        Success Rate
                      </span>
                      <span className="font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                        98%
                      </span>
                    </div>
                    <div className="flex justify-between p-3 rounded-lg bg-gradient-to-r from-purple-50/50 to-pink-50/50 hover:from-purple-50 hover:to-pink-50 transition-all duration-200">
                      <span className="text-gray-600 font-medium">
                        Response Time
                      </span>
                      <span className="font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        1 hour
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between p-3 rounded-lg bg-gradient-to-r from-blue-50/50 to-indigo-50/50 hover:from-blue-50 hover:to-indigo-50 transition-all duration-200">
                      <span className="text-gray-600 font-medium">
                        Total Spent
                      </span>
                      <span className="font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        $45,000
                      </span>
                    </div>
                    <div className="flex justify-between p-3 rounded-lg bg-gradient-to-r from-emerald-50/50 to-teal-50/50 hover:from-emerald-50 hover:to-teal-50 transition-all duration-200">
                      <span className="text-gray-600 font-medium">
                        Avg Budget
                      </span>
                      <span className="font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                        $3,750
                      </span>
                    </div>
                    <div className="flex justify-between p-3 rounded-lg bg-gradient-to-r from-purple-50/50 to-pink-50/50 hover:from-purple-50 hover:to-pink-50 transition-all duration-200">
                      <span className="text-gray-600 font-medium">
                        Company Size 
                      </span>
                      <span className="font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Small
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300">
              <h3 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
                Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg transform hover:scale-105 hover:shadow-xl">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </button>
                {isFreelancer ? (
                  <button className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl hover:from-gray-200 hover:to-gray-300 transition-all duration-200 font-semibold shadow-lg transform hover:scale-105 hover:shadow-xl border border-gray-300/50">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Browse Jobs
                  </button>
                ) : (
                  <button className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl hover:from-gray-200 hover:to-gray-300 transition-all duration-200 font-semibold shadow-lg transform hover:scale-105 hover:shadow-xl border border-gray-300/50">
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