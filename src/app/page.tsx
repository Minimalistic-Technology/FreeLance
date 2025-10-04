"use client";

import React, { useState } from "react";
import Navbar from "./components/Navbar";
import DashboardStats from "./components/DashboardStats";
import JobsSection from "./components/JobsSection";
import HireSection from "./components/HireSection";
import PaymentSection from "./components/PaymentSection";
import UserProfile from "./Profile/page";
import { AuthProvider } from "./context/AuthContext";
import SignupPage from "./Signup/page";
import ClientSignupPage from "./ClientSignup/page";
import LoginPage from "./Login/page";
import AccountTypeModal from "./AccountType/page";
import MessagesPage from "./Messages/page";
import Notification from "./Notification/page";

function App() {
  const [activeSection, setActiveSection] = useState("jobs");
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  /* 
     whether modal (choose client/freelancer) is visible
  */
  const [showAccountTypeModal, setShowAccountTypeModal] = useState(false);
  // stores user’s choice: "client", "freelancer", or null
  const [selectedAccountType, setSelectedAccountType] = useState<
    "client" | "freelancer" | null
  >(null);

  // Handle account type selection
  //  When user picks account type, store it in state, close modal, and open signup form.
  const handleAccountTypeSelection = (type: "client" | "freelancer") => {
    setSelectedAccountType(type);
    setShowAccountTypeModal(false);
    setShowSignup(true);
  };

  // Handle signup button click
  const handleShowSignup = () => {
    setShowAccountTypeModal(true);
  };

  // Handle back from signup forms
  const handleBackFromSignup = () => {
    setShowSignup(false);
    setSelectedAccountType(null);
    setShowAccountTypeModal(true);
  };

  // Handle successful signup
  const handleSignupSuccess = () => {
    setShowSignup(false);
    setSelectedAccountType(null);
    setShowAccountTypeModal(false);
  };

  if (showLogin) {
    return (
      <AuthProvider>
        <LoginPage onBackToHome={() => setShowLogin(false)} />
      </AuthProvider>
    );
  }

  if (showSignup && selectedAccountType === "client") {
    return (
      <AuthProvider>
        <ClientSignupPage
          onSuccess={handleSignupSuccess}
          onBack={handleBackFromSignup}
        />
      </AuthProvider>
    );
  }

  if (showSignup && selectedAccountType === "freelancer") {
    return (
      <AuthProvider>
        <SignupPage
          onSuccess={handleSignupSuccess}
          onBack={handleBackFromSignup}
        />
      </AuthProvider>
    );
  }

  const renderActiveSection = () => {
    switch (activeSection) {
      case "jobs":
        return <JobsSection />;
      case "hire":
        return <HireSection />;
      case "payment":
        return <PaymentSection />;
      case "profile":
        return <UserProfile />;
      case "messages":
        return <MessagesPage />;
      case "notification":
        return <Notification />;
      default:
        return <JobsSection />;
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50  dark:text-white transition-colors duration-300">
        <Navbar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          onShowSignup={handleShowSignup}
          onShowLogin={() => setShowLogin(true)}
        />

        {/* Main content area with left margin for sidebar */}
        <main className="md:ml-64 max-w-none px-4 sm:px-6 lg:px-6 py-8 dark:bg-[#3B3F42]">
          <div className="max-w-8xl mx-auto">
            {activeSection !== "profile" && activeSection !== "messages" && activeSection !== "notification"  && (
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent dark:text-white">
                      Welcome back, Vyom
                    </h1>
                    <p className="text-gray-600 mt-2 text-lg dark:text-gray-200">
                      Here's what's happening with your freelance journey today.
                    </p>
                  </div>
                  <div className="hidden lg:flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-500 dark:text-gray-300">
                        Current Status
                      </p>
                      <div className="flex items-center mt-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          Available for work
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection !== "profile" &&
              activeSection !== "messages" &&
              activeSection !== "notification" &&
              <DashboardStats />}
            {renderActiveSection()}
          </div>
        </main>

        {/* Account Type Selection Modal */}
        {showAccountTypeModal && (
          <AccountTypeModal
            onSelectAccountType={handleAccountTypeSelection}
            onClose={() => setShowAccountTypeModal(false)}
          />
        )}
      </div>
    </AuthProvider>
  );
}

export default App;