"use client";

import { Subtitle } from "@tremor/react";
import { LinkWithIcon } from "components/LinkWithIcon";
import { Session } from "next-auth";
import { Disclosure } from "@headlessui/react";
import { IoChevronUp } from "react-icons/io5";
import { HiServer, HiCubeTransparent, HiDatabase } from "react-icons/hi";
import clsx from "clsx";

type ObservabilityLinksProps = { session: Session | null };

export const ObservabilityLinks = ({ session }: ObservabilityLinksProps) => {
  const isNOCRole = session?.userRole === "noc";

  if (isNOCRole) {
    return null;
  }

  return (
    <Disclosure as="div" className="space-y-0.5" defaultOpen>
      <Disclosure.Button className="w-full flex justify-between items-center px-2">
        {({ open }) => (
          <>
            <Subtitle className="text-xs ml-2 text-gray-600 font-semibold uppercase">
              OBSERVABILITY
            </Subtitle>
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
            href="/observability/infrastructure"
            icon={HiServer}
            testId="observability-infrastructure"
          >
            <Subtitle className="text-xs">Infrastructure</Subtitle>
          </LinkWithIcon>
        </li>
        <li>
          <LinkWithIcon
            href="/observability/applications"
            icon={HiCubeTransparent}
            testId="observability-applications"
          >
            <Subtitle className="text-xs">Applications</Subtitle>
          </LinkWithIcon>
        </li>
        <li>
          <LinkWithIcon
            href="/observability/data"
            icon={HiDatabase}
            testId="observability-data"
          >
            <Subtitle className="text-xs">Data</Subtitle>
          </LinkWithIcon>
        </li>
      </Disclosure.Panel>
    </Disclosure>
  );
};