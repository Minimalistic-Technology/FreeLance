

// try toggle theme func 


"use client";

import React, { useState } from "react";
import {
  Clock,
  DollarSign,
  MapPin,
  Bookmark,
  Users,
  Star,
  ArrowRight,
  X,
  CheckCircle,
} from "lucide-react";
import CollaborationModal from "./CollaborationModal";


const JobsSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const[isCollaborationModalOpen, setIsCollaborationModalOpen] = useState(false);

  const jobs = [
    {
      id: 1,
      title: "Senior Full-Stack Developer for SaaS Platform",
      company: "TechStart Inc.",
      companyLogo:
        "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop",
      budget: "$3,500 - $5,000",
      duration: "2-3 months",
      location: "Remote",
      description:
        "We are seeking an experienced full-stack developer to build a cutting-edge SaaS platform with modern React architecture and scalable Node.js backend.",
      skills: ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS"],
      posted: "2 hours ago",
      proposals: 12,
      featured: true,
      urgency: "high",
      clientRating: 4.9,
      clientReviews: 127,
    },
    {
      id: 2,
      title: "UI/UX Designer for Fintech Mobile App",
      company: "InnovateLab",
      companyLogo:
        "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop",
      budget: "$2,000 - $3,500",
      duration: "1-2 months",
      location: "San Francisco, CA",
      description:
        "Looking for a creative UI/UX designer to design an intuitive mobile app interface for our revolutionary fintech startup.",
      skills: [
        "Figma",
        "Adobe XD",
        "User Research",
        "Prototyping",
        "Mobile Design",
      ],
      posted: "5 hours ago",
      proposals: 8,
      featured: false,
      urgency: "medium",
      clientRating: 4.7,
      clientReviews: 89,
    },
    {
      id: 3,
      title: "Technical Content Writer & SEO Specialist",
      company: "DevMedia",
      companyLogo:
        "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop",
      budget: "$800 - $1,500",
      duration: "1 month",
      location: "Remote",
      description:
        "Seeking a skilled technical writer to create engaging, SEO-optimized content about emerging technologies and development trends.",
      skills: [
        "Technical Writing",
        "SEO",
        "Content Strategy",
        "WordPress",
        "Analytics",
      ],
      posted: "1 day ago",
      proposals: 15,
      featured: false,
      urgency: "low",
      clientRating: 4.8,
      clientReviews: 203,
    },
  ];

  const handleApplyNow = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

    const handleCollaborateClick = () => {
      setIsCollaborationModalOpen(true);
    };

    const handleCloseCollaborationModal = () => {
      setIsCollaborationModalOpen(false);
    };

  return (
    <>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Discover Opportunities
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Find your next project from top-rated clients worldwide
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <select className="px-4 py-2.5 bg-white dark:bg-[#3B3F42] border border-gray-200 dark:border-gray-600 rounded-xl text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200">
              <option>All Categories</option>
              <option>Development</option>
              <option>Design</option>
              <option>Writing</option>
              <option>Marketing</option>
            </select>
            <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 text-sm font-medium transform hover:-translate-y-0.5" onClick={handleCollaborateClick}>
              Let's Collaborate
            </button>
          </div>
        </div>

        <div className="grid gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className={`relative bg-white dark:bg-[#3B3F42] rounded-2xl shadow-sm border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group overflow-hidden ${
                job.featured
                  ? "border-blue-200 dark:border-blue-600/50 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20"
                  : "border-gray-100 dark:border-gray-600 hover:border-gray-200 dark:hover:border-gray-500"
              }`}
            >
              {job.featured && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
              )}

              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <img
                      src={job.companyLogo}
                      alt={job.company}
                      className="w-12 h-12 rounded-xl object-cover shadow-sm"
                    />
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors cursor-pointer">
                          {job.title}
                        </h3>
                        {job.featured && (
                          <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-medium rounded-full">
                            Featured
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                        <span className="font-medium">{job.company}</span>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                          <span>{job.clientRating}</span>
                          <span className="text-gray-400 dark:text-gray-400 ml-1">
                            ({job.clientReviews})
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button className="p-2.5 text-gray-400 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-200">
                      <Bookmark className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  {job.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {job.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 text-sm rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600/50 transition-colors cursor-pointer"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between py-4 border-t border-gray-100 dark:border-gray-600">
                  <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1.5 text-green-500" />
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {job.budget}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1.5 text-blue-500" />
                      <span>{job.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1.5 text-purple-500" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1.5 text-orange-500" />
                      <span>{job.proposals} proposals</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Posted {job.posted}
                    </span>
                    <button
                      onClick={handleApplyNow}
                      className="flex items-center px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 text-sm font-medium transform hover:-translate-y-0.5 group"
                    >
                      Apply Now
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Application Success Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={handleCloseModal}
          ></div>

          {/* Modal Content */}
          <div className="relative bg-white dark:bg-[#3B3F42] rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden transform transition-all duration-300 scale-100">
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 p-2 text-gray-400 dark:text-gray-300 hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Body */}
            <div className="p-8 text-center">
              {/* Success Icon */}
              <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>

              {/* Success Message */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Application Submitted Successfully!
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Your application was submitted
              </p>

              {/* Find More Jobs Button */}
              <button
                onClick={handleCloseModal}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 font-medium transform hover:-translate-y-0.5"
              >
                FIND MORE JOBS
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Collaboration Modal */}
      <CollaborationModal
        isOpen={isCollaborationModalOpen}
        onClose={handleCloseCollaborationModal}
      />
    </>
  );
};

export default JobsSection;