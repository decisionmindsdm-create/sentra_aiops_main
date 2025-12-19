"use client";

import { useState } from "react";
import { Card, Title, TabGroup, TabList, Tab, TabPanels, TabPanel } from "@tremor/react";
import { ResourceType, TabType } from "../types";
import { OverviewTab } from "./tabs/OverviewTab";
import { MetricsTab } from "./tabs/MetricsTab";
import { LogsTab } from "./tabs/LogsTab";
import { TracesTab } from "./tabs/TracesTab";
import { TopologyTab } from "./tabs/TopologyTab";
import { HiServer, HiCubeTransparent } from "react-icons/hi";
import { SiKubernetes } from "react-icons/si";
import { FaCloud, FaNetworkWired } from "react-icons/fa";
import clsx from "clsx";

const resourceTypes: { value: ResourceType; label: string; icon: any }[] = [
  { value: "hosts", label: "Hosts", icon: HiServer },
  { value: "kubernetes", label: "Kubernetes", icon: SiKubernetes },
  { value: "cloud", label: "Cloud Resources", icon: FaCloud },
  { value: "network-storage", label: "Network & Storage", icon: FaNetworkWired },
];

const tabs: { value: TabType; label: string }[] = [
  { value: "overview", label: "Overview" },
  { value: "metrics", label: "Metrics" },
  { value: "logs", label: "Logs" },
  { value: "traces", label: "Traces" },
  { value: "topology", label: "Topology" },
];

export default function InfrastructurePage() {
  const [selectedResource, setSelectedResource] = useState<ResourceType>("hosts");
  const [selectedTab, setSelectedTab] = useState<TabType>("overview");

  return (
    <div className="space-y-4 p-4">
      <div>
        <Title className="text-2xl font-bold text-gray-900">Infrastructure Observability</Title>
        <p className="text-sm text-gray-600 mt-1">Monitor and analyze your infrastructure resources</p>
      </div>

      {/* Resource Type Selector */}
      <Card className="!p-2">
        <div className="flex gap-2">
          {resourceTypes.map((resource) => {
            const Icon = resource.icon;
            const isSelected = selectedResource === resource.value;
            return (
              <button
                key={resource.value}
                onClick={() => setSelectedResource(resource.value)}
                className={clsx(
                  "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 flex-1",
                  isSelected
                    ? "bg-[#1670A6] text-white shadow-md"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                )}
              >
                <Icon className="w-5 h-5" />
                <span>{resource.label}</span>
              </button>
            );
          })}
        </div>
      </Card>

      {/* Tab Navigation */}
      <TabGroup
        index={tabs.findIndex((t) => t.value === selectedTab)}
        onIndexChange={(index) => setSelectedTab(tabs[index].value)}
      >
        <TabList className="border-b border-gray-200">
          {tabs.map((tab) => (
            <Tab
              key={tab.value}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#1670A6] data-[selected]:text-[#1670A6] data-[selected]:border-b-2 data-[selected]:border-[#1670A6]"
            >
              {tab.label}
            </Tab>
          ))}
        </TabList>

        <TabPanels>
          <TabPanel>
            <OverviewTab resourceType={selectedResource} />
          </TabPanel>
          <TabPanel>
            <MetricsTab resourceType={selectedResource} />
          </TabPanel>
          <TabPanel>
            <LogsTab resourceType={selectedResource} />
          </TabPanel>
          <TabPanel>
            <TracesTab resourceType={selectedResource} />
          </TabPanel>
          <TabPanel>
            <TopologyTab resourceType={selectedResource} />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
}