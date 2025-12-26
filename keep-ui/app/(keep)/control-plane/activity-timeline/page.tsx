"use client";

import { useState } from "react";
import { Title, Card, Text, TabGroup, TabList, Tab, TabPanels, TabPanel, Badge, Flex } from "@tremor/react";

export default function ActivityTimelinePage() {
  const [selectedTab, setSelectedTab] = useState(0);

  const activities = [
    { id: 1, type: "AI Decision", actor: "RCA Agent", action: "Identified memory leak", target: "payments-db-22c", timestamp: "5 min ago", category: "ai" },
    { id: 2, type: "Human Action", actor: "Admin (Jane Smith)", action: "Approved scaling", target: "prod-cluster-1", timestamp: "15 min ago", category: "human" },
    { id: 3, type: "System Action", actor: "Autoscaler", action: "Cluster autoscaled", target: "prod-cluster-1", timestamp: "18 min ago", category: "system" },
    { id: 4, type: "AI Decision", actor: "Noise Dedup Agent", action: "Suppressed duplicate alerts", target: "alert-manager", timestamp: "25 min ago", category: "ai" },
    { id: 5, type: "Human Action", actor: "SRE (Mike Johnson)", action: "Restarted pod", target: "checkout-api-7fd", timestamp: "45 min ago", category: "human" },
    { id: 6, type: "System Action", actor: "Kubernetes", action: "Pod recreated", target: "checkout-api-7fd", timestamp: "46 min ago", category: "system" },
    { id: 7, type: "AI Decision", actor: "Correlation Agent", action: "Correlated 12 events", target: "incident-#4521", timestamp: "1 hour ago", category: "ai" },
    { id: 8, type: "Human Action", actor: "Admin (John Doe)", action: "Updated alert rule", target: "cpu-threshold-alert", timestamp: "2 hours ago", category: "human" }
  ];

  const filterActivities = (category: string) => {
    if (category === "all") return activities;
    return activities.filter(activity => activity.category === category);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "AI Decision": return "purple";
      case "Human Action": return "blue";
      case "System Action": return "green";
      default: return "gray";
    }
  };

  const renderTimeline = (filteredActivities: typeof activities) => (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-[11px] top-0 bottom-0 w-0.5 bg-gray-200" />
      
      <div className="space-y-6">
        {filteredActivities.map((activity, index) => (
          <div key={activity.id} className="relative flex gap-4">
            {/* Timeline dot */}
            <div className={`relative flex-shrink-0 w-6 h-6 rounded-full border-4 border-white ${
              activity.type === "AI Decision" ? "bg-purple-500" :
              activity.type === "Human Action" ? "bg-blue-500" : "bg-green-500"
            } shadow-sm z-10`} />
            
            {/* Activity card */}
            <Card className="flex-1 !p-4">
              <Flex alignItems="start" className="mb-2">
                <div className="flex-1">
                  <Flex className="gap-2 mb-1">
                    <Badge color={getTypeColor(activity.type)} className="!text-xs">
                      {activity.type}
                    </Badge>
                    <Text className="text-xs text-gray-500">{activity.timestamp}</Text>
                  </Flex>
                  <Text className="font-semibold text-sm">{activity.actor}</Text>
                </div>
              </Flex>
              <Text className="text-sm mb-1">{activity.action}</Text>
              <code className="text-xs bg-gray-100 px-2 py-1 rounded inline-block">
                {activity.target}
              </code>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <Title>Activity Timeline</Title>
      <Text className="mt-2 mb-6">Comprehensive view of all system and user activities</Text>

      <TabGroup index={selectedTab} onIndexChange={setSelectedTab}>
        <TabList>
          <Tab>All Activity</Tab>
          <Tab>AI Decisions</Tab>
          <Tab>Human Actions</Tab>
          <Tab>System Actions</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <div className="mt-6">
              {renderTimeline(filterActivities("all"))}
            </div>
          </TabPanel>
          
          <TabPanel>
            <div className="mt-6">
              {renderTimeline(filterActivities("ai"))}
            </div>
          </TabPanel>
          
          <TabPanel>
            <div className="mt-6">
              {renderTimeline(filterActivities("human"))}
            </div>
          </TabPanel>
          
          <TabPanel>
            <div className="mt-6">
              {renderTimeline(filterActivities("system"))}
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
}