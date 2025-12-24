"use client";

import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  TouchSensor,
  rectIntersection,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { usePathname, useRouter } from "next/navigation";
import { Subtitle, Button, Badge, Text } from "@tremor/react";
import { Disclosure } from "@headlessui/react";
import { IoChevronUp } from "react-icons/io5";
import clsx from "clsx";
import { useDashboards } from "utils/hooks/useDashboards";
import { useApi } from "@/shared/lib/hooks/useApi";
import { PlusIcon } from "@radix-ui/react-icons";
import { DashboardLink } from "./DashboardLink";
import { LinkWithIcon } from "components/LinkWithIcon";
import { MdOutlineFactCheck } from "react-icons/md";
import { AiOutlineCode, AiOutlineBarChart } from "react-icons/ai";
import { HiOutlineServer } from "react-icons/hi";
import { TbDatabase } from "react-icons/tb";
import { 
  ChartBarIcon,
  ComputerDesktopIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";

export const DashboardLinks = () => {
  const { dashboards = [], isLoading, error, mutate } = useDashboards();
  const api = useApi();
  const router = useRouter();
  const pathname = usePathname();

  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

  const onDragEnd = (event: any) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = dashboards.findIndex(
        (dashboard) => dashboard.id === active.id
      );
      const newIndex = dashboards.findIndex(
        (dashboard) => dashboard.id === over.id
      );
      const newDashboards = arrayMove(dashboards, oldIndex, newIndex);
      mutate(newDashboards, false);
    }
  };

  const deleteDashboard = async (id: string) => {
    const isDeleteConfirmed = confirm(
      "You are about to delete this dashboard. Are you sure?"
    );
    if (isDeleteConfirmed) {
      try {
        await api.delete(`/dashboard/${id}`);
        mutate(
          dashboards.filter((dashboard) => dashboard.id !== id),
          false
        );
        // now redirect to the first dashboard
        router.push(
          `/dashboard/${encodeURIComponent(dashboards[0].dashboard_name)}`
        );
      } catch (error) {
        console.error("Error deleting dashboard:", error);
      }
    }
  };

  const generateUniqueName = (baseName: string): string => {
    let uniqueName = baseName;
    let counter = 1;
    while (
      dashboards.some(
        (d) => d.dashboard_name.toLowerCase() === uniqueName.toLowerCase()
      )
    ) {
      uniqueName = `${baseName}(${counter})`;
      counter++;
    }
    return uniqueName;
  };

  const handleCreateDashboard = () => {
    const uniqueName = generateUniqueName("My Dashboard");
    router.push(`/dashboard/${encodeURIComponent(uniqueName)}`);
  };

  return (
    <Disclosure as="div" className="space-y-1" defaultOpen>
      <Disclosure.Button className="w-full flex justify-between items-center px-2">
        {({ open }) => (
          <>
            <div className="flex items-center gap-2">
              <Squares2X2Icon className="h-4 w-4 text-gray-500" />
              <Subtitle className="text-xs text-gray-600 font-semibold uppercase">
                Dashboards
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
      <Disclosure.Panel
        as="ul"
        // pr-4 to make space for scrollbar
        className="space-y-2 overflow-auto px-2 pr-4"
      >
        {/* Static Analysis Dashboard Link */}
        <LinkWithIcon href="/analysis" icon={AiOutlineBarChart}>
          <Subtitle
            className={clsx(
              "text-sm",
              {
                "text-gray-900": pathname === "/analysis",
              }
            )}
          >
            Executive Overview
          </Subtitle>
        </LinkWithIcon>
        
        <LinkWithIcon
                  href="/Operations-Dashboard"
                  icon={ComputerDesktopIcon}>
                  
                
          <Subtitle
            className={clsx(
              "text-sm",
              {
                "text-gray-900": pathname === "/Operations-Dashboard",
              }
            )}
          >
            Operations Dashboard
          </Subtitle>
        </LinkWithIcon>
              

        {/* Infra Monitoring Link */}
        <LinkWithIcon href="/infra-monitoring" icon={HiOutlineServer}>
          <Subtitle
            className={clsx(
              "text-sm",
              {
                "text-gray-900": pathname === "/infra-monitoring",
              }
            )}
          >
            Infrastructure Dashboard
          </Subtitle>
        </LinkWithIcon>


        {/* Data Quality Link */}
        <LinkWithIcon href="/Data-Platform" icon={TbDatabase}>
          <Subtitle
            className={clsx(
              "text-sm",
              {
                "text-gray-900": pathname === "/Data-Platform",
              }
            )}
          >
            Data Platform
          </Subtitle>
        </LinkWithIcon>
        {/* Appliation Monitoring Link */}
        <LinkWithIcon href="/Application " icon={AiOutlineCode}>
          <Subtitle
            className={clsx(
              "text-sm",
              {
                "text-gray-900": pathname === "/Application",
              }
            )}
          >
            Application
          </Subtitle>
        </LinkWithIcon>
        {/* DevOps Monitoring Link */}
        <LinkWithIcon href="/custom-dashboard" icon={ChartBarIcon}>
          <Subtitle
            className={clsx(
              "text-sm",
              {
                "text-gray-900": pathname === "/custom-dashboard",
              }
            )}
          >
            Custom Dashboard
          </Subtitle>
        </LinkWithIcon>


        <DndContext
          sensors={sensors}
          collisionDetection={rectIntersection}
          onDragEnd={onDragEnd}
        >
          <SortableContext items={dashboards.map((dashboard) => dashboard.id)}>
            {dashboards && dashboards.length > 0 &&
              dashboards.map((dashboard) => (
                <DashboardLink
                  key={dashboard.id}
                  dashboard={dashboard}
                  pathname={pathname}
                  deleteDashboard={deleteDashboard}
                  titleClassName="max-w-[150px] overflow-hidden overflow-ellipsis"
                />
              ))
            }
          </SortableContext>
        </DndContext>

      </Disclosure.Panel>
    </Disclosure>
  );
};
