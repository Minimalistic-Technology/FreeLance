
"use client";

import React, { useState } from "react";
import {
  Search,
  Send,
  Paperclip,
  MoreVertical,
  Phone,
  Video,
  Star,
  Clock,
  CheckCheck,
  MessageCircle,
} from "lucide-react";

const MessagesPage: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [newMessage, setNewMessage] = useState("");

  const conversations = [
    {
      id: 1,
      name: "Sarah Johnson",
      company: "TechStart Inc.",
      avatar:
        "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop",
      lastMessage: "Thanks for the quick turnaround on the React components!",
      time: "2m ago",
      unread: 2,
      online: true,
      rating: 4.9,
      project: "SaaS Platform Development",
    },
    {
      id: 2,
      name: "Michael Chen",
      company: "InnovateLab",
      avatar:
        "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop",
      lastMessage:
        "Can we schedule a call to discuss the mobile app wireframes?",
      time: "1h ago",
      unread: 0,
      online: false,
      rating: 4.7,
      project: "Fintech Mobile App",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      company: "DevMedia",
      avatar:
        "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop",
      lastMessage:
        "The content drafts look great! Just a few minor revisions needed.",
      time: "3h ago",
      unread: 1,
      online: true,
      rating: 4.8,
      project: "Technical Content Writing",
    },
    {
      id: 4,
      name: "David Park",
      company: "StartupXYZ",
      avatar:
        "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop",
      lastMessage: "Project completed successfully. Payment has been released.",
      time: "1d ago",
      unread: 0,
      online: false,
      rating: 5.0,
      project: "E-commerce Platform",
    },
  ];

  const messages = [
    {
      id: 1,
      senderId: 1,
      senderName: "Sarah Johnson",
      message:
        "Hi! I reviewed your portfolio and I'm impressed with your React work.",
      time: "10:30 AM",
      isOwn: false,
      status: "read",
    },
    {
      id: 2,
      senderId: "me",
      senderName: "You",
      message:
        "Thank you! I'm excited about the SaaS platform project. When can we discuss the requirements in detail?",
      time: "10:32 AM",
      isOwn: true,
      status: "read",
    },
    {
      id: 3,
      senderId: 1,
      senderName: "Sarah Johnson",
      message:
        "Perfect! I'll send over the project brief and we can schedule a call for tomorrow. The timeline is flexible but we're hoping to start next week.",
      time: "10:35 AM",
      isOwn: false,
      status: "read",
    },
    {
      id: 4,
      senderId: "me",
      senderName: "You",
      message:
        "Sounds great! I've cleared my schedule for next week. Looking forward to the project brief.",
      time: "10:37 AM",
      isOwn: true,
      status: "delivered",
    },
    {
      id: 5,
      senderId: 1,
      senderName: "Sarah Johnson",
      message: "Thanks for the quick turnaround on the React components!",
      time: "2m ago",
      isOwn: false,
      status: "unread",
    },
    {
      id: 6,
      senderId: 1,
      senderName: "Sarah Johnson",
      message: "Thanks for the quick turnaround on the React components!",
      time: "2m ago",
      isOwn: false,
      status: "unread",
    },
    {
      id: 7,
      senderId: 1,
      senderName: "Sarah Johnson",
      message: "Thanks for the quick turnaround on the React components!",
      time: "2m ago",
      isOwn: false,
      status: "unread",
    },
  ];

  const selectedConv = conversations.find((c) => c.id === selectedConversation);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Here you would typically send the message to your backend
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="p-6">
      <div className="h-[80vh] bg-white dark:bg-[#3B3F42] rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 overflow-hidden">
        <div className="flex h-full">
          {/* Conversations Sidebar */}
          <div className="w-80 border-r border-gray-100 dark:border-gray-600 flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-100 dark:border-gray-600 flex-shrink-0">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Messages
                </h2>
                <button className="p-2 text-gray-400 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>

              {/* Search */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400 dark:text-gray-300" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg text-sm placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                  placeholder="Search conversations..."
                />
              </div>
            </div>

            {/* Conversations List */}
            <div className="flex-1 overflow-y-auto">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation.id)}
                  className={`p-4 border-b border-gray-50 dark:border-gray-700 cursor-pointer transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 ${
                    selectedConversation === conversation.id
                      ? "bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-100 dark:border-blue-600/50"
                      : ""
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <img
                        src={conversation.avatar}
                        alt={conversation.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      {conversation.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {conversation.name}
                        </h3>
                        <div className="flex items-center space-x-1">
                          {conversation.unread > 0 && (
                            <span className="w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
                              {conversation.unread}
                            </span>
                          )}
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {conversation.time}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                        {conversation.company}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                        {conversation.lastMessage}
                      </p>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {conversation.rating}
                          </span>
                        </div>
                        <span className="text-xs text-gray-400 dark:text-gray-400 truncate max-w-24">
                          {conversation.project}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {selectedConv ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-100 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img
                          src={selectedConv.avatar}
                          alt={selectedConv.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        {selectedConv.online && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {selectedConv.name}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {selectedConv.company}
                          </p>
                          <span className="text-xs text-gray-400 dark:text-gray-400">
                            •
                          </span>
                          <div className="flex items-center">
                            <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {selectedConv.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200">
                        <Phone className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200">
                        <Video className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  <div className="flex-1 p-4 space-y-4 overflow-y-auto min-h-0">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.isOwn ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                            message.isOwn
                              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                              : "bg-gray-100 dark:bg-gray-700/50 text-gray-900 dark:text-gray-300"
                          }`}
                        >
                          <p className="text-sm leading-relaxed">
                            {message.message}
                          </p>
                          <div
                            className={`flex items-center justify-between mt-1 ${
                              message.isOwn
                                ? "text-blue-100"
                                : "text-gray-500 dark:text-gray-400"
                            }`}
                          >
                            <span className="text-xs">{message.time}</span>
                            {message.isOwn && (
                              <CheckCheck
                                className={`h-3 w-3 ml-2 ${
                                  message.status === "read"
                                    ? "text-blue-200"
                                    : "text-blue-300"
                                }`}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-100 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 flex-shrink-0">
                  <div className="flex items-center space-x-3">
                    <button className="p-2 text-gray-400 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200">
                      <Paperclip className="h-4 w-4" />
                    </button>

                    <div className="flex-1">
                      <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                        className="w-full px-4 py-2 bg-white dark:bg-[#3B3F42] border border-gray-200 dark:border-gray-600 rounded-xl text-sm placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 resize-none"
                        rows={1}
                      />
                    </div>

                    <button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              /* No Conversation Selected */
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="h-8 w-8 text-gray-400 dark:text-gray-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Select a conversation
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Choose a conversation from the sidebar to start messaging
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;