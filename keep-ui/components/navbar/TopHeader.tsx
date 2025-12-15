"use client";

import { useConfig } from "utils/hooks/useConfig";
import { VscDebugDisconnect } from "react-icons/vsc";
import { MdContacts } from "react-icons/md";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";

export const TopHeader = () => {
  const { data: config } = useConfig();
  const docsUrl = config?.KEEP_DOCS_URL || "https://www.decisionminds.com/";

  return (
    <header className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 h-16 flex items-center px-6 shadow-md col-span-full">
      <div className="flex items-center justify-between w-full">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center">
            <Image
              src="/icons/keep-icon.png"
              alt="DM AIOPS"
              width={32}
              height={32}
              className="brightness-0 invert"
            />
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search pages, features..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/providers"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors text-sm font-medium"
          >
            <VscDebugDisconnect className="h-4 w-4" />
            <span>Providers</span>
          </Link>

          <Link
            href="/settings"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors text-sm font-medium"
          >
            <MdContacts className="h-4 w-4" />
            <span>Contact</span>
          </Link>

          <Link
            href={docsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors text-sm font-medium"
          >
            <HiOutlineDocumentText className="h-4 w-4" />
            <span>Docs</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
