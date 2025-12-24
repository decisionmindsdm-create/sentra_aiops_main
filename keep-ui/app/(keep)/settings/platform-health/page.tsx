"use client";

import { Card, Title, Text, Grid, Metric, Badge, ProgressBar } from "@tremor/react";
import { HeartIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

export default function PlatformHealthPage() {
  const healthMetrics = [
    {
      title: "API Uptime",
      value: "99.98%",
      status: "Excellent",
      color: "emerald"
    },
    {
      title: "Ingestion Latency",
      value: "1.3s",
      status: "Normal",
      color: "emerald"
    },
    {
      title: "AI Agent Status",
      value: "All Operational",
      status: "Healthy",
      color: "emerald"
    },
    {
      title: "Event Processing Queue",
      value: "Normal",
      status: "Stable",
      color: "emerald"
    }
  ];

  const systemEvents = [
    {
      timestamp: "2 hours ago",
      event: "Correlation engine restarted successfully",
      type: "Info"
    },
    {
      timestamp: "5 hours ago",
      event: "New AI model version deployed",
      type: "Update"
    },
    {
      timestamp: "8 hours ago",
      event: "Spike in ingestion rate handled automatically",
      type: "Success"
    },
    {
      timestamp: "12 hours ago",
      event: "Scheduled maintenance completed",
      type: "Info"
    },
    {
      timestamp: "1 day ago",
      event: "Database optimization completed",
      type: "Success"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <Title>Platform Health</Title>
        <Text className="mt-2">Monitor system performance and operational status</Text>
      </div>

      {/* Overall Status */}
      <Card decoration="top" decorationColor="emerald">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCircleIcon className="h-8 w-8 text-emerald-500" />
            <div>
              <Title>Overall System Status</Title>
              <Text className="text-gray-600 mt-1">All systems operational</Text>
            </div>
          </div>
          <Badge color="emerald" icon={CheckCircleIcon} className="text-lg px-4 py-2">
            Healthy ✅
          </Badge>
        </div>
      </Card>

      {/* Health Metrics */}
      <div>
        <Title className="mb-4">Health Summary</Title>
        <Grid numItemsMd={2} numItemsLg={4} className="gap-4">
          {healthMetrics.map((metric, idx) => (
            <Card key={idx}>
              <div className="flex items-center gap-2 mb-2">
                <HeartIcon className="h-5 w-5 text-gray-500" />
                <Text className="text-gray-600">{metric.title}</Text>
              </div>
              <Metric className="mt-2">{metric.value}</Metric>
              <div className="mt-3">
                <Badge color={metric.color as any}>{metric.status}</Badge>
              </div>
            </Card>
          ))}
        </Grid>
      </div>

      {/* System Metrics */}
      <Card>
        <Title className="mb-4">Performance Metrics</Title>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <Text>CPU Usage</Text>
              <Text className="font-semibold">42%</Text>
            </div>
            <ProgressBar value={42} color="emerald" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <Text>Memory Usage</Text>
              <Text className="font-semibold">68%</Text>
            </div>
            <ProgressBar value={68} color="emerald" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <Text>Storage Usage</Text>
              <Text className="font-semibold">55%</Text>
            </div>
            <ProgressBar value={55} color="emerald" />
          </div>
        </div>
      </Card>

      {/* Recent System Events */}
      <Card>
        <Title className="mb-4">Recent System Events</Title>
        <div className="space-y-3">
          {systemEvents.map((event, idx) => (
            <div key={idx} className="flex items-start gap-3 py-2 border-b border-gray-100 last:border-b-0">
              <div className="flex-shrink-0 mt-1">
                <div className={`w-2 h-2 rounded-full ${
                  event.type === "Success" ? "bg-emerald-500" :
                  event.type === "Update" ? "bg-blue-500" :
                  "bg-gray-400"
                }`} />
              </div>
              <div className="flex-1 min-w-0">
                <Text className="font-medium">{event.event}</Text>
                <Text className="text-gray-500 text-sm mt-1">{event.timestamp}</Text>
              </div>
              <Badge 
                color={
                  event.type === "Success" ? "emerald" :
                  event.type === "Update" ? "blue" :
                  "gray"
                }
                className="flex-shrink-0"
              >
                {event.type}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}