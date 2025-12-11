// UI Change Only - functionality unchanged
"use client";

import { Menu } from "@headlessui/react";
import { Session } from "next-auth";
import { useConfig } from "utils/hooks/useConfig";
import { AuthType } from "@/utils/authenticationType";
import Link from "next/link";
import { useFloating } from "@floating-ui/react";
import { Subtitle } from "@tremor/react";
import UserAvatar from "./UserAvatar";
import { useSignOut } from "@/shared/lib/hooks/useSignOut";
import { ThemeControl } from "@/shared/ui";

const ONBOARDING_FLOW_ID = "flow_FHDz1hit";

type UserDropdownProps = {
  session: Session;
};

const UserDropdown = ({ session }: UserDropdownProps) => {
  const { data: configData } = useConfig();
  const signOut = useSignOut();
  const { refs, floatingStyles } = useFloating({
    placement: "right-end",
    strategy: "fixed",
  });

  if (!session || !session.user) {
    return null;
  }
  const { userRole, user } = session;
  const { name, image, email } = user;

  const isNoAuth = configData?.AUTH_TYPE === AuthType.NOAUTH;
  return (
    <Menu as="li" ref={refs.setReference} className="w-full">
      <Menu.Button className="flex items-center justify-between w-full text-sm pl-3 pr-2.5 py-2.5 text-slate-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50/50 font-medium rounded-xl focus:ring-2 focus:ring-blue-400/50 group capitalize transition-all duration-200 hover:shadow-md border border-transparent hover:border-blue-100">
        <span className="space-x-3 flex items-center w-full">
          <UserAvatar image={image} name={name ?? email} />{" "}
          <Subtitle className="truncate text-slate-700 font-semibold">{name ?? email}</Subtitle>
        </span>
      </Menu.Button>

      <Menu.Items
        className="w-52 ml-2 origin-right divide-y divide-slate-100 rounded-xl bg-white shadow-2xl ring-1 ring-slate-200/50 focus:outline-none z-10 border border-slate-200/60"
        style={floatingStyles}
        ref={refs.setFloating}
        as="ul"
      >
        <div className="px-1.5 py-1.5">
          {userRole !== "noc" && (
            <li>
              <Menu.Item
                as={Link}
                href="/settings"
                className="ui-active:bg-gradient-to-r ui-active:from-blue-500 ui-active:to-cyan-500 ui-active:text-white ui-not-active:text-slate-700 group flex w-full items-center rounded-lg px-3.5 py-2.5 text-sm font-semibold transition-all duration-200 hover:bg-slate-50"
              >
                Settings
              </Menu.Item>
            </li>
          )}
          {!isNoAuth && (
            <li>
              <Menu.Item
                as="button"
                className="ui-active:bg-gradient-to-r ui-active:from-blue-500 ui-active:to-cyan-500 ui-active:text-white ui-not-active:text-slate-700 group flex w-full items-center rounded-lg px-3.5 py-2.5 text-sm font-semibold transition-all duration-200 hover:bg-slate-50"
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

type UserInfoProps = {
  session: Session | null;
};

export const UserInfo = ({ session }: UserInfoProps) => {
  return (
    <ul className="space-y-2 p-3 border-t border-cyan-200/60 bg-gradient-to-b from-cyan-50/70 to-blue-50/60">
      <div className="flex items-center justify-between gap-2">
        {session && <UserDropdown session={session} />}
        <ThemeControl className="text-sm size-10 flex items-center justify-center font-medium rounded-xl focus:ring-2 focus:ring-blue-400/50 hover:!bg-slate-100 text-slate-700 transition-all duration-200 hover:shadow-md border border-transparent hover:border-slate-200" />
      </div>
    </ul>
  );
};
