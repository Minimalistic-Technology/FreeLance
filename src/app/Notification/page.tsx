"use client";

import React, { useState } from "react";
import {
  Bell,
  Briefcase,
  MessageCircle,
  DollarSign,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  Filter,
  MoreVertical,
  Check,
  Trash2,
} from "lucide-react";

const NotificationsSection: React.FC = () => {
  const [filter, setFilter] = useState<string>("all");
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "job_application",
      title: "Application Accepted",
      message:
        "Your application for Senior Full-Stack Developer has been accepted by TechStart Inc.",
      time: "2 minutes ago",
      icon: CheckCircle,
      iconColor: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-900/30",
      unread: true,
    },
    {
      id: 2,
      type: "message",
      title: "New Message",
      message: "You have a new message from Sarah Johnson at TechStart Inc.",
      time: "15 minutes ago",
      icon: MessageCircle,
      iconColor: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
      unread: true,
    },
    {
      id: 3,
      type: "payment",
      title: "Payment Received",
      message: "You received a payment of $2,500 from TechStart Inc.",
      time: "1 hour ago",
      icon: DollarSign,
      iconColor: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-900/30",
      unread: false,
    },
    {
      id: 4,
      type: "review",
      title: "New Review",
      message: "You received a 5-star review from InnovateLab.",
      time: "3 hours ago",
      icon: Star,
      iconColor: "text-yellow-400",
      bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
      unread: false,
    },
    {
      id: 5,
      type: "job_posted",
      title: "New Job Match",
      message: "A new job matching your skills was posted by DevMedia.",
      time: "5 hours ago",
      icon: Briefcase,
      iconColor: "text-purple-500",
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
      unread: false,
    },
    {
      id: 6,
      type: "deadline",
      title: "Project Deadline",
      message: "The deadline for your project with StartupXYZ is approaching.",
      time: "1 day ago",
      icon: AlertCircle,
      iconColor: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-100 dark:bg-orange-900/30",
      unread: false,
    },
    {
      id: 7,
      type: "payment",
      title: "Payment Pending",
      message: "A payment of $1,200 from InnovateLab is pending.",
      time: "2 days ago",
      icon: Clock,
      iconColor: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
      unread: false,
    },
    {
      id: 8,
      type: "job_application",
      title: "Application Viewed",
      message: "Your application for UI/UX Designer was viewed by InnovateLab.",
      time: "3 days ago",
      icon: Briefcase,
      iconColor: "text-gray-500 dark:text-gray-300",
      bgColor: "bg-gray-100 dark:bg-gray-700/50",
      unread: false,
    },
  ]);

  const filterOptions = [
    { key: "all", label: "All", count: notifications.length },
    {
      key: "unread",
      label: "Unread",
      count: notifications.filter((n) => n.unread).length,
    },
  ];

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "all") return true;
    if (filter === "unread") return notification.unread;
    return notification.type === filter;
  });

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, unread: false }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, unread: false }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  return (
    <div className="flex-1 min-h-screen p-6">
      {/* Header */}
      <div className="bg-white dark:bg-[#3B3F42] border-b border-gray-100 dark:border-gray-600 sticky top-0 z-10">
        <div className="max-w-8xl px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl shadow-sm">
                <Bell className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Notifications
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {notifications.filter((n) => n.unread).length} unread
                  notifications
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={markAllAsRead}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
              >
                <Check className="h-4 w-4 mr-2" />
                Mark all read
              </button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex space-x-1 mt-6 bg-gray-100 dark:bg-gray-700/50 p-1 rounded-xl">
            {filterOptions.map((option) => (
              <button
                key={option.key}
                onClick={() => setFilter(option.key)}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  filter === option.key
                    ? "bg-white dark:bg-[#3B3F42] text-blue-600 dark:text-blue-400 shadow-sm"
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-600/50"
                }`}
              >
                {option.label}
                <span
                  className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                    filter === option.key
                      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                      : "bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300"
                  }`}
                >
                  {option.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-w-8xl px-6 py-6">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="h-12 w-12 text-gray-300 dark:text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No notifications
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {filter === "all"
                ? "You're all caught up! No new notifications."
                : `No ${
                    filter === "unread" ? "unread" : filter
                  } notifications found.`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredNotifications.map((notification) => {
              const Icon = notification.icon;
              return (
                <div
                  key={notification.id}
                  className={`bg-white dark:bg-[#3B3F42] rounded-xl shadow-sm border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group ${
                    notification.unread
                      ? "border-blue-200 dark:border-blue-600/50 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20"
                      : "border-gray-100 dark:border-gray-600 hover:border-gray-200 dark:hover:border-gray-500"
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-start space-x-4">
                      {/* Icon */}
                      <div
                        className={`p-3 rounded-xl ${notification.bgColor} flex-shrink-0`}
                      >
                        <Icon className={`h-5 w-5 ${notification.iconColor}`} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {notification.title}
                          </h3>
                          <div className="flex items-center space-x-2">
                            {notification.unread && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                            <div className="relative">
                              <button className="p-1 text-gray-400 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-all duration-200">
                                <MoreVertical className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                          {notification.message}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <Clock className="h-4 w-4 mr-1.5 text-blue-500" />
                            {notification.time}
                          </div>

                          <div className="flex items-center space-x-2">
                            {notification.unread && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="flex items-center px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-all duration-200"
                              >
                                <Check className="h-3 w-3 mr-1" />
                                Mark read
                              </button>
                            )}
                            <button
                              onClick={() =>
                                deleteNotification(notification.id)
                              }
                              className="flex items-center px-3 py-1 text-xs font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-all duration-200"
                            >
                              <Trash2 className="h-3 w-3 mr-1" />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsSection;


