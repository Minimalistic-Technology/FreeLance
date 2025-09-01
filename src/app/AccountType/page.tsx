"use client";

import React from "react";
import { Building2, User, ArrowRight } from "lucide-react";

interface AccountTypeModalProps {
  onSelectAccountType: (type: "client" | "freelancer") => void;
  onClose: () => void;
}

const AccountTypeModal: React.FC<AccountTypeModalProps> = ({
  onSelectAccountType,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 transform transition-all duration-500 scale-100">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Choose Your Account Type
          </h2>
          <p className="text-gray-600">
            Select the option that best describes you
          </p>
        </div>

        <div className="space-y-4">
          {/* Client Option */}
          <button
            onClick={() => onSelectAccountType("client")}
            className="w-full p-6 border-2 border-gray-200 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <Building2 className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900">Client</h3>
                  <p className="text-sm text-gray-600">
                    Hire talented freelancers for your projects
                  </p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </div>
          </button>

          {/* Freelancer Option */}
          <button
            onClick={() => onSelectAccountType("freelancer")}
            className="w-full p-6 border-2 border-gray-200 rounded-2xl hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                  <User className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900">
                    Freelancer/Job Seeker
                  </h3>
                  <p className="text-sm text-gray-600">
                    Find amazing projects and grow your career
                  </p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-indigo-600 transition-colors" />
            </div>
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <button
            onClick={onClose}
            className="w-full text-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountTypeModal;
