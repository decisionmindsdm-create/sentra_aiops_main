"use client";

import React from "react";
import { Card, Title, Text } from "@tremor/react";
import {
  ResponsiveContainer,
  ComposedChart,
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

// Summary Metric Card Component
function SummaryMetric({
  title,
  value,
  change,
  isPositive,
  bgColor = "bg-blue-50",
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
    <Card className={`p-4 ${bgColor}`}>
      <div className="space-y-2">
        <Text className="text-xs text-gray-600 uppercase">{title}</Text>
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
  // Build Volume & Backlog Data
  const buildVolumeData = [
    { month: "Jan", volume: 320, backlog: 52 },
    { month: "Feb", volume: 280, backlog: 48 },
    { month: "Mar", volume: 380, backlog: 55 },
    { month: "Apr", volume: 290, backlog: 42 },
    { month: "May", volume: 340, backlog: 58 },
    { month: "Jun", volume: 270, backlog: 45 },
  ];

  // MTTR by Priority Data
  const mttrData = [
    { priority: "Critical (Sev-1)", mttr: 2 },
    { priority: "High (Sev-2)", mttr: 15 },
    { priority: "Medium (Sev-3)", mttr: 42 },
  ];

  // Deployment Failures by Service
  const deploymentFailures = [
    { service: "Auth Service", failures: 3 },
    { service: "Payment API", failures: 6 },
    { service: "User Service", failures: 2 },
    { service: "Analytics", failures: 5 },
    { service: "Notification", failures: 4 },
  ];

  // Top Incident Categories
  const incidentCategories = [
    { name: "Database Errors", value: 23.2, color: "#f59e0b" },
    { name: "API Timeouts", value: 18.7, color: "#60a5fa" },
    { name: "UI/Login Issues", value: 14.8, color: "#eab308" },
    { name: "Network Issues", value: 12.5, color: "#fb923c" },
  ];

  // MTBF Trend Data
  const mtbfData = [
    { month: "Jan", mtbf: 168 },
    { month: "Feb", mtbf: 192 },
    { month: "Mar", mtbf: 156 },
    { month: "Apr", mtbf: 220 },
    { month: "May", mtbf: 175 },
    { month: "Jun", mtbf: 185 },
  ];

  // RCA Completion Rate
  const rcaData = [
    { name: "Completed", value: 70, color: "#22c55e" },
    { name: "In Progress", value: 20, color: "#60a5fa" },
    { name: "Pending", value: 10, color: "#f59e0b" },
  ];

  return (
    <div className="flex-1 flex flex-col h-full gap-6 px-4 py-5">
      {/* Header */}
      <div>
        <Title>DevOps Monitoring Dashboard</Title>
      </div>

      {/* Summary Metrics - Last Week */}
      <div>
        <Text className="text-sm font-medium mb-3">Summary Metrics - Last Week</Text>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <SummaryMetric
            title="Deployment Frequency"
            value="47"
            change="+12.50%"
            isPositive={true}
            bgColor="bg-cyan-50"
          />
          <SummaryMetric
            title="Deployment Success Rate"
            value="98.3%"
            change="+2.10%"
            isPositive={true}
            bgColor="bg-green-50"
          />
          <SummaryMetric
            title="Mean Build Time (MBT)"
            value="4.2m"
            change="-8.50%"
            isPositive={true}
            bgColor="bg-blue-50"
          />
          <SummaryMetric
            title="Incidents Triggered"
            value="3"
            change="-25.00%"
            isPositive={true}
            bgColor="bg-teal-50"
          />
          <SummaryMetric
            title="Auto-Heal Success Rate"
            value="94.7%"
            change="+3.20%"
            isPositive={true}
            bgColor="bg-sky-50"
          />
        </div>
      </div>

      {/* Reactive DevOps Pulse */}
      <div>
        <Text className="text-sm font-medium mb-3">Reactive DevOps Pulse</Text>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Build Volume & Backlog */}
          <Card className="p-4">
            <div className="text-sm font-semibold mb-3">Build Volume & Backlog</div>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={buildVolumeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                  <YAxis yAxisId="left" tick={{ fontSize: 10 }} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10 }} />
                  <RTooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="volume" name="Build Volume" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="backlog"
                    name="Backlog"
                    stroke="#60a5fa"
                    strokeWidth={2}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* MTTR by Priority */}
          <Card className="p-4">
            <div className="text-sm font-semibold mb-3">MTTR by Priority</div>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mttrData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" tick={{ fontSize: 10 }} />
                  <YAxis dataKey="priority" type="category" width={120} tick={{ fontSize: 10 }} />
                  <RTooltip />
                  <Bar dataKey="mttr" fill="#60a5fa" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Deployment Failures by Service */}
        <Card className="p-4">
          <div className="text-sm font-semibold mb-3">Deployment Failures by Service</div>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deploymentFailures}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="service" tick={{ fontSize: 10 }} angle={-15} textAnchor="end" height={80} />
                <YAxis tick={{ fontSize: 10 }} />
                <RTooltip />
                <Bar dataKey="failures" fill="#fb923c" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Top Incident Categories */}
        <Card className="p-4">
          <div className="text-sm font-semibold mb-3">Top Incident Categories</div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={incidentCategories}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={2}
                  >
                    {incidentCategories.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <RTooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              {incidentCategories.map((cat, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: cat.color }} />
                    <span className="text-xs">{cat.name}</span>
                  </div>
                  <span className="text-sm font-semibold">{cat.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Stability & Quality */}
      <div>
        <Text className="text-sm font-medium mb-3">Stability & Quality</Text>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* MTBF Trend */}
          <Card className="p-4">
            <div className="text-sm font-semibold mb-3">MTBF Trend</div>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mtbfData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                  <YAxis domain={[0, 240]} tick={{ fontSize: 10 }} />
                  <RTooltip />
                  <Line type="monotone" dataKey="mtbf" stroke="#60a5fa" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* RCA Completion Rate */}
          <Card className="p-4">
            <div className="text-sm font-semibold mb-3">RCA Completion Rate</div>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={rcaData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {rcaData.map((entry, i) => (
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
      </div>
    </div>
  );
};
