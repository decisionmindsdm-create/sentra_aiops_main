"use client";

import { Subtitle } from "@tremor/react";
import { LinkWithIcon } from "components/LinkWithIcon";
import { Session } from "next-auth";
import { Disclosure } from "@headlessui/react";
import { IoChevronUp } from "react-icons/io5";
import { 
  CommandLineIcon,
  ChartPieIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ClockIcon
} from "@heroicons/react/24/outline";
import { HiServer, HiCubeTransparent, HiDatabase } from "react-icons/hi";
import clsx from "clsx";

type ControlPlaneLinksProps = { session: Session | null };

export const ControlPlaneLinks = ({ session }: ControlPlaneLinksProps) => {
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
              <CommandLineIcon className="h-4 w-4 text-gray-500" />
              <Subtitle className="text-xs text-gray-600 font-semibold uppercase">
                CONTROL PLANE
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
            href="/control-plane/overview"
            icon={ChartPieIcon}
            testId="control-plane-overview"
          >
            <Subtitle className="text-xs">Overview</Subtitle>
          </LinkWithIcon>
        </li>
        
        {/* Observability nested section */}
        <li>
          <Disclosure as="div" className="space-y-0.5">
            {({ open }) => (
              <>
                <Disclosure.Button as="div" className="flex items-center justify-between py-0.5 px-1 font-medium rounded-lg focus:ring focus:ring-blue-300 hover:bg-white/60 group w-full min-w-0 transition-all duration-200 cursor-pointer">
                  <div className="flex items-center space-x-1 flex-1 min-w-0">
                    <div className="group-hover:text-[#3BA3D4] transition-colors duration-200 text-gray-600">
                      <HiServer className="h-4 w-4" />
                    </div>
                    <span className="truncate transition-colors duration-200 text-gray-700">
                      <Subtitle className="text-xs">Observability</Subtitle>
                    </span>
                  </div>
                  <div className="flex items-center">
                    <IoChevronUp
                      className={clsx(
                        { "rotate-180": open },
                        "h-3 w-3 text-gray-500 ml-1"
                      )}
                    />
                  </div>
                </Disclosure.Button>
                <Disclosure.Panel as="ul" className="ml-6 space-y-0.5">
                  <li>
                    <LinkWithIcon
                      href="/control-plane/observability/infrastructure"
                      icon={HiServer}
                      testId="control-plane-observability-infrastructure"
                    >
                      <Subtitle className="text-xs">Infrastructure</Subtitle>
                    </LinkWithIcon>
                  </li>
                  <li>
                    <LinkWithIcon
                      href="/control-plane/observability/applications"
                      icon={HiCubeTransparent}
                      testId="control-plane-observability-applications"
                    >
                      <Subtitle className="text-xs">Applications</Subtitle>
                    </LinkWithIcon>
                  </li>
                  <li>
                    <LinkWithIcon
                      href="/control-plane/observability/data"
                      icon={HiDatabase}
                      testId="control-plane-observability-data"
                    >
                      <Subtitle className="text-xs">Data</Subtitle>
                    </LinkWithIcon>
                  </li>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </li>

        {/* Requests nested section */}
        <li>
          <Disclosure as="div" className="space-y-0.5">
            {({ open }) => (
              <>
                <Disclosure.Button as="div" className="flex items-center justify-between py-0.5 px-1 font-medium rounded-lg focus:ring focus:ring-blue-300 hover:bg-white/60 group w-full min-w-0 transition-all duration-200 cursor-pointer">
                  <div className="flex items-center space-x-1 flex-1 min-w-0">
                    <div className="group-hover:text-[#3BA3D4] transition-colors duration-200 text-gray-600">
                      <DocumentTextIcon className="h-4 w-4" />
                    </div>
                    <span className="truncate transition-colors duration-200 text-gray-700">
                      <Subtitle className="text-xs">Requests</Subtitle>
                    </span>
                  </div>
                  <div className="flex items-center">
                    <IoChevronUp
                      className={clsx(
                        { "rotate-180": open },
                        "h-3 w-3 text-gray-500 ml-1"
                      )}
                    />
                  </div>
                </Disclosure.Button>
                <Disclosure.Panel as="ul" className="ml-6 space-y-0.5">
                  <li>
                    <LinkWithIcon
                      href="/control-plane/requests/employee"
                      icon={DocumentTextIcon}
                      testId="control-plane-requests-employee"
                    >
                      <Subtitle className="text-xs">Employee Requests</Subtitle>
                    </LinkWithIcon>
                  </li>
                  <li>
                    <LinkWithIcon
                      href="/control-plane/requests/system-action"
                      icon={CommandLineIcon}
                      testId="control-plane-requests-system-action"
                    >
                      <Subtitle className="text-xs">System Action Requests</Subtitle>
                    </LinkWithIcon>
                  </li>
                  <li>
                    <LinkWithIcon
                      href="/control-plane/requests/change"
                      icon={DocumentTextIcon}
                      testId="control-plane-requests-change"
                    >
                      <Subtitle className="text-xs">Change Requests</Subtitle>
                    </LinkWithIcon>
                  </li>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </li>

        <li>
          <LinkWithIcon
            href="/control-plane/approvals"
            icon={CheckCircleIcon}
            testId="control-plane-approvals"
          >
            <Subtitle className="text-xs">Approvals</Subtitle>
          </LinkWithIcon>
        </li>
        <li>
          <LinkWithIcon
            href="/control-plane/activity-timeline"
            icon={ClockIcon}
            testId="control-plane-activity-timeline"
          >
            <Subtitle className="text-xs">Activity Timeline</Subtitle>
          </LinkWithIcon>
        </li>
      </Disclosure.Panel>
    </Disclosure>
  );
};