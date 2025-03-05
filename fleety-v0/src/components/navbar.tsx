"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Moon, Sun, Bell, MessageCircle } from "lucide-react";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('English');
  const [notificationCount, setNotificationCount] = useState(2);
  const [chatCount, setChatCount] = useState(1);

  const handleBadgeClick = () => {
    console.log('Badge clicked');
  };

  return (
    <nav className="flex justify-between items-center py-4 px-6 bg-gray-100 text-primary dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-4">
        <Image src="/logo.png" alt="Fleety Logo" width={180} height={50} priority/>
      </div>
      <div className="flex items-center space-x-4">
        <Select onValueChange={setLanguage} value={language} className="p-1 border-primary dark:border-primary text-primary dark:text-primary hover:text-primary hover:border-primary"> {/* Adjust padding here */}
          <SelectTrigger>
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent className="border-primary dark:border-primary">
            <SelectItem value="English">English</SelectItem>
            <SelectItem value="Hindi">हिन्दी</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={() => setDarkMode(!darkMode)} className="ml-2 bg-transparent border-transparent text-primary hover:text-white"> 
          {darkMode ? <Sun /> : <Moon />}
        </Button>
        <Button onClick={handleBadgeClick} className="relative ml-2 bg-transparent border-transparent text-primary hover:text-white"> 
          <Bell />
          {notificationCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1">
              {notificationCount}
            </span>
          )}
        </Button>
        <Button onClick={handleBadgeClick} className="relative ml-2 bg-transparent border-transparent text-primary hover:text-white"> 
          <MessageCircle />
          {chatCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1 ">
              {chatCount}
            </span>
          )}
        </Button>
        <Avatar>
          <AvatarImage src="https://c.pxhere.com/photos/08/7a/male_portrait_profile_social_media_cv_young_elegant_suit-459413.jpg!d" width={50} alt="User  Avatar" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
}

