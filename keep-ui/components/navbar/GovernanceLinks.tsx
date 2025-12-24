"use client";

import { Subtitle } from "@tremor/react";
import { LinkWithIcon } from "components/LinkWithIcon";
import { Session } from "next-auth";
import { Disclosure } from "@headlessui/react";
import { IoChevronUp } from "react-icons/io5";
import { 
  DocumentTextIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  ClipboardDocumentCheckIcon,
  ArrowDownTrayIcon
} from "@heroicons/react/24/outline";
import clsx from "clsx";

type GovernanceLinksProps = { session: Session | null };

export const GovernanceLinks = ({ session }: GovernanceLinksProps) => {
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
              <ShieldCheckIcon className="h-4 w-4 text-gray-500" />
              <Subtitle className="text-xs text-gray-600 font-semibold uppercase">
                GOVERNANCE
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
            href="/settings/governance/audit-logs"
            icon={DocumentTextIcon}
            testId="governance-audit-logs"
          >
            <Subtitle className="text-xs">Audit Logs</Subtitle>
          </LinkWithIcon>
        </li>
        <li>
          <LinkWithIcon
            href="/settings/governance/policies"
            icon={ShieldCheckIcon}
            testId="governance-policies"
          >
            <Subtitle className="text-xs">Policies</Subtitle>
          </LinkWithIcon>
        </li>
        <li>
          <LinkWithIcon
            href="/settings/governance/risk-management"
            icon={ExclamationTriangleIcon}
            testId="governance-risk-management"
          >
            <Subtitle className="text-xs">Risk Management</Subtitle>
          </LinkWithIcon>
        </li>
        <li>
          <LinkWithIcon
            href="/settings/governance/compliance"
            icon={ClipboardDocumentCheckIcon}
            testId="governance-compliance"
          >
            <Subtitle className="text-xs">Compliance</Subtitle>
          </LinkWithIcon>
        </li>
        <li>
          <LinkWithIcon
            href="/settings/governance/reports"
            icon={ArrowDownTrayIcon}
            testId="governance-reports"
          >
            <Subtitle className="text-xs">Reports & Exports</Subtitle>
          </LinkWithIcon>
        </li>
      </Disclosure.Panel>
    </Disclosure>
  );
};