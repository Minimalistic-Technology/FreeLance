"use client"
import React from "react";
import {
  CreditCard,
  ArrowUpRight,
  ArrowDownLeft,
  Download,
  Plus,
  TrendingUp,
  DollarSign,
  Calendar,
  Shield,
} from "lucide-react";

const PaymentSection: React.FC = () => {
  const transactions = [
    {
      id: 1,
      type: "payment",
      description: "Payment from TechStart Inc.",
      amount: "+$2,500.00",
      date: "2024-01-15",
      status: "completed",
      project: "E-commerce Platform Development",
      client: "TechStart Inc.",
      avatar:
        "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop",
    },
    {
      id: 2,
      type: "withdrawal",
      description: "Withdrawal to Bank Account",
      amount: "-$1,800.00",
      date: "2024-01-12",
      status: "completed",
      project: null,
      client: null,
      avatar: null,
    },
    {
      id: 3,
      type: "payment",
      description: "Payment from InnovateLab",
      amount: "+$1,200.00",
      date: "2024-01-10",
      status: "pending",
      project: "Mobile App UI Design",
      client: "InnovateLab",
      avatar:
        "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop",
    },
    {
      id: 4,
      type: "fee",
      description: "Platform Service Fee",
      amount: "-$125.00",
      date: "2024-01-08",
      status: "completed",
      project: null,
      client: null,
      avatar: null,
    },
  ];

  const paymentMethods = [
    {
      id: 1,
      type: "card",
      name: "Visa ****1234",
      primary: true,
      icon: CreditCard,
      color: "from-blue-500 to-blue-600",
    },
    {
      id: 2,
      type: "paypal",
      name: "PayPal Account",
      primary: false,
      icon: Shield,
      color: "from-indigo-500 to-purple-600",
    },
    {
      id: 3,
      type: "bank",
      name: "Bank of America ****5678",
      primary: false,
      icon: CreditCard,
      color: "from-emerald-500 to-teal-600",
    },
  ];

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "payment":
        return { icon: ArrowDownLeft, color: "bg-green-100 text-green-600" };
      case "withdrawal":
        return { icon: ArrowUpRight, color: "bg-blue-100 text-blue-600" };
      case "fee":
        return { icon: ArrowUpRight, color: "bg-red-100 text-red-600" };
      default:
        return { icon: ArrowDownLeft, color: "bg-gray-100 text-gray-600" };
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Payment Center</h2>
          <p className="text-gray-600 mt-2">
            Manage your earnings, withdrawals, and payment methods
          </p>
        </div>
        <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 text-sm font-medium flex items-center transform hover:-translate-y-0.5">
          <Plus className="h-4 w-4 mr-2" />
          Add Payment Method
        </button>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-2xl p-8 text-white overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
            <div className="w-full h-full bg-white rounded-full transform translate-x-8 -translate-y-8"></div>
          </div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="h-8 w-8 text-white/80" />
              <span className="text-sm font-medium text-white/80">
                Available
              </span>
            </div>
            <h3 className="text-sm font-medium text-white/90 mb-2">
              Available Balance
            </h3>
            <p className="text-4xl font-bold mb-6">$3,420.50</p>
            <button className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all duration-200 text-sm font-medium border border-white/20">
              Withdraw Funds
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl">
              <TrendingUp className="h-6 w-6 text-emerald-600" />
            </div>
            <div className="flex items-center text-sm text-emerald-600 font-medium">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              +15.3%
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-2">
            This Month's Earnings
          </h3>
          <p className="text-3xl font-bold text-gray-900 mb-2">$5,680.00</p>
          <p className="text-sm text-gray-500">vs last month</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl">
              <Calendar className="h-6 w-6 text-orange-600" />
            </div>
            <div className="flex items-center text-sm text-orange-600 font-medium">
              <ArrowDownLeft className="h-4 w-4 mr-1" />2 pending
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-2">
            Pending Payments
          </h3>
          <p className="text-3xl font-bold text-gray-900 mb-2">$1,200.00</p>
          <p className="text-sm text-gray-500">Expected this week</p>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">
              Transaction History
            </h3>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200">
                Filter
              </button>
              <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 flex items-center">
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {transactions.map((transaction) => {
            const { icon: Icon, color } = getTransactionIcon(transaction.type);
            return (
              <div
                key={transaction.id}
                className="p-6 hover:bg-gray-50 transition-all duration-200 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl ${color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex items-center space-x-3">
                      {transaction.avatar && (
                        <img
                          src={transaction.avatar}
                          alt={transaction.client || ""}
                          className="w-8 h-8 rounded-lg object-cover"
                        />
                      )}
                      <div>
                        <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {transaction.description}
                        </p>
                        {transaction.project && (
                          <p className="text-sm text-gray-600">
                            {transaction.project}
                          </p>
                        )}
                        <p className="text-sm text-gray-500">
                          {transaction.date}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-lg font-bold ${
                        transaction.amount.startsWith("+")
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {transaction.amount}
                    </p>
                    <span
                      className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                        transaction.status === "completed"
                          ? "bg-green-100 text-green-700 border border-green-200"
                          : "bg-yellow-100 text-yellow-700 border border-yellow-200"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          Payment Methods
        </h3>
        <div className="grid gap-4 md:grid-cols-3">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            return (
              <div
                key={method.id}
                className={`relative p-6 border-2 rounded-2xl hover:shadow-lg transition-all duration-300 cursor-pointer group ${
                  method.primary
                    ? "border-blue-300 bg-gradient-to-br from-blue-50 to-indigo-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3 bg-gradient-to-br ${method.color} rounded-xl shadow-sm`}
                  >
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  {method.primary && (
                    <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-medium rounded-full">
                      Primary
                    </span>
                  )}
                </div>
                <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {method.name}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {method.type === "card"
                    ? "Credit Card"
                    : method.type === "paypal"
                    ? "Digital Wallet"
                    : "Bank Account"}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PaymentSection;
