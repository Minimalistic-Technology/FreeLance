
"use client";

import { useState, useEffect } from "react";
import { X, CheckCircle } from "lucide-react";

interface PaymentFormsProps {
  formType: "add" | "update" | "delete" | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PaymentForms({ formType, isOpen, onClose }: PaymentFormsProps) {
  const [formData, setFormData] = useState({
    methodName: "",
    provider: "",
    apiKey: "",
    secretKey: "",
    description: "",
    isActive: true,
    fees: "",
    currency: "USD",
    webhookUrl: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Dummy values based on selected method
  useEffect(() => {
    if (formType === "update" && formData.methodName) {
      let dummyValues;
      switch (formData.methodName) {
        case "stripe":
          dummyValues = {
            provider: "stripe",
            apiKey: "sk_test_123",
            secretKey: "secret_123",
            description: "Stripe payment integration",
            isActive: true,
            fees: "2.9",
            currency: "USD",
            webhookUrl: "https://example.com/stripe-webhook",
          };
          break;
        case "paypal":
          dummyValues = {
            provider: "paypal",
            apiKey: "paypal_client_id_123",
            secretKey: "paypal_secret_123",
            description: "PayPal payment integration",
            isActive: true,
            fees: "3.4",
            currency: "USD",
            webhookUrl: "https://example.com/paypal-webhook",
          };
          break;
        case "razorpay":
          dummyValues = {
            provider: "razorpay",
            apiKey: "rzp_test_123",
            secretKey: "razorpay_secret_123",
            description: "Razorpay payment integration",
            isActive: true,
            fees: "2.0",
            currency: "INR",
            webhookUrl: "https://example.com/razorpay-webhook",
          };
          break;
        case "square":
          dummyValues = {
            provider: "square",
            apiKey: "square_access_token_123",
            secretKey: "square_secret_123",
            description: "Square payment integration",
            isActive: true,
            fees: "2.6",
            currency: "USD",
            webhookUrl: "https://example.com/square-webhook",
          };
          break;
        case "braintree":
          dummyValues = {
            provider: "braintree",
            apiKey: "braintree_merchant_id_123",
            secretKey: "braintree_secret_123",
            description: "Braintree payment integration",
            isActive: true,
            fees: "2.9",
            currency: "USD",
            webhookUrl: "https://example.com/braintree-webhook",
          };
          break;
        default:
          dummyValues = {
            provider: "",
            apiKey: "",
            secretKey: "",
            description: "",
            isActive: true,
            fees: "",
            currency: "USD",
            webhookUrl: "",
          };
      }
      setFormData((prev) => ({ ...prev, ...dummyValues }));
    }
  }, [formType, formData.methodName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Handle form submission based on type
    switch (formType) {
      case "add":
        console.log("Adding payment method:", formData);
        break;
      case "update":
        console.log("Updating payment method:", formData);
        break;
      case "delete":
        console.log("Deleting payment method:", formData.methodName);
        break;
    }

    setIsSubmitted(true);

    // Auto close after 2 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        methodName: "",
        provider: "",
        apiKey: "",
        secretKey: "",
        description: "",
        isActive: true,
        fees: "",
        currency: "USD",
        webhookUrl: "",
      });
      onClose();
    }, 2000);
  };

  const getDialogTitle = () => {
    switch (formType) {
      case "add":
        return "Add Payment Method";
      case "update":
        return "Update Payment Method";
      case "delete":
        return "Delete Payment Method";
      default:
        return "Manage Payment Method";
    }
  };

  const getButtonText = () => {
    switch (formType) {
      case "add":
        return "Add Method";
      case "update":
        return "Update Method";
      case "delete":
        return "Delete Method";
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
              Payment method{" "}
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
                  htmlFor="methodName"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Payment Method Name *
                </label>
                {formType === "delete" || formType === "update" ? (
                  <select
                    id="methodName"
                    value={formData.methodName}
                    onChange={(e) =>
                      setFormData({ ...formData, methodName: e.target.value })
                    }
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                  >
                    <option value="">Select payment method</option>
                    <option value="stripe">Stripe</option>
                    <option value="paypal">PayPal</option>
                    <option value="razorpay">Razorpay</option>
                    <option value="square">Square</option>
                    <option value="braintree">Braintree</option>
                  </select>
                ) : (
                  <input
                    id="methodName"
                    type="text"
                    value={formData.methodName}
                    onChange={(e) =>
                      setFormData({ ...formData, methodName: e.target.value })
                    }
                    placeholder="e.g. Stripe Payments"
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                  />
                )}
              </div>

              {(formType === "add" || (formType === "update" && formData.methodName)) && (
                <>
                  <div className="space-y-2">
                    <label
                      htmlFor="provider"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Payment Provider
                    </label>
                  <input
                        id="payment-provider"
                        type="text"
                      
                        value={formData.provider}
                        onChange={(e) =>
                          setFormData({ ...formData, provider: e.target.value })
                        }
                        placeholder="e.g.-UPI"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                      />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="fees"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Transaction Fees (%)
                      </label>
                      <input
                        id="fees"
                        type="number"
                        step="0.01"
                        min="0"
                        max="100"
                        value={formData.fees}
                        onChange={(e) =>
                          setFormData({ ...formData, fees: e.target.value })
                        }
                        placeholder="e.g. 2.9"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="currency"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Currency
                      </label>
                      <select
                        id="currency"
                        value={formData.currency}
                        onChange={(e) =>
                          setFormData({ ...formData, currency: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                      >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                        <option value="CAD">CAD</option>
                        <option value="AUD">AUD</option>
                        <option value="INR">INR</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="webhookUrl"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Webhook URL
                    </label>
                    <input
                      id="webhookUrl"
                      type="url"
                      value={formData.webhookUrl}
                      onChange={(e) =>
                        setFormData({ ...formData, webhookUrl: e.target.value })
                      }
                      placeholder="https://yoursite.com/webhook"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      placeholder="Enter payment method description"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                    <div>
                      <label
                        htmlFor="isActive"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Active Status
                      </label>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Enable this payment method for transactions
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          isActive: !formData.isActive,
                        })
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
                        formData.isActive
                          ? "bg-blue-600 dark:bg-blue-500"
                          : "bg-gray-200 dark:bg-gray-600"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          formData.isActive ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </>
              )}

              {formType === "delete" && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-lg p-4">
                  <p className="text-red-800 dark:text-red-300 text-sm">
                    Are you sure you want to delete this payment method? This
                    action cannot be undone and may affect existing transactions
                    and user payments.
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
