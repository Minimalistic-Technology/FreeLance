
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
      iconColor: "text-green-500",
      bgColor: "bg-green-50",
      unread: true,
    },
    {
      id: 2,
      type: "message",
      title: "New Message",
      message:
        "Your application for Senior Full-Stack Developer has been accepted by TechStart Inc",
      time: "15 minutes ago",
      icon: MessageCircle,
      iconColor: "text-blue-500",
      bgColor: "bg-blue-50",
      unread: true,
    },
    {
      id: 3,
      type: "payment",
      title: "Payment Received",
      message:
        "Your application for Senior Full-Stack Developer has been accepted by TechStart Inc",
      time: "1 hour ago",
      icon: DollarSign,
      iconColor: "text-green-500",
      bgColor: "bg-green-50",
      unread: false,
    },
    {
      id: 4,
      type: "review",
      title: "New Review",
      message:
        "Your application for Senior Full-Stack Developer has been accepted by TechStart Inc",
      time: "3 hours ago",
      icon: Star,
      iconColor: "text-yellow-500",
      bgColor: "bg-yellow-50",
      unread: false,
    },
    {
      id: 5,
      type: "job_posted",
      title: "New Job Match",
      message:
        "Your application for Senior Full-Stack Developer has been accepted by TechStart Inc",
      time: "5 hours ago",
      icon: Briefcase,
      iconColor: "text-purple-500",
      bgColor: "bg-purple-50",
      unread: false,
    },
    {
      id: 6,
      type: "deadline",
      title: "Project Deadline",
      message: "Your application for Senior Full-Stack Developer has been accepted by TechStart Inc",
      time: "1 day ago",
      icon: AlertCircle,
      iconColor: "text-orange-500",
      bgColor: "bg-orange-50",
      unread: false,
    },
    {
      id: 7,
      type: "payment",
      title: "Payment Pending",
      message: "Your application for Senior Full-Stack Developer has been accepted by TechStart Inc",
      time: "2 days ago",
      icon: Clock,
      iconColor: "text-blue-500",
      bgColor: "bg-blue-50",
      unread: false,
    },
    {
      id: 8,
      type: "job_application",
      title: "Application Viewed",
      message:
        "Your application for Senior Full-Stack Developer has been accepted by TechStart Inc",
      time: "3 days ago",
      icon: Briefcase,
      iconColor: "text-gray-500",
      bgColor: "bg-gray-50",
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
    <div className="flex-1 min-h-screen ">
      {/* Header */}
      <div className="bg-white border-b border-gray-200/50 sticky top-0 z-10">
        <div className="max-w-8xl px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                <Bell className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Notifications
                </h1>
                <p className="text-sm text-gray-600">
                  {notifications.filter((n) => n.unread).length} unread
                  notifications
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={markAllAsRead}
                className="flex items-center px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Check className="h-4 w-4 mr-2" />
                Mark all read
              </button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex space-x-1 mt-6 bg-gray-100 p-1 rounded-xl">
            {filterOptions.map((option) => (
              <button
                key={option.key}
                onClick={() => setFilter(option.key)}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  filter === option.key
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                }`}
              >
                {option.label}
                <span
                  className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                    filter === option.key
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-200 text-gray-600"
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
      <div className="max-w-8xl  px-6 py-6">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No notifications
            </h3>
            <p className="text-gray-500">
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
                  className={`bg-white rounded-xl shadow-sm border hover:shadow-md transition-all duration-200 ${
                    notification.unread
                      ? "ring-2 ring-blue-100 border-blue-200"
                      : "border-gray-200"
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
                          <h3 className="text-lg font-semibold text-gray-900">
                            {notification.title}
                          </h3>
                          <div className="flex items-center space-x-2">
                            {notification.unread && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                            <div className="relative">
                              <button className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
                                <MoreVertical className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-600 leading-relaxed mb-3">
                          {notification.message}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="h-4 w-4 mr-1" />
                            {notification.time}
                          </div>

                          <div className="flex items-center space-x-2">
                            {notification.unread && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="flex items-center px-3 py-1 text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-colors"
                              >
                                <Check className="h-3 w-3 mr-1" />
                                Mark read
                              </button>
                            )}
                            <button
                              onClick={() =>
                                deleteNotification(notification.id)
                              }
                              className="flex items-center px-3 py-1 text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
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
