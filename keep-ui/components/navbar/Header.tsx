"use client";

import { Session } from "next-auth";
import Link from "next/link";
import Image from "next/image";
import { VscDebugDisconnect } from "react-icons/vsc";
import { FaSlack } from "react-icons/fa";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { useConfig } from "utils/hooks/useConfig";
import KeepPng from "../../keep.png";
import UserAvatar from "./UserAvatar";
import { Menu } from "@headlessui/react";
import { useFloating } from "@floating-ui/react";
import { ThemeControl } from "@/shared/ui";
import { useSignOut } from "@/shared/lib/hooks/useSignOut";
import { AuthType } from "@/utils/authenticationType";

type HeaderProps = {
  session: Session | null;
  searchComponent: React.ReactNode;
};

const UserDropdown = ({ session }: { session: Session }) => {
  const { data: configData } = useConfig();
  const signOut = useSignOut();
  const { refs, floatingStyles } = useFloating({
    placement: "bottom-end",
    strategy: "fixed",
  });

  if (!session || !session.user) {
    return null;
  }
  const { userRole, user } = session;
  const { name, image, email } = user;

  const isNoAuth = configData?.AUTH_TYPE === AuthType.NOAUTH;
  return (
    <Menu as="div" ref={refs.setReference} className="relative">
      <Menu.Button className="flex items-center justify-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-stone-200/50 font-medium rounded-lg hover:text-orange-400 focus:ring focus:ring-orange-300 capitalize">
        <UserAvatar image={image} name={name ?? email} />
        <span className="hidden xl:inline truncate">{name ?? email}</span>
      </Menu.Button>

      <Menu.Items
        className="w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-50"
        style={floatingStyles}
        ref={refs.setFloating}
        as="ul"
      >
        <div className="px-1 py-1">
          {userRole !== "noc" && (
            <li>
              <Menu.Item
                as={Link}
                href="/settings"
                className="ui-active:bg-orange-400 ui-active:text-white ui-not-active:text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm"
              >
                Settings
              </Menu.Item>
            </li>
          )}
          {!isNoAuth && (
            <li>
              <Menu.Item
                as="button"
                className="ui-active:bg-orange-400 ui-active:text-white ui-not-active:text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm"
                onClick={signOut}
              >
                Sign out
              </Menu.Item>
            </li>
          )}
        </div>
      </Menu.Items>
    </Menu>
  );
};

export const Header = ({ session, searchComponent }: HeaderProps) => {
  const { data: config } = useConfig();
  const docsUrl = config?.KEEP_DOCS_URL || "https://www.decisionminds.com/";

  // UI Change Only - functionality unchanged
  return (
    <header className="fixed top-0 left-0 right-0 z-50 header-shadow" style={{ backgroundColor: '#3BA3D4', height: '56px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)', borderBottom: 'none' }}>
      <div className="flex items-center justify-between h-full px-6 gap-4">
        {/* Logo - Left Side */}
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center">
            <Image className="w-8 h-8" src={KeepPng} alt="Dm Vivek Logo" priority />
          </Link>
        </div>

        {/* Search Bar - Center */}
        <div className="flex-1 max-w-3xl">
          {searchComponent}
        </div>

        {/* Header Buttons - Right Side */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Link
            href="/providers"
            className="flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-white/10 font-medium rounded-lg transition-all duration-200"
          >
            <VscDebugDisconnect className="w-4 h-4" />
            <span className="hidden lg:inline">Providers</span>
          </Link>

          <Link
            href="https://www.decisionminds.com/#contact/"
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-white/10 font-medium rounded-lg transition-all duration-200"
          >
            <FaSlack className="w-4 h-4" />
            <span className="hidden lg:inline">Contact</span>
          </Link>

          <Link
            href={docsUrl}
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-white/10 font-medium rounded-lg transition-all duration-200"
          >
            <HiOutlineDocumentText className="w-4 h-4" />
            <span className="hidden lg:inline">Docs</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
