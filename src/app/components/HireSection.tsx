
"use client";

import React from "react";
import {
  Star,
  MapPin,
  Clock,
  Eye,
  Shield,
  Award,
  TrendingUp,
} from "lucide-react";

const HireSection: React.FC = () => {
  const freelancers = [
    {
      id: 1,
      name: "Sarah Johnson",
      title: "Senior Full-Stack Developer",
      rating: 4.9,
      reviews: 127,
      hourlyRate: "$65",
      location: "San Francisco, CA",
      image:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face",
      skills: ["React", "Node.js", "Python", "AWS", "TypeScript"],
      completedJobs: 89,
      responseTime: "1 hour",
      description:
        "Experienced full-stack developer with 7+ years building scalable web applications for Fortune 500 companies.",
      availability: "Available now",
      badges: ["Top Rated"],
      successRate: 98,
    },
    {
      id: 2,
      name: "Michael Chen",
      title: "Senior UI/UX Designer",
      rating: 4.8,
      reviews: 95,
      hourlyRate: "$55",
      location: "New York, NY",
      image:
        "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face",
      skills: [
        "Figma",
        "Adobe Creative Suite",
        "Sketch",
        "Prototyping",
        "User Research",
      ],
      completedJobs: 73,
      responseTime: "30 minutes",
      description:
        "Award-winning UI/UX designer specializing in mobile app design and user research with 6+ years experience.",
      availability: "Available in 1 week",
      badges: ["Top Rated"],
      successRate: 96,
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      title: "Content Marketing Strategist",
      rating: 5.0,
      reviews: 156,
      hourlyRate: "$45",
      location: "Austin, TX",
      image:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face",
      skills: [
        "Content Strategy",
        "SEO",
        "Social Media",
        "Analytics",
        "Copywriting",
      ],
      completedJobs: 112,
      responseTime: "15 minutes",
      description:
        "Results-driven content marketer with proven track record of increasing organic traffic by 300%+ for B2B/B2C brands.",
      availability: "Available now",
      badges: ["Top Rated"],
      successRate: 100,
    },
  ];

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Top Rated":
        return "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"; // Updated to match JobsSection featured badge style
      case "Rising Talent":
        return "bg-gradient-to-r from-green-400 to-emerald-400 text-white";
      case "Expert Vetted":
        return "bg-gradient-to-r from-purple-400 to-indigo-400 text-white";
      case "Plus":
        return "bg-gradient-to-r from-blue-400 to-cyan-400 text-white";
      default:
        return "bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300"; // Added dark mode support
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-8xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Top Talent
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Hire pre-vetted freelancers with proven track records
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <select className="px-4 py-2.5 bg-white dark:bg-[#3B3F42] border border-gray-200 dark:border-gray-600 rounded-xl text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200">
              <option>All Skills</option>
              <option>Development</option>
              <option>Design</option>
              <option>Writing</option>
              <option>Marketing</option>
            </select>
            <select className="px-4 py-2.5 bg-white dark:bg-[#3B3F42] border border-gray-200 dark:border-gray-600 rounded-xl text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200">
              <option>Hourly Rate</option>
              <option>$0 - $25</option>
              <option>$25 - $50</option>
              <option>$50 - $100</option>
              <option>$100+</option>
            </select>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {freelancers.map((freelancer) => (
            <div
              key={freelancer.id}
              className="relative bg-white dark:bg-[#3B3F42] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-600 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group flex flex-col h-full"
            >
              {/* Header with gradient background */}
              <div className="relative bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 pb-0">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="relative">
                      <img
                        src={freelancer.image}
                        alt={freelancer.name}
                        className="h-16 w-16 rounded-xl object-cover shadow-sm" // Updated to match JobsSection image style
                      />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
                        <Shield className="h-3 w-3 text-white" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors cursor-pointer">
                        {freelancer.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 font-medium">
                        {freelancer.title}
                      </p>
                      <div className="flex items-center mt-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />{" "}
                        {/* Updated size to match JobsSection */}
                        <span className="ml-1 text-sm font-semibold text-gray-900 dark:text-white">
                          {freelancer.rating}
                        </span>
                        <span className="ml-1 text-sm text-gray-400 dark:text-gray-400">
                          ({freelancer.reviews})
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Badges and availability moved to profile section - positioned on the right side vertically */}
                  <div className="flex flex-col items-end space-y-2">
                    <div className="flex space-x-2">
                      {freelancer.badges.map((badge, index) => (
                        <span
                          key={index}
                          className={`px-3 py-1 text-xs font-medium rounded-full ${getBadgeColor(
                            badge
                          )}`}
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        freelancer.availability === "Available now"
                          ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-600/50"
                          : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-600/50"
                      }`}
                    >
                      {freelancer.availability}
                    </span>
                  </div>
                </div>
              </div>

              {/* flex-grow - this solved the issue of buttons not appearing uniformly  , flex-grow */}
              <div className="flex-grow p-6 pt-4 flex flex-col">
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                  {freelancer.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {freelancer.skills.slice(0, 4).map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 text-sm rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600/50 transition-colors cursor-pointer"
                    >
                      {skill}
                    </span>
                  ))}
                  {freelancer.skills.length > 4 && (
                    <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 text-sm rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600/50 transition-colors cursor-pointer">
                      {" "}
                      +{freelancer.skills.length - 4} more{" "}
                    </span>
                  )}{" "}
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        {freelancer.successRate}%
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Success Rate
                    </span>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Award className="h-4 w-4 text-blue-500 mr-1" />
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        {freelancer.completedJobs}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Jobs Done
                    </span>
                  </div>
                </div>

                {/* details div  */}
                <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300 mb-6 flex-grow">
                  <div className="flex items-center justify-between">
                    <span>Hourly Rate</span>
                    <span className="font-bold text-gray-900 dark:text-white text-lg">
                      {freelancer.hourlyRate}/hr
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Response Time</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {freelancer.responseTime}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1.5 text-purple-500" />{" "}
                      {/* Updated size and color to match JobsSection */}
                      <span>{freelancer.location}</span>
                    </div>
                  </div>
                </div>

                {/* Buttons - Always at bottom */}
                <div className="flex space-x-3">
                  <button className="flex-1 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 text-sm font-medium transform hover:-translate-y-0.5">
                    Hire Now
                  </button>
                  <button className="p-2.5 text-gray-400 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-200">
                    <Eye className="h-5 w-5" />{" "}
                    {/* Updated size to match JobsSection */}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HireSection;

/*

Made the hire now button in uniform position  for all divs irrespective of the card content.look the chnages flow :

Card Container (flex flex-col h-full)
├── Header Section (fixed size)
├── Content Section (flex-grow flex flex-col) ← This grows within the card
│   ├── Description (fixed size)
│   ├── Skills (fixed size)
│   ├── Stats Grid (fixed size)
│   ├── Details Section (flex-grow) ← This grows within the content section

WHAT IF FLEX GROW IS REMOVED FROM THE CONTENT SECTION

IF  REMOVED :

Card Container (h-full = fixed height)
├── Header Section (natural size)
├── Content Section (natural size only) ← Only as tall as its content
├── Empty space ← Large gap would appear here

IF NOT REMOVED :
Card Container (h-full = fixed height)
├── Header Section (natural size)
├── Content Section (flex-grow) ← Expands to fill remaining card space
│   └── All content + buttons fill this expanded area

*/
