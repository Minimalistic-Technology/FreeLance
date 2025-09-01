// "use client";

// import React, { useState } from "react";
// import Navbar from "./components/Navbar";
// import DashboardStats from "./components/DashboardStats";
// import JobsSection from "./components/JobsSection";
// import HireSection from "./components/HireSection";
// import PaymentSection from "./components/PaymentSection";
// import UserProfile from "./Profile/page";
// import { AuthProvider } from "./context/AuthContext";
// import SignupPage from "./Signup/page";
// import ClientSignupPage from "./ClientSignup/page";
// import LoginPage from "./Login/page";
// import AccountTypeModal from "./AccountType/page";

// function App() {
//   const [activeSection, setActiveSection] = useState("jobs");
//   const [showSignup, setShowSignup] = useState(false);
//   const [showLogin, setShowLogin] = useState(false);
//   const [showAccountTypeModal, setShowAccountTypeModal] = useState(false);
//   const [selectedAccountType, setSelectedAccountType] = useState<
//     "client" | "freelancer" | null
//   >(null);

//   // Handle account type selection
//   const handleAccountTypeSelection = (type: "client" | "freelancer") => {
//     setSelectedAccountType(type);
//     setShowAccountTypeModal(false);
//     setShowSignup(true);
//   };

//   // Handle signup button click
//   const handleShowSignup = () => {
//     setShowAccountTypeModal(true);
//   };

//   // Handle back from signup forms
//   const handleBackFromSignup = () => {
//     setShowSignup(false);
//     setSelectedAccountType(null);
//     setShowAccountTypeModal(true);
//   };

//   // Handle successful signup
//   const handleSignupSuccess = () => {
//     setShowSignup(false);
//     setSelectedAccountType(null);
//     setShowAccountTypeModal(false);
//   };

//   if (showLogin) {
//     return (
//       <AuthProvider>
//         <LoginPage onBackToHome={() => setShowLogin(false)} />
//       </AuthProvider>
//     );
//   }

//   if (showSignup && selectedAccountType === "client") {
//     return (
//       <AuthProvider>
//         <ClientSignupPage
//           onSuccess={handleSignupSuccess}
//           onBack={handleBackFromSignup}
//         />
//       </AuthProvider>
//     );
//   }

//   if (showSignup && selectedAccountType === "freelancer") {
//     return (
//       <AuthProvider>
//         <SignupPage
//           onSuccess={handleSignupSuccess}
//           onBack={handleBackFromSignup}
//         />
//       </AuthProvider>
//     );
//   }

//   const renderActiveSection = () => {
//     switch (activeSection) {
//       case "jobs":
//         return <JobsSection />;
//       case "hire":
//         return <HireSection />;
//       case "payment":
//         return <PaymentSection />;
//       case "profile":
//         return <UserProfile />;
//       default:
//         return <JobsSection />;
//     }
//   };

//   return (
//     <AuthProvider>
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
//         <Navbar
//           activeSection={activeSection}
//           setActiveSection={setActiveSection}
//           onShowSignup={handleShowSignup}
//           onShowLogin={() => setShowLogin(true)}
//         />

//         <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           {activeSection !== "profile" && (
//             <div className="mb-8">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
//                     Welcome back, Vyom
//                   </h1>
//                   <p className="text-gray-600 mt-2 text-lg">
//                     Here's what's happening with your freelance journey today.
//                   </p>
//                 </div>
//                 <div className="hidden md:flex items-center space-x-4">
//                   <div className="text-right">
//                     <p className="text-sm text-gray-500">Current Status</p>
//                     <div className="flex items-center mt-1">
//                       <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
//                       <span className="text-sm font-medium text-gray-900">
//                         Available for work
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeSection !== "profile" && <DashboardStats />}
//           {renderActiveSection()}
//         </main>

//         {/* Account Type Selection Modal */}
//         {showAccountTypeModal && (
//           <AccountTypeModal
//             onSelectAccountType={handleAccountTypeSelection}
//             onClose={() => setShowAccountTypeModal(false)}
//           />
//         )}
//       </div>
//     </AuthProvider>
//   );
// }

// export default App;

























































// vertical navbar
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

function App() {
  const [activeSection, setActiveSection] = useState("jobs");
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showAccountTypeModal, setShowAccountTypeModal] = useState(false);
  const [selectedAccountType, setSelectedAccountType] = useState<
    "client" | "freelancer" | null
  >(null);

  // Handle account type selection
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
      default:
        return <JobsSection />;
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <Navbar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          onShowSignup={handleShowSignup}
          onShowLogin={() => setShowLogin(true)}
        />

        {/* Main content area with left margin for sidebar */}
        <main className="md:ml-64 max-w-none px-4 sm:px-6 lg:px-6 py-8">
          <div className="max-w-8xl mx-auto">
            {activeSection !== "profile" && (
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
                      Welcome back, Vyom
                    </h1>
                    <p className="text-gray-600 mt-2 text-lg">
                      Here's what's happening with your freelance journey today.
                    </p>
                  </div>
                  <div className="hidden lg:flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Current Status</p>
                      <div className="flex items-center mt-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-sm font-medium text-gray-900">
                          Available for work
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection !== "profile" && <DashboardStats />}
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