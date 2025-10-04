
// toggle theme func

"use client";

import React from "react";
import {
  TrendingUp,
  DollarSign,
  Clock,
  Star,
  ArrowUpRight,
} from "lucide-react";

const DashboardStats: React.FC = () => {
  const stats = [
    {
      name: "Active Projects",
      value: "12",
      change: "+2.5%",
      changeType: "increase",
      icon: Clock,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      iconBg: "from-blue-100 to-cyan-100",
    },
    {
      name: "Total Earnings",
      value: "$4,250",
      change: "+12.3%",
      changeType: "increase",
      icon: DollarSign,
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-50 to-teal-50",
      iconBg: "from-emerald-100 to-teal-100",
    },
    {
      name: "Completed Jobs",
      value: "38",
      change: "+5.1%",
      changeType: "increase",
      icon: TrendingUp,
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-50 to-red-50",
      iconBg: "from-orange-100 to-red-100",
    },
    {
      name: "Client Rating",
      value: "4.9",
      change: "+0.2",
      changeType: "increase",
      icon: Star,
      gradient: "from-yellow-500 to-orange-500",
      bgGradient: "from-yellow-50 to-orange-50",
      iconBg: "from-yellow-100 to-orange-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        return (
          <div
            key={index}
            className={`relative bg-gradient-to-br ${stat.bgGradient} rounded-2xl p-4 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group overflow-hidden`}
          >
            {/* Background Pattern */}

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-0">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-black mb-1">
                    {stat.name}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-black ">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`flex items-center text-sm font-medium bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}
                >
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  {stat.change}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStats;