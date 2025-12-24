"use client";

import { Subtitle } from "@tremor/react";
import { LinkWithIcon } from "components/LinkWithIcon";
import { Session } from "next-auth";
import { Disclosure } from "@headlessui/react";
import { IoChevronUp } from "react-icons/io5";
import { 
  UsersIcon, 
  UserGroupIcon,
  ServerIcon,
  CircleStackIcon,
  BellIcon,
  HeartIcon,
  Cog6ToothIcon
} from "@heroicons/react/24/outline";
import clsx from "clsx";

type SettingsLinksProps = { session: Session | null };

export const SettingsLinks = ({ session }: SettingsLinksProps) => {
  const isNOCRole = session?.userRole === "noc";

  if (isNOCRole) {
    return null;
  }

  return (
    <Disclosure as="div" className="space-y-0.5" defaultOpen>
      <Disclosure.Button className="w-full flex justify-between items-center px-2">
        {({ open }) => (
          <>
            <div className="flex items-center gap-2">
              <Cog6ToothIcon className="h-4 w-4 text-gray-500" />
              <Subtitle className="text-xs text-gray-600 font-semibold uppercase">
                SETTINGS
              </Subtitle>
            </div>
            <IoChevronUp
              className={clsx(
                { "rotate-180": open },
                "mr-2 text-gray-500"
              )}
            />
          </>
        )}
      </Disclosure.Button>

      <Disclosure.Panel as="ul" className="space-y-0.5 p-1 pr-1">
        <li>
          <LinkWithIcon
            href="/settings"
            icon={UsersIcon}
            testId="settings-users-roles"
          >
            <Subtitle className="text-xs">Users & Roles</Subtitle>
          </LinkWithIcon>
        </li>
        <li>
          <LinkWithIcon
            href="/settings/teams"
            icon={UserGroupIcon}
            testId="settings-teams"
          >
            <Subtitle className="text-xs">Teams & Ownership</Subtitle>
          </LinkWithIcon>
        </li>
        <li>
          <LinkWithIcon
            href="/settings/environments"
            icon={ServerIcon}
            testId="settings-environments"
          >
            <Subtitle className="text-xs">Environments</Subtitle>
          </LinkWithIcon>
        </li>
        <li>
          <LinkWithIcon
            href="/settings/data-sources"
            icon={CircleStackIcon}
            testId="settings-data-sources"
          >
            <Subtitle className="text-xs">Data Sources</Subtitle>
          </LinkWithIcon>
        </li>
        <li>
          <LinkWithIcon
            href="/settings/notifications"
            icon={BellIcon}
            testId="settings-notifications"
          >
            <Subtitle className="text-xs">Notification Preferences</Subtitle>
          </LinkWithIcon>
        </li>
        <li>
          <LinkWithIcon
            href="/settings/platform-health"
            icon={HeartIcon}
            testId="settings-platform-health"
          >
            <Subtitle className="text-xs">Platform Health</Subtitle>
          </LinkWithIcon>
        </li>
      </Disclosure.Panel>
    </Disclosure>
  );
};