"use client";

import React from "react";
import { Card, Title, Text, Badge } from "@tremor/react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RTooltip,
  Legend,
} from "recharts";
import { ArrowUp, ArrowDown } from "lucide-react";

// Infrastructure Metric Card Component
function InfraMetric({
  title,
  value,
  change,
  isPositive,
  bgColor = "bg-cyan-50",
}: {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  bgColor?: string;
}) {
  const TrendIcon = isPositive ? ArrowUp : ArrowDown;
  const trendColor = isPositive ? "text-green-600" : "text-red-600";

  return (
    <Card className={`p-4 ${bgColor} border-l-4 border-cyan-500`}>
      <div className="space-y-2">
        <Text className="text-xs text-gray-600">{title}</Text>
        <div className="text-3xl font-bold">{value}</div>
        <div className="flex items-center gap-1">
          <TrendIcon className={`h-3 w-3 ${trendColor}`} />
          <span className={`text-xs ${trendColor}`}>{change}</span>
        </div>
      </div>
    </Card>
  );
}

// Main Dashboard Component
export const Client: React.FC = () => {
  // Top 5 Hosts by Lowest Availability
  const hostAvailability = [
    { host: "srv-web-01", availability: 87 },
    { host: "srv-db-02", availability: 85 },
    { host: "srv-api-03", availability: 89 },
    { host: "srv-cache-04", availability: 84 },
    { host: "srv-worker-05", availability: 82 },
  ];

  // Host States
  const hostStates = [
    { name: "Completed", value: 85, color: "#22c55e" },
    { name: "To be Completed", value: 15, color: "#f59e0b" },
  ];

  // Network Traffic Trend
  const networkTraffic = [
    { time: "00:00", received: 120, sent: 95 },
    { time: "04:00", received: 145, sent: 105 },
    { time: "08:00", received: 185, sent: 125 },
    { time: "12:00", received: 215, sent: 115 },
    { time: "16:00", received: 190, sent: 110 },
    { time: "20:00", received: 160, sent: 105 },
  ];

  // Average Resource Usage
  const resourceUsage = [
    { time: "00:00", cpu: 45, memory: 58, disk: 62 },
    { time: "04:00", cpu: 52, memory: 62, disk: 63 },
    { time: "08:00", cpu: 68, memory: 72, disk: 65 },
    { time: "12:00", cpu: 72, memory: 68, disk: 64 },
    { time: "16:00", cpu: 65, memory: 75, disk: 66 },
    { time: "20:00", cpu: 58, memory: 70, disk: 58 },
  ];

  // Hosts with Highest Utilization
  const hostUtilization = [
    { hostname: "srv-app-01", cpu: 87, memory: 92, disk: 68, cpuLevel: "high", memoryLevel: "high", diskLevel: "medium" },
    { hostname: "srv-db-03", cpu: 82, memory: 88, disk: 75, cpuLevel: "high", memoryLevel: "high", diskLevel: "medium" },
    { hostname: "srv-web-02", cpu: 78, memory: 85, disk: 71, cpuLevel: "medium", memoryLevel: "high", diskLevel: "medium" },
    { hostname: "srv-api-05", cpu: 75, memory: 82, disk: 69, cpuLevel: "medium", memoryLevel: "high", diskLevel: "medium" },
    { hostname: "srv-cache-04", cpu: 72, memory: 79, disk: 65, cpuLevel: "medium", memoryLevel: "medium", diskLevel: "medium" },
  ];

  // Helper function to get badge color based on usage level
  const getBadgeColor = (level: string) => {
    if (level === "high") return "red";
    if (level === "medium") return "blue";
    return "green";
  };

  return (
    <div className="flex-1 flex flex-col h-full gap-6 px-4 py-5">
      {/* Header */}
      <div>
        <Title>Infrastructure Monitoring Dashboard</Title>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <InfraMetric title="Total Hosts" value="42" change="+5.00%" isPositive={true} bgColor="bg-cyan-50" />
        <InfraMetric title="Host Availability" value="95.8%" change="+2.3%" isPositive={true} bgColor="bg-green-50" />
        <InfraMetric title="Hosts with Problems" value="4" change="-20.0%" isPositive={true} bgColor="bg-blue-50" />
        <InfraMetric title="Total Network Traffic" value="1.2 TB" change="+12.5%" isPositive={true} bgColor="bg-teal-50" />
        <InfraMetric title="Average CPU Usage" value="62%" change="+3.2%" isPositive={false} bgColor="bg-sky-50" />
        <InfraMetric title="Average Memory Usage" value="68%" change="-1.5%" isPositive={true} bgColor="bg-indigo-50" />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Top 5 Hosts by Lowest Availability */}
        <Card className="p-4 border border-cyan-200">
          <div className="text-sm font-semibold mb-3">Top 5 Hosts by Lowest Availability</div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hostAvailability}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="host" tick={{ fontSize: 10 }} angle={-15} textAnchor="end" height={60} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
                <RTooltip />
                <Bar dataKey="availability" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Host States */}
        <Card className="p-4 border border-cyan-200">
          <div className="text-sm font-semibold mb-3">Host States</div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={hostStates}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label={({ name }) => name}
                >
                  {hostStates.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <RTooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Network Traffic Trend */}
        <Card className="p-4 border border-cyan-200">
          <div className="text-sm font-semibold mb-3">Network Traffic Trend</div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={networkTraffic}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} label={{ value: "Mbps", angle: -90, position: "insideLeft" }} />
                <RTooltip />
                <Legend />
                <Line type="monotone" dataKey="received" stroke="#3b82f6" strokeWidth={2} name="Received (Mbps)" />
                <Line type="monotone" dataKey="sent" stroke="#60a5fa" strokeWidth={2} name="Sent (Mbps)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Average Resource Usage */}
        <Card className="p-4 border border-cyan-200">
          <div className="text-sm font-semibold mb-3">Average Resource Usage</div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={resourceUsage}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
                <RTooltip />
                <Legend />
                <Line type="monotone" dataKey="cpu" stroke="#3b82f6" strokeWidth={2} name="CPU %" />
                <Line type="monotone" dataKey="memory" stroke="#8b5cf6" strokeWidth={2} name="Memory %" />
                <Line type="monotone" dataKey="disk" stroke="#60a5fa" strokeWidth={2} name="Disk %" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Hosts with Highest Utilization Table */}
      <Card className="p-4 border border-cyan-200">
        <div className="text-sm font-semibold mb-3">Hosts with Highest Utilization</div>
        <div className="overflow-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Hostname</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-600">CPU Usage</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-600">Memory Usage</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-600">Disk Usage</th>
              </tr>
            </thead>
            <tbody>
              {hostUtilization.map((host, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm">{host.hostname}</td>
                  <td className="py-3 px-4 text-center">
                    <Badge color={getBadgeColor(host.cpuLevel)} className="text-sm font-semibold">
                      {host.cpu}%
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Badge color={getBadgeColor(host.memoryLevel)} className="text-sm font-semibold">
                      {host.memory}%
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Badge color={getBadgeColor(host.diskLevel)} className="text-sm font-semibold">
                      {host.disk}%
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
