"use client";

import { VscDebugDisconnect } from "react-icons/vsc";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { AiOutlineApi } from "react-icons/ai";
import Link from "next/link";

export const TopHeader = () => {
  return (
    <header className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 h-16 flex items-center justify-between px-6 shadow-md">
      {/* Logo Section */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center text-white font-bold text-xl">
          ∞
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-2xl mx-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search pages, features..."
            className="w-full px-4 py-2 pl-10 rounded-lg bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        {/* Providers Button */}
        <Link
          href="/providers"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors duration-200"
        >
          <VscDebugDisconnect className="w-4 h-4" />
          <span className="text-sm font-medium">Providers</span>
        </Link>

        {/* Contact Button */}
        <Link
          href="/settings"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors duration-200"
        >
          <AiOutlineApi className="w-4 h-4" />
          <span className="text-sm font-medium">Contact</span>
        </Link>

        {/* Docs Button */}
        <a
          href="https://www.decisionminds.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors duration-200"
        >
          <HiOutlineDocumentText className="w-4 h-4" />
          <span className="text-sm font-medium">Docs</span>
        </a>
      </div>
    </header>
  );
};
