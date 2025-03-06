"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Moon, Sun, Bell, MessageCircle, FileText } from "lucide-react";
import Link from 'next/link';

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('English');
  const [notificationCount, setNotificationCount] = useState(2);
  const [chatCount, setChatCount] = useState(1);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showChatTray, setShowChatTray] = useState(false);

  const notifications = [
    { id: 1, message: "TATA Yodha consuming more fuel than expected" },
    { id: 2, message: "Order ID 324 delayed by 24mins" }
  ];

  const handleBadgeClick = () => {
    setShowNotifications(!showNotifications);
  };

  const handleChatClick = () => {
    setShowChatTray(!showChatTray);
  };

  return (
    <nav className="flex justify-between items-center py-4 px-6 bg-gray-100 text-primary dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-4">
        <Image src="/logo.png" alt="Fleety Logo" width={180} height={50} priority/>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
        <Link href="/Reports">
          <Button className="ml-2 bg-transparent border-transparent text-primary hover:text-white">
            Reports <FileText />
          </Button>
        </Link>
          <Button onClick={handleBadgeClick} className="relative ml-2 bg-transparent border-transparent text-primary hover:text-white"> 
            Notifications <Bell />
            {notificationCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1">
                {notificationCount}
              </span>
            )}
          </Button>
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50 border border-gray-200 dark:border-gray-700">
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-3">Notifications</h3>
                {notifications.map((notification) => (
                  <div key={notification.id} className="p-3 mb-2 bg-red-50 text-red-800 rounded-md">
                    {notification.message}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <Button onClick={handleChatClick} className="relative ml-2 bg-transparent border-transparent text-primary hover:text-white"> 
          Chat <MessageCircle />
          {chatCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1 ">
              {chatCount}
            </span>
          )}
        </Button>
        {showChatTray && (
          <div className="absolute right-14 mt-10 w-80 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50 border border-gray-200 dark:border-gray-700 p-4">
            <p className="text-lg">hi</p>
          </div>
        )}
        
        <Avatar>
          <AvatarImage src="https://c.pxhere.com/photos/08/7a/male_portrait_profile_social_media_cv_young_elegant_suit-459413.jpg!d" width={50} alt="User Avatar" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
}