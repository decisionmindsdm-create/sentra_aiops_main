// UI Change Only - functionality unchanged
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { VscDebugDisconnect } from "react-icons/vsc";
import { FaSlack } from "react-icons/fa";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useConfig } from "@/utils/hooks/useConfig";
import KeepPng from "../../keep.png";

interface HeaderProps {
  session: Session | null;
}

export const Header = ({ session }: HeaderProps) => {
  const { data: config } = useConfig();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const docsUrl = config?.KEEP_DOCS_URL || "https://www.decisionminds.com/";

  // Get current tenant logo URL if available
  const currentTenant = session?.user?.tenantIds?.find(
    (tenant) => tenant.tenant_id === session.tenantId
  );
  const tenantLogoUrl = currentTenant?.tenant_logo_url;

  // Debug log to confirm header is rendering
  useEffect(() => {
    console.log('Header component mounted and visible!');
    console.log('Keep Logo path: /keep.png');
  }, []);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search navigation mapping with categories
  const searchRoutes = [
    // Dashboards
    { label: "Dashboard", path: "/analysis", category: "Dashboards", keywords: ["dashboard", "analysis"] },
    { label: "DevOps Monitoring", path: "/devops-monitoring", category: "Dashboards", keywords: ["devops", "monitoring"] },
    { label: "Data Quality", path: "/data-quality", category: "Dashboards", keywords: ["data", "quality"] },
    { label: "Infra Monitoring", path: "/infra-monitoring", category: "Dashboards", keywords: ["infra", "infrastructure", "monitoring"] },
    // Incidents
    { label: "Incidents", path: "/incidents", category: "Incidents", keywords: ["incident", "incidents"] },
    // Alerts
    { label: "Alerts Feed", path: "/alerts/feed", category: "Alerts", keywords: ["alert", "alerts", "feed"] },
    // Noise Reduction
    { label: "Deduplication", path: "/deduplication", category: "Noise Reduction", keywords: ["deduplication", "dedupe"] },
    { label: "Correlations", path: "/rules", category: "Noise Reduction", keywords: ["correlation", "correlations", "rules"] },
    { label: "Workflows", path: "/workflows", category: "Noise Reduction", keywords: ["workflow", "workflows"] },
    { label: "Service Topology", path: "/topology", category: "Noise Reduction", keywords: ["topology", "service"] },
    { label: "Mapping", path: "/mapping", category: "Noise Reduction", keywords: ["mapping"] },
    { label: "Extraction", path: "/extraction", category: "Noise Reduction", keywords: ["extraction"] },
    { label: "Maintenance", path: "/maintenance", category: "Noise Reduction", keywords: ["maintenance", "window"] },
    // Header Options
    { label: "Providers", path: "/providers", category: "Settings", keywords: ["provider", "providers"] },
    { label: "Settings", path: "/settings", category: "Settings", keywords: ["setting", "settings"] },
  ];

  // Filter search results based on query
  const filteredResults = searchQuery.trim()
    ? searchRoutes.filter(
        (route) =>
          route.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          route.keywords.some((keyword) =>
            keyword.toLowerCase().includes(searchQuery.toLowerCase())
          )
      )
    : [];

  // Debug log to check if filtering is working
  useEffect(() => {
    if (searchQuery.trim()) {
      console.log('Search query:', searchQuery);
      console.log('Filtered results:', filteredResults);
      console.log('Show dropdown:', showSearchResults);
    }
  }, [searchQuery, filteredResults, showSearchResults]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (filteredResults.length > 0) {
      router.push(filteredResults[0].path);
      setSearchQuery("");
      setShowSearchResults(false);
    }
  };

  const handleResultClick = (path: string) => {
    router.push(path);
    setSearchQuery("");
    setShowSearchResults(false);
  };

  // Group results by category
  const groupedResults = filteredResults.reduce((acc, route) => {
    if (!acc[route.category]) {
      acc[route.category] = [];
    }
    acc[route.category].push(route);
    return acc;
  }, {} as Record<string, typeof searchRoutes>);

  return (
    <header
      className="w-full bg-gradient-to-r from-[#085690] via-[#0a6fa8] to-[#085690] border-b border-[#0d88c0]/30 shadow-xl relative z-50"
      style={{ fontFamily: 'Inter, Roboto, system-ui, sans-serif' }}
    >
      <div className="flex items-center justify-between h-16 px-6 backdrop-blur-md bg-white/5">
        {/* Left: Logo */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <Link href="/" className="flex items-center gap-3">
            <Image className="w-8 h-8" src={KeepPng} alt="Keep Logo" priority />
            {tenantLogoUrl && (
              <Image
                src={tenantLogoUrl}
                alt={`${currentTenant?.tenant_name || "Tenant"} Logo`}
                width={60}
                height={60}
                className="object-cover"
              />
            )}
          </Link>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-2xl mx-8 relative" ref={searchRef}>
          <form onSubmit={handleSearch} className="relative">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
              <input
                type="text"
                placeholder="Search pages, features..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchResults(true);
                }}
                onFocus={() => setShowSearchResults(true)}
                autoComplete="off"
                spellCheck="false"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0d88c0] focus:border-[#0d88c0] transition-all duration-200 text-base bg-white placeholder-gray-400 text-gray-900 hover:border-gray-400 font-normal shadow-sm"
                style={{ fontFamily: 'Inter, Roboto, system-ui, sans-serif' }}
              />
            </div>

            {/* Search Results Dropdown - positioned absolutely relative to the search container */}
            {showSearchResults && searchQuery.trim() && (
              <div 
                className="absolute left-0 right-0 bg-gradient-to-b from-blue-50 to-white border-2 border-gray-300 rounded-lg shadow-2xl max-h-96 overflow-y-auto"
                style={{ top: 'calc(100% + 0.5rem)', zIndex: 9999, minWidth: '100%' }}
              >
                {filteredResults.length > 0 ? (
                  <div className="py-2">
                    {Object.entries(groupedResults).map(([category, routes]) => (
                      <div key={category} className="mb-3 last:mb-0">
                        <div className="px-4 py-2 text-xs font-bold text-gray-600 uppercase tracking-wider bg-blue-100">
                          {category}
                        </div>
                        {routes.map((route) => (
                          <button
                            key={route.path}
                            onClick={() => handleResultClick(route.path)}
                            className="w-full text-left px-4 py-3 hover:bg-[#0A74DA] hover:text-white transition-colors duration-150 text-sm flex items-center gap-3 text-gray-800 border-b border-blue-100 last:border-0"
                          >
                            <span className="font-medium">{route.label}</span>
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-8 text-center text-gray-600 text-sm font-medium">
                    No results found for &quot;{searchQuery}&quot;
                  </div>
                )}
              </div>
            )}
          </form>
        </div>

        {/* Right: Navigation Links */}
        <div className="flex items-center gap-3">
          <Link
            href="/providers"
            className="flex items-center gap-2.5 text-white hover:bg-white/20 transition-all duration-200 font-medium text-sm px-4 py-2 rounded-xl hover:shadow-xl border border-white/30 hover:border-[#0d88c0] backdrop-blur-sm bg-white/10 hover:scale-105 transform"
            style={{ fontFamily: 'Inter, Roboto, system-ui, sans-serif' }}
          >
            <VscDebugDisconnect className="w-5 h-5" />
            <span className="hidden xl:inline">Providers</span>
          </Link>

          <a
            href="https://www.decisionminds.com/#contact"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 text-white hover:bg-white/20 transition-all duration-200 font-medium text-sm px-4 py-2 rounded-xl hover:shadow-xl border border-white/30 hover:border-[#0d88c0] backdrop-blur-sm bg-white/10 hover:scale-105 transform"
            style={{ fontFamily: 'Inter, Roboto, system-ui, sans-serif' }}
          >
            <FaSlack className="w-5 h-5" />
            <span className="hidden xl:inline">Contact</span>
          </a>

          <a
            href={docsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 text-white hover:bg-white/20 transition-all duration-200 font-medium text-sm px-4 py-2 rounded-xl hover:shadow-xl border border-white/30 hover:border-[#0d88c0] backdrop-blur-sm bg-white/10 hover:scale-105 transform"
            style={{ fontFamily: 'Inter, Roboto, system-ui, sans-serif' }}
          >
            <HiOutlineDocumentText className="w-5 h-5" />
            <span className="hidden xl:inline">Docs</span>
          </a>
        </div>
      </div>
    </header>
  );
};
