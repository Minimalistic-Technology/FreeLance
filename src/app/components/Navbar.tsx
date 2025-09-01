// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import {
//   Search,
//   Bell,
//   User,
//   Menu,
//   Briefcase,
//   CreditCard,
//   Users,
//   Mail,
//   Settings,
//   LogOut,
//   MessageCircle,
// } from "lucide-react";
// import { useAuth } from "../context/AuthContext";

// /* Purpose: Defines a TypeScript interface NavbarProps to specify the props expected by the Navbar component.

// In TypeScript, an interface is like a blueprint that describes the shape of an object.
// It tells TypeScript what properties (and their types) an object must have
// */
// interface NavbarProps {
//   activeSection: string;
//   /* 
//      Why is this needed?

//       Because you want your Navbar to tell the parent App which section is active.

//       App holds the actual activeSection state with useState.

//       Navbar doesn't have its own state for this — instead, it calls setActiveSection("jobs") when a button is clicked.

//       By typing it as (section: string) => void, TypeScript guarantees that the Navbar will only call it with a string and won't expect a return value.
//   */
//   setActiveSection: (section: string) => void;
//   onShowSignup?: () => void;
//   onShowLogin?: () => void;
// }

// /* 
//     Declares Navbar as a functional component using TypeScript's React.FC<NavbarProps> type, which ensures the component receives the props defined in the NavbarProps interface
// */
// const Navbar: React.FC<NavbarProps> = ({
//   activeSection,
//   setActiveSection,
//   onShowSignup,
//   onShowLogin,
// }) => {
//   const { isAuthenticated, user, logout } = useAuth();
//   const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setIsProfileDropdownOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const getInitials = (name: string) => {
//     return name
//       .split(" ")
//       .map((word) => word.charAt(0))
//       .join("")
//       .toUpperCase()
//       .slice(0, 2);
//   };

//   const handleLogout = () => {
//     logout();
//     setIsProfileDropdownOpen(false);
//   };

//   const handleViewProfile = () => {
//     setActiveSection("profile");
//     setIsProfileDropdownOpen(false);
//   };

//   return (
//     <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <div className="flex items-center">
//             <div className="flex-shrink-0 flex items-center group">
//               <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
//                 <Briefcase className="h-6 w-6 text-white" />
//               </div>
//               <span className="ml-3 text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
//                 FreelanceHub
//               </span>
//             </div>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:block">
//             <div className="ml-10 flex items-baseline space-x-1">
//               {[
//                 { name: "Find Jobs", icon: Briefcase, key: "jobs" },
//                 { name: "Hire Talent", icon: Users, key: "hire" },
//                 { name: "Payments", icon: CreditCard, key: "payment" },
//               ].map((item) => {
//                 const Icon = item.icon;
//                 return (
//                   <button
//                     key={item.key}
//                     onClick={() => setActiveSection(item.key)}
//                     className={`relative flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 group ${
//                       activeSection === item.key
//                         ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 shadow-sm"
//                         : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
//                     }`}
//                   >
//                     <Icon className="h-4 w-4 mr-2" />
//                     {item.name}
//                   </button>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Search Bar */}
//           <div className="hidden md:block flex-1 max-w-md mx-8">
//             {/* This is a Tailwind special class used for group-hover or group-focus styles.

//               It tells Tailwind: "this element is a group container."

//               Then child elements can respond to its hover or focus. */}
//             <div className="relative group">
//               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                 <Search className="h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
//               </div>
//               <input
//                 type="text"
//                 className="block w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-200"
//                 placeholder="Search jobs, freelancers, projects..."
//               />
//             </div>
//           </div>

//           {/* Right Side */}
//           <div className="flex items-center space-x-3">
//             {/* Notifications */}
//             <button className="relative p-2.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-200 group">
//               <Bell className="h-5 w-5" />
//               <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//             </button>

//             {/* Conditional Authentication Section */}
//             {isAuthenticated ? (
//               <div className="hidden md:flex items-center space-x-3">
//                 {/* Messages */}
//                 <button className="relative p-2.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-200 group">
//                   <MessageCircle className="h-5 w-5" />
//                   <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
//                 </button>

//                 {/* User Profile Dropdown */}
//                 <div className="relative" ref={dropdownRef}>
//                   <button
//                     onClick={() =>
//                       setIsProfileDropdownOpen(!isProfileDropdownOpen)
//                     }
//                     className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-xl transition-all duration-200 group"
//                   >
//                     <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white text-sm font-medium shadow-md">
//                       {user?.profilePicture ? (
//                         <img
//                           src={user.profilePicture}
//                           alt="Profile"
//                           className="w-8 h-8 rounded-lg object-cover"
//                         />
//                       ) : (
//                         getInitials(user?.fullName || "U")
//                       )}
//                     </div>
//                     <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
//                       {user?.fullName?.split(" ")[0] || "User"}
//                     </span>
//                   </button>

