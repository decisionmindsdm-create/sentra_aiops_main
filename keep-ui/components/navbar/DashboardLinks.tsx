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
import { Subtitle, Button } from "@tremor/react";
import { Disclosure } from "@headlessui/react";
import { IoChevronUp } from "react-icons/io5";
import clsx from "clsx";
import { useDashboards } from "utils/hooks/useDashboards";
import { useApi } from "@/shared/lib/hooks/useApi";
import { PlusIcon } from "@radix-ui/react-icons";
import { DashboardLink } from "./DashboardLink";
import { LinkWithIcon } from "../LinkWithIcon";
import { ExportIcon } from "../icons";
import { 
  ChartBarIcon,
  CodeBracketIcon,
  CircleStackIcon,
  ServerIcon
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
      const oldIndex = dashboards.findIndex((d) => d.id === active.id);
      const newIndex = dashboards.findIndex((d) => d.id === over.id);
      const newDashboards = arrayMove(dashboards, oldIndex, newIndex);
      mutate(newDashboards, false);
    }
  };

  const deleteDashboard = async (id: string) => {
    if (!confirm("You are about to delete this dashboard. Are you sure?")) return;

    try {
      await api.delete(`/dashboard/${id}`);
      const updated = dashboards.filter((d) => d.id !== id);
      mutate(updated, false);

      if (updated.length > 0) {
        router.push(`/dashboard/${encodeURIComponent(updated[0].dashboard_name)}`);
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error deleting dashboard:", error);
    }
  };

  const generateUniqueName = (baseName: string): string => {
    let uniqueName = baseName;
    let counter = 1;
    while (dashboards.some((d) => d.dashboard_name.toLowerCase() === uniqueName.toLowerCase())) {
      uniqueName = `${baseName} (${counter})`;
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
      {({ open }) => (
        <>
          <Disclosure.Button className="w-full flex justify-between items-center px-2 py-1 hover:bg-gray-50 rounded-md">
            <div className="flex justify-between items-center w-full">
              <Subtitle className="text-xs ml-2 text-gray-900 font-medium uppercase">
                Dashboards
              </Subtitle>
              <IoChevronUp
                className={clsx(
                  "mr-2 text-slate-400 transition-transform duration-200",
                  open && "rotate-180"
                )}
              />
            </div>
          </Disclosure.Button>

          <Disclosure.Panel
            as="div"
            className="px-2 pr-3 pb-2 mt-1 border-l border-gray-200 flex flex-col space-y-2"
          >
            {/* Top static links */}
            <ul className="space-y-2">
              <li>
                <LinkWithIcon
                  href="/analysis"
                  icon={ChartBarIcon}
                  testId="analysis"
                >
                  <Subtitle className="text-xs">Dashboard</Subtitle>
                </LinkWithIcon>
              </li>
              <li>
                <LinkWithIcon
                  href="/devops-monitoring"
                  icon={CodeBracketIcon}
                  testId="devops-monitoring"
                >
                  <Subtitle className="text-xs">DevOps Monitoring</Subtitle>
                </LinkWithIcon>
              </li>
              <li>
                <LinkWithIcon
                  href="/data-quality"
                  icon={CircleStackIcon}
                  testId="data-quality"
                >
                  <Subtitle className="text-xs">Data Quality</Subtitle>
                </LinkWithIcon>
              </li>
              <li>
                <LinkWithIcon
                  href="/infra-monitoring"
                  icon={ServerIcon}
                  testId="infra-monitoring"
                >
                  <Subtitle className="text-xs">Infra Monitoring</Subtitle>
                </LinkWithIcon>
              </li>
            </ul>

            {/* Scrollable Dashboard List */}
            <div className="max-h-60 overflow-auto mt-1 pr-1">
              <DndContext
                sensors={sensors}
                collisionDetection={rectIntersection}
                onDragEnd={onDragEnd}
              >
                <SortableContext items={dashboards.map((d) => d.id)}>
                  {dashboards.length > 0 && (
                    dashboards.map((dashboard) => (
                      <DashboardLink
                        key={dashboard.id}
                        dashboard={dashboard}
                        pathname={pathname}
                        deleteDashboard={deleteDashboard}
                        titleClassName="max-w-[150px] overflow-hidden overflow-ellipsis"
                      />
                    ))
                  )}
                </SortableContext>
              </DndContext>
            </div>

            {/* Fixed Button (Not Scrollable) */}
            {/* <div className="pt-2 border-t border-gray-200 -mx-2 -mr-3 px-2">
              <Button
                size="xs"
                color="orange"
                variant="secondary"
                className="h-6 w-full"
                onClick={handleCreateDashboard}
                icon={PlusIcon}
              >
                Add Dashboard
              </Button>
            </div> */}

          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
