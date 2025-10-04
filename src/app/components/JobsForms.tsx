
"use client";

import { useState } from "react";
import { X, CheckCircle } from "lucide-react";

interface JobsFormsProps {
  formType: "add" | "update" | "delete" | null;
  isOpen: boolean;
  onClose: () => void;
}

export function JobsForms({ formType, isOpen, onClose }: JobsFormsProps) {
  const [formData, setFormData] = useState({
    jobName: "",
    newCategoryName: "", // Added for update form
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Handle form submission based on type
    switch (formType) {
      case "add":
        console.log("Adding job:", formData);
        break;
      case "update":
        console.log("Updating job:", {
          selectedCategory: formData.jobName,
          newCategoryName: formData.newCategoryName,
        });
        break;
      case "delete":
        console.log("Deleting job:", formData.jobName);
        break;
    }

    setIsSubmitted(true);

    // Auto close after 2 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        jobName: "",
        newCategoryName: "",
      });
      onClose();
    }, 2000);
  };

  const getDialogTitle = () => {
    switch (formType) {
      case "add":
        return "Add New Job";
      case "update":
        return "Update Job";
      case "delete":
        return "Delete Job";
      default:
        return "Manage Job";
    }
  };

  const getButtonText = () => {
    switch (formType) {
      case "add":
        return "Add Job";
      case "update":
        return "Update Job";
      case "delete":
        return "Delete Job";
      default:
        return "Submit";
    }
  };

  const getButtonColor = () => {
    switch (formType) {
      case "add":
        return "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800";
      case "update":
        return "bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800";
      case "delete":
        return "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800";
      default:
        return "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800";
    }
  };

  const getIcon = () => {
    switch (formType) {
      case "add":
        return (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        );
      case "update":
        return (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        );
      case "delete":
        return (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white dark:bg-[#3B3F42] rounded-2xl shadow-2xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 dark:text-gray-300 hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-lg transition-colors z-10"
        >
          <X className="h-5 w-5" />
        </button>

        {isSubmitted ? (
          // Success State
          <div className="p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Success!
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Job{" "}
              {formType === "add"
                ? "added"
                : formType === "update"
                ? "updated"
                : "deleted"}{" "}
              successfully
            </p>
          </div>
        ) : (
          // Form State
          <>
            <div className="p-6 border-b border-gray-200 dark:border-gray-600">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                {getIcon()}
                {getDialogTitle()}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="jobName"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Category Name *
                </label>
                {formType === "delete" || formType === "update" ? (
                  <select
                    id="jobName"
                    value={formData.jobName}
                    onChange={(e) =>
                      setFormData({ ...formData, jobName: e.target.value, newCategoryName: "" })
                    }
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                  >
                    <option value="">Select category</option>
                    <option value="engineering">Engineering</option>
                    <option value="marketing">Marketing</option>
                    <option value="design">Design</option>
                    <option value="sales">Sales</option>
                    <option value="support">Support</option>
                  </select>
                ) : (
                  <input
                    id="jobName"
                    type="text"
                    value={formData.jobName}
                    onChange={(e) =>
                      setFormData({ ...formData, jobName: e.target.value })
                    }
                    placeholder="Enter category name"
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                  />
                )}
              </div>

              {formType === "update" && formData.jobName && (
                <div className="space-y-2">
                  <label
                    htmlFor="newCategoryName"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    New Category Name
                  </label>
                  <input
                    id="newCategoryName"
                    type="text"
                    value={formData.newCategoryName}
                    onChange={(e) =>
                      setFormData({ ...formData, newCategoryName: e.target.value })
                    }
                    placeholder="Enter new category name"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
              )}

              {formType === "delete" && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-lg p-4">
                  <p className="text-red-800 dark:text-red-300 text-sm">
                    Are you sure you want to delete this job? This action cannot
                    be undone and will remove all associated applications.
                  </p>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`flex-1 px-4 py-2 ${getButtonColor()} text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-medium transform hover:-translate-y-0.5`}
                >
                  {getButtonText()}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