//                   {/* Profile Dropdown */}
//                   {isProfileDropdownOpen && (
//                     <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 transform transition-all duration-200 origin-top-right">
//                       <div className="px-4 py-3 border-b border-gray-100">
//                         <p className="text-sm font-medium text-gray-900">
//                           {user?.fullName}
//                         </p>
//                         <p className="text-xs text-gray-500">{user?.email}</p>
//                       </div>

//                       <div className="py-1">
//                         <button 
//                           onClick={handleViewProfile}
//                           className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
//                         >
//                           <User className="h-4 w-4 mr-3" />
//                           View Profile
//                         </button>
//                         <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
//                           <Settings className="h-4 w-4 mr-3" />
//                           Settings
//                         </button>
//                         <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
//                           <Mail className="h-4 w-4 mr-3" />
//                           Messages
//                         </button>
//                       </div>

//                       <div className="border-t border-gray-100 py-1">
//                         <button
//                           onClick={handleLogout}
//                           className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
//                         >
//                           <LogOut className="h-4 w-4 mr-3" />
//                           Sign Out
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ) : (
//               /* Auth Buttons for Non-Authenticated Users */
//               <div className="hidden md:flex items-center space-x-3">
//                 <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200"
//                 onClick={onShowLogin}>
//                   Sign In
//                 </button>
//                 <button
//                   onClick={onShowSignup}
//                   className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
//                 >
//                   Get Started
//                 </button>
//               </div>
//             )}

//             {/* Mobile menu button */}
//             <div className="md:hidden">
//               <button className="p-2.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-200">
//                 <Menu className="h-5 w-5" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// /* 
// Here's the step-by-step flow of how Navbar and App collaborate to display a specific section:

// Initial Render:

// App initializes activeSection to "jobs".
// renderActiveSection() returns <JobsSection />, which is rendered in the App's <main> section.
// Navbar receives activeSection="jobs", so the "Find Jobs" button is highlighted (gradient background, blue dot).

// User Clicks a Navigation Button:

// For example, the user clicks the "Hire Talent" button in Navbar.
// The button's onClick calls setActiveSection("hire").

// State Update:

// setActiveSection("hire") updates activeSection to "hire" in App.
// React triggers a re-render of App due to the state change.

// Section Rendering:

// During the re-render, renderActiveSection() evaluates activeSection="hire" and returns <HireSection />.
// The <main> section in App now displays <HireSection /> instead of <JobsSection />.

// Navbar Update:

// Navbar receives the updated activeSection="hire" prop.
// The "Hire Talent" button is highlighted, and other buttons revert to their default (non-active) styles.

// Visual Feedback:

// The UI updates to show the HireSection content, and the "Hire Talent" button is visually active, providing clear feedback to the user.
// */


































































// vertical navbar

"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  Bell,
  User,
  Menu,
  Briefcase,
  CreditCard,
  Users,
  Mail,
  Settings,
  LogOut,
  MessageCircle,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

/* Purpose: Defines a TypeScript interface NavbarProps to specify the props expected by the Navbar component.

In TypeScript, an interface is like a blueprint that describes the shape of an object.
It tells TypeScript what properties (and their types) an object must have
*/
interface NavbarProps {
  activeSection: string;
  /* 
     Why is this needed?

      Because you want your Navbar to tell the parent App which section is active.

      App holds the actual activeSection state with useState.

      Navbar doesn't have its own state for this — instead, it calls setActiveSection("jobs") when a button is clicked.

      By typing it as (section: string) => void, TypeScript guarantees that the Navbar will only call it with a string and won't expect a return value.
  */
  setActiveSection: (section: string) => void;
  onShowSignup?: () => void;
  onShowLogin?: () => void;
}

/* 
    Declares Navbar as a functional component using TypeScript's React.FC<NavbarProps> type, which ensures the component receives the props defined in the NavbarProps interface
*/
const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  setActiveSection,
  onShowSignup,
  onShowLogin,
}) => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogout = () => {
    logout();
    setIsProfileDropdownOpen(false);
  };

  const handleViewProfile = () => {
    setActiveSection("profile");
    setIsProfileDropdownOpen(false);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:fixed md:inset-y-0 md:left-0 md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow bg-white/95 backdrop-blur-md border-r border-gray-200/50 shadow-sm">
          {/* Logo */}
          <div className="flex items-center px-6 py-6 border-b border-gray-200/50">
            <div className="flex items-center group">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                FreelanceHub
              </span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="px-6 py-4 border-b border-gray-200/50">
            {/* This is a Tailwind special class used for group-hover or group-focus styles.

              It tells Tailwind: "this element is a group container."

              Then child elements can respond to its hover or focus. */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-200"
                placeholder="Search jobs, freelancers..."
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-6 py-4 space-y-2">
            {[
              { name: "Find Jobs", icon: Briefcase, key: "jobs" },
              { name: "Hire Talent", icon: Users, key: "hire" },
              { name: "Payments", icon: CreditCard, key: "payment" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.key}
                  onClick={() => setActiveSection(item.key)}
                  className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group ${
                    activeSection === item.key
                      ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 shadow-sm"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3 flex-shrink-0" />
                  {item.name}
                </button>
              );
            })}
          </nav>

          {/* Bottom Section */}
          <div className="px-6 py-4 border-t border-gray-200/50">
            {/* Notifications */}
            <button className="w-full flex items-center px-4 py-3 mb-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all duration-200 group">
              <Bell className="h-5 w-5 mr-3 flex-shrink-0" />
              <span className="text-sm font-medium">Notifications</span>
              <span className="ml-auto w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Messages */}
            <button className="w-full flex items-center px-4 py-3 mb-4 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all duration-200 group">
              <MessageCircle className="h-5 w-5 mr-3 flex-shrink-0" />
              <span className="text-sm font-medium">Messages</span>
              <span className="ml-auto w-2 h-2 bg-blue-500 rounded-full"></span>
            </button>

            {/* Conditional Authentication Section */}
            {isAuthenticated ? (
              /* User Profile Section */
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="w-full flex items-center px-4 py-3 hover:bg-gray-100 rounded-xl transition-all duration-200 group"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white text-sm font-medium shadow-md flex-shrink-0">
                    {user?.profilePicture ? (
                      <img
                        src={user.profilePicture}
                        alt="Profile"
                        className="w-8 h-8 rounded-lg object-cover"
                      />
                    ) : (
                      getInitials(user?.fullName || "U")
                    )}
                  </div>
                  <div className="ml-3 flex-1 text-left">
                    <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                      {user?.fullName?.split(" ")[0] || "User"}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user?.email}
                    </p>
                  </div>
                </button>

                {/* Profile Dropdown */}
                {isProfileDropdownOpen && (
                  <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-xl shadow-lg border border-gray-200 py-2 transform transition-all duration-200">
                    <div className="py-1">
                      <button 
                        onClick={handleViewProfile}
                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <User className="h-4 w-4 mr-3" />
                        View Profile
                      </button>
                      <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        <Settings className="h-4 w-4 mr-3" />
                        Settings
                      </button>
                      <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        <Mail className="h-4 w-4 mr-3" />
                        Messages
                      </button>
                    </div>

                    <div className="border-t border-gray-100 py-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="h-4 w-4 mr-3" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Auth Buttons for Non-Authenticated Users */
              <div className="space-y-2">
                <button 
                  onClick={onShowLogin}
                  className="w-full px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200"
                >
                  Sign In
                </button>
                <button
                  onClick={onShowSignup}
                  className="w-full px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
        <div className="px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
              <span className="ml-2 text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                FreelanceHub
              </span>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center space-x-2">
              {/* Notifications */}
              <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Mobile menu button */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              {/* Search Bar */}
              <div className="mb-4">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-200"
                    placeholder="Search jobs, freelancers..."
                  />
                </div>
              </div>

              {/* Mobile Navigation */}
              <div className="space-y-2 mb-4">
                {[
                  { name: "Find Jobs", icon: Briefcase, key: "jobs" },
                  { name: "Hire Talent", icon: Users, key: "hire" },
                  { name: "Payments", icon: CreditCard, key: "payment" },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.key}
                      onClick={() => {
                        setActiveSection(item.key);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        activeSection === item.key
                          ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      <Icon className="h-4 w-4 mr-3" />
                      {item.name}
                    </button>
                  );
                })}
              </div>

              {/* Mobile Auth Section */}
              {isAuthenticated ? (
                <div className="space-y-2 border-t border-gray-200 pt-4">
                  <button 
                    onClick={() => {
                      handleViewProfile();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <User className="h-4 w-4 mr-3" />
                    View Profile
                  </button>
                  <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                    <Settings className="h-4 w-4 mr-3" />
                    Settings
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="space-y-2 border-t border-gray-200 pt-4">
                  <button 
                    onClick={() => {
                      onShowLogin?.();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      onShowSignup?.();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full px-3 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Get Started
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;

/* 
Here's the step-by-step flow of how Navbar and App collaborate to display a specific section:

Initial Render:

App initializes activeSection to "jobs".
renderActiveSection() returns <JobsSection />, which is rendered in the App's <main> section.
Navbar receives activeSection="jobs", so the "Find Jobs" button is highlighted (gradient background, blue dot).

User Clicks a Navigation Button:

For example, the user clicks the "Hire Talent" button in Navbar.
The button's onClick calls setActiveSection("hire").

State Update:

setActiveSection("hire") updates activeSection to "hire" in App.
React triggers a re-render of App due to the state change.

Section Rendering:

During the re-render, renderActiveSection() evaluates activeSection="hire" and returns <HireSection />.
The <main> section in App now displays <HireSection /> instead of <JobsSection />.

Navbar Update:

Navbar receives the updated activeSection="hire" prop.
The "Hire Talent" button is highlighted, and other buttons revert to their default (non-active) styles.

Visual Feedback:

The UI updates to show the HireSection content, and the "Hire Talent" button is visually active, providing clear feedback to the user.
*/