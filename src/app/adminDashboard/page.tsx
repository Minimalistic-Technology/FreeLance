
"use client";

import React, { useState, useRef,useEffect } from "react";
import {
  Search,
  Bell,
  User,
  Menu,
  X,
  LogOut,
  Shield,
  BookOpen,
  Settings,
  BarChart3,
  Plus,
  Trash2,
  Edit,
  CreditCard,
  Briefcase,
  MessageCircle,
  Sun,
  Moon,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { JobsForms } from "../components/JobsForms";
import { PaymentForms } from "../components/PaymentForms";
import { useTheme } from "next-themes";
import Image from "next/image";


// TypeScript interfaces
interface StatCardProps {
  title: string;
  value: string | number;
  icon: typeof LucideIcon;
  color?: string;
}

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: typeof LucideIcon;
  onClick: () => void;
  color: string;
}

const AdminDashboard: React.FC = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [activeJobForm, setActiveJobForm] = useState<
    "add" | "update" | "delete" | null
  >(null);
  const [activePaymentForm, setActivePaymentForm] = useState<
    "add" | "update" | "delete" | null
  >(null);
  const [stats, setStats] = useState({
    totalJobs: 45,
    totalPaymentMethods: 8,
    activeJobs: 32,
    totalRevenue: 125000,
  });

  const handleJobFormClose = () => {
    setActiveJobForm(null);
  };

  const handlePaymentFormClose = () => {
    setActivePaymentForm(null);
  };

  const handleLogout = () => {
    router.push("/");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const user = { fullName: "Admin", email: "admin@jobshub.com" };

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

  const StatCard: React.FC<StatCardProps> = ({
    title,
    value,
    icon: Icon,
    color = "blue",
  }) => (
    <div className="bg-white dark:bg-[#3B3F42] rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-600 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
            {title}
          </p>
          <p
            className={`text-3xl font-bold text-${color}-600 dark:text-${color}-400`}
          >
            {value}
          </p>
        </div>
        <div
          className={`bg-${color}-100 dark:bg-${color}-900/30 p-3 rounded-full`}
        >
          <Icon
            className={`w-8 h-8 text-${color}-600 dark:text-${color}-400`}
          />
        </div>
      </div>
    </div>
  );

  const QuickActionCard: React.FC<QuickActionCardProps> = ({
    title,
    description,
    icon: Icon,
    onClick,
    color,
  }) => (
    <div
      onClick={onClick}
      className="bg-white dark:bg-[#3B3F42] rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-600 hover:shadow-xl transition-all duration-300 cursor-pointer group hover:-translate-y-1"
    >
      <div className="flex items-center space-x-4">
        <div
          className={`bg-${color}-100 dark:bg-${color}-900/30 p-3 rounded-full group-hover:bg-${color}-200 dark:group-hover:bg-${color}-800/50 transition-colors duration-300`}
        >
          <Icon
            className={`w-6 h-6 text-${color}-600 dark:text-${color}-400`}
          />
        </div>
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-white mb-1">
            {title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {description}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br  from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Desktop Sidebar */}
      <aside className="hidden md:fixed md:inset-y-0 md:left-0 md:flex md:w-64 md:flex-col  z-10">
        <div className="flex flex-col flex-grow dark:bg-[#3B3F42] bg-white border-r border-gray-200/50 shadow-sm">
          {/* Logo */}
          <div className="flex items-center px-6 py-6 border-b border-gray-200/50">
            <div className="flex items-center group">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-900 bg-clip-text ">
                FreelanceHub Admin
              </span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="px-6 py-4 border-b border-gray-200/50">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-200"
                placeholder="Search..."
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-6 py-4 space-y-2">
            <button className="w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 shadow-sm">
              <BarChart3 className="h-5 w-5 mr-3 flex-shrink-0" />
              Dashboard
            </button>
          </nav>

          {/* Bottom Section */}
          <div className="px-6 py-4 border-t border-gray-200/50">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="w-full flex items-center px-4 py-3 mb-2 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all duration-200 group"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 mr-3 flex-shrink-0" />
              ) : (
                <Moon className="h-5 w-5 mr-3 flex-shrink-0" />
              )}
              <span className="text-sm font-medium">
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </span>
            </button>

            {/* Profile */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="w-full flex items-center px-4 py-3 hover:bg-gray-100 rounded-xl transition-all duration-200 group"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600  rounded-lg flex items-center justify-center text-white text-sm font-medium shadow-md flex-shrink-0">
                  {getInitials(user.fullName)}
                </div>
                <div className="ml-3 flex-1 text-left">
                  <p className="text-sm font-medium text-gray-500 group-hover:text-gray-900">
                    {user.fullName}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
              </button>

              {isProfileDropdownOpen && (
                <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-xl shadow-lg border border-gray-200 py-2 transform transition-all duration-200">
                  <div className="py-1">
                    <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
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
          </div>
        </div>
      </aside>
      {/* Mobile Header */}
      <div className="md:hidden bg-white/95 dark:bg-[#3B3F42] backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
        <div className="px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="ml-2 text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text ">
                FreelanceHub Admin
              </span>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center space-x-2">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>

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
              <div className="mb-4 px-4">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-200"
                    placeholder="Search..."
                  />
                </div>
              </div>

              {/* Navigation */}
              <div className="space-y-2 mb-4 px-4">
                <button className="w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 group bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700">
                  <BarChart3 className="h-4 w-4 mr-3" />
                  Dashboard
                </button>
              </div>

              {/* Bottom Section */}
              <div className="space-y-2 border-t border-gray-200 pt-4 px-4">
                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className="w-full flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200"
                >
                  {theme === "dark" ? (
                    <Sun className="h-4 w-4 mr-3" />
                  ) : (
                    <Moon className="h-4 w-4 mr-3" />
                  )}
                  {theme === "dark" ? "Light Mode" : "Dark Mode"}
                </button>

                {/* Notifications */}
                <button className="w-full flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200">
                  <Bell className="h-4 w-4 mr-3" />
                  Notifications
                </button>

                {/* Messages */}
                <button className="w-full flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200">
                  <MessageCircle className="h-4 w-4 mr-3" />
                  Messages
                </button>

                {/* Profile Options */}
                <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
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
            </div>
          )}
        </div>
      </div>
      {/* Hero Section */}

      {/* old : from-blue-600 via-blue-700 to-blue-800   dark:from-blue-700 dark:via-blue-800 dark:to-blue-900. 
      new theme : dark:bg-gradient-to-br  dark:from-gray-900 dark:to-gray-800.   from-slate-700 via-slate-800 to-slate-900
       */}
      <section className="md:pl-64 bg-gradient-to-r dark:bg-gradient-to-br  dark:from-gray-900   dark:to-gray-800   from-slate-700  to-slate-900  text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10 max-w-8xl px-6">
          <div className="flex items-center justify-between">
            <div className="flex-1 text-left">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Admin Control Center
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl">
                Manage jobs and payment methods with powerful administrative
                tools and real-time insights
              </p>
            </div>
            {/* <div className="hidden md:block ml-8 flex-shrink-0">
              <Image
                src="/Analysis Report.png"
                alt="Admin Dashboard Illustration"
                width={300}
                height={200}
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div> */}

            <div className="hidden md:block ml-8 flex-shrink-0 relative">
              <ShieldCheck className="w-96 h-96  absolute -right-48 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>
        </div>
      </section>

      <main className="md:pl-70 max-w-8xl mx-auto pr-20 py-8">
        {/* Stats Overview */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <BarChart3 className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" />
            Platform Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Jobs"
              value={stats.totalJobs}
              icon={Briefcase}
              color="blue"
            />
            <StatCard
              title="Payment Methods"
              value={stats.totalPaymentMethods}
              icon={CreditCard}
              color="purple"
            />
            <StatCard
              title="Active Jobs"
              value={stats.activeJobs}
              icon={BookOpen}
              color="green"
            />
            <StatCard
              title="Total Revenue"
              value={`$${stats.totalRevenue.toLocaleString()}`}
              icon={BarChart3}
              color="orange"
            />
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <Settings className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Jobs Management */}
            <QuickActionCard
              title="Add Jobs Category"
              description="Create new job listings for the platform"
              icon={Plus}
              onClick={() => setActiveJobForm("add")}
              color="green"
            />
            <QuickActionCard
              title="Update Jobs Category"
              description="Modify existing job listings"
              icon={Edit}
              onClick={() => setActiveJobForm("update")}
              color="orange"
            />
            <QuickActionCard
              title="Delete Jobs Category"
              description="Remove job listings from the platform"
              icon={Trash2}
              onClick={() => setActiveJobForm("delete")}
              color="red"
            />

            {/* Payment Methods Management */}
            <QuickActionCard
              title="Add Payment Method"
              description="Add new payment processing options"
              icon={Plus}
              onClick={() => setActivePaymentForm("add")}
              color="green"
            />
            <QuickActionCard
              title="Update Payment Method"
              description="Modify existing payment configurations"
              icon={Edit}
              onClick={() => setActivePaymentForm("update")}
              color="orange"
            />
            <QuickActionCard
              title="Delete Payment Method"
              description="Remove payment processing options"
              icon={Trash2}
              onClick={() => setActivePaymentForm("delete")}
              color="red"
            />
          </div>
        </section>

        {/* Jobs Forms */}
        <JobsForms
          formType={activeJobForm}
          isOpen={activeJobForm !== null}
          onClose={handleJobFormClose}
        />

        {/* Payment Forms */}
        <PaymentForms
          formType={activePaymentForm}
          isOpen={activePaymentForm !== null}
          onClose={handlePaymentFormClose}
        />
      </main>
      {/* Enhanced Footer */}
      {/* <footer className="md:pl-64 bg-white dark:bg-[#3B3F42] shadow-lg border-t-4 border-blue-500 dark:border-blue-400 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-center items-center">
            <p className="text-gray-600 dark:text-gray-300">
              © 2025 JobsHub Admin Panel. All rights reserved.
            </p>
          </div>
        </div>
      </footer> */}
      <footer className="md:pl-64 bg-white dark:bg-[#3B3F42] shadow-lg border-t-4 border-blue-500 dark:border-blue-400 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-center items-center">
            Picture by :
            <a
              href="https://iconscout.com/illustrations/analysis-report"
              className="underline text-blue-600 mr-2 ml-2 font-size-sm"
              target="_blank"
            >
              Analysis Report
            </a>{" "}
            by{" "}
            <a
              href="https://iconscout.com/contributors/nanoagency"
              className="underline text-blue-600 ml-2  mr-2 font-size-sm"
            >
              nanoagency
            </a>{" "}
            on{" "}
            <a
              href="https://iconscout.com"
              className="underline ml-2 text-blue-600 font-size-sm"
            >
              IconScout
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;
