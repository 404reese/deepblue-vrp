"use client";

import { useState } from "react";
import Image from "next/image";
import sidebarIcon from '@/images/sidebar-left-collapse.png';
import HomeIcon from '@/images/layout-dashboard.png';
import TruckIcon from '@/images/truck.png';
import WarehouseIcon from '@/images/warehouse.png';
import UserIcon from '@/images/users.png';
import BoxIcon from '@/images/box.png';

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`flex flex-col min-h-screen bg-gray-100 transition-width duration-300 ${
        collapsed ? "w-16 p-2" : "w-64 p-4" // Adjust padding based on collapsed state
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h1
          className={`text-xl font-bold ${
            collapsed ? "hidden" : "block"
          }`}
        >
          Admin Panel
        </h1>
        <button
          className="p-2 rounded-full hover:bg-gray-200"
          onClick={() => setCollapsed(!collapsed)}
        >
          <Image
            src={sidebarIcon}
            alt="Toggle Sidebar"
            className={`w-6 h-6 ${collapsed ? 'rotate-180' : ''}`}
            width={24}
            height={24}
            
          />
        </button>
      </div>
      <hr className="mb-4" />
      <ul>
        {[
          { href: "/", icon: HomeIcon, label: "Dashboard" },
          { href: "/Drivers", icon: UserIcon, label: "Drivers" },
          { href: "/Orders", icon: BoxIcon, label: "Orders" },
          { href: "/Trucks", icon: TruckIcon, label: "Trucks" },
          { href: "/Warehouses", icon: WarehouseIcon, label: "Warehouses" },
        ].map(({ href, icon, label }) => (
          <li key={label} className="mb-2">
            <a
              href={href}
              className={`flex items-center space-x-2 p-2 bg-gray-100 rounded-lg transition-colors duration-200 hover:bg-white ${
                collapsed ? "justify-center" : ""
              }`}
            >
              <Image
                src={icon}
                alt={label}
                className={`w-6 h-6`}
                width={24}
                height={24}
              />
              <span className={`${collapsed ? "hidden" : "block"}`}>
                {label}
              </span>
            </a>
          </li>
        ))}
      </ul>
      <div
        className={`mt-auto text-sm text-gray-500 ${
          collapsed ? "hidden" : "block"
        }`}
      >
        Software Version: 1.0.0
      </div>
    </div>
  );
}

