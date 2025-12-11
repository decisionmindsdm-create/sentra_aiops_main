"use client";

import { Card, Badge, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@tremor/react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  PointElement, 
  LineElement, 
  ArcElement, 
  Title, 
  Tooltip, 
  Legend
);

// MetricCard Component
interface MetricCardProps {
  title: string;
  value: string | number;
  trend?: {
    value: string;
    direction: "up" | "down";
  };
  color?: string;
}

function MetricCard({ title, value, trend, color = "#ff8a00" }: MetricCardProps) {
  const trendColor = trend?.direction === "up" ? "text-chart-4" : "text-destructive";
  
  // Map colors to status classes matching Dashboard style
  const getStatusClass = (color: string) => {
    const colorMap: Record<string, string> = {
      "#f97316": "border-l-2 border-orange-500/80 bg-orange-500/5",
      "#10b981": "border-l-2 border-green-500/80 bg-green-500/5",
      "#ef4444": "border-l-2 border-red-500/80 bg-red-500/5",
      "#8b5cf6": "border-l-2 border-purple-500/80 bg-purple-500/5",
      "#06b6d4": "border-l-2 border-cyan-500/80 bg-cyan-500/5",
    };
    return colorMap[color] || "border-l-2 border-orange-500/80 bg-orange-500/5";
  };
  
  return (
    <Card className={`p-2.5 ${getStatusClass(color)}`}>
      <div className="flex flex-col gap-1">
        <p className="text-xs text-gray-500">{title}</p>
        <h2 className="text-xl font-bold font-mono">{value}</h2>
        {trend && (
          <div className="flex items-center gap-1">
            {trend.direction === "up" ? (
              <ArrowUp className={`h-3 w-3 ${trendColor}`} />
            ) : (
              <ArrowDown className={`h-3 w-3 ${trendColor}`} />
            )}
            <span className={`text-xs ${trendColor}`}>
              {trend.value}
            </span>
          </div>
        )}
      </div>
    </Card>
  );
}

// HostStatesChart Component
interface HostStatesChartProps {
  running: number;
  offline: number;
}

function HostStatesChart({ running, offline }: HostStatesChartProps) {
  const total = running + offline;
  const runningPercentage = Math.round((running / total) * 100);
  const offlinePercentage = Math.round((offline / total) * 100);

  const data = {
    labels: ["Completed", "To be Completed"],
    datasets: [
      {
        data: [running, offline],
        backgroundColor: ["#10b981", "#f97316"],
        borderColor: ["#ffffff", "#ffffff"],
        borderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          padding: 15,
          font: {
            family: "Inter, sans-serif",
            size: 13,
          },
          usePointStyle: true,
          pointStyle: "circle",
          generateLabels: (chart: any) => {
            const datasets = chart.data.datasets;
            return chart.data.labels.map((label: string, i: number) => ({
              text: label,
              fillStyle: datasets[0].backgroundColor[i],
              hidden: false,
              index: i,
            }));
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(45, 45, 45, 0.9)",
        padding: 12,
        titleFont: {
          family: "Inter, sans-serif",
          size: 13,
        },
        bodyFont: {
          family: "Inter, sans-serif",
          size: 12,
        },
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.parsed || 0;
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      },
      datalabels: {
        display: false,
      },
    },
  };

  return (
    <Card className="p-2.5">
      <div className="text-sm font-medium mb-2">
        Host States
      </div>
      <div className="h-[180px]">
        <Pie data={data} options={options} />
      </div>
    </Card>
  );
}

// AvailabilityChart Component
interface AvailabilityData {
  hostName: string;
  availability: number;
}

interface AvailabilityChartProps {
  data: AvailabilityData[];
}

function AvailabilityChart({ data }: AvailabilityChartProps) {
  const chartData = {
    labels: data.map((item) => item.hostName),
    datasets: [
      {
        label: "Availability %",
        data: data.map((item) => item.availability),
        backgroundColor: "#ff8a00",
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(45, 45, 45, 0.9)",
        padding: 12,
        titleFont: {
          family: "Inter, sans-serif",
          size: 13,
        },
        bodyFont: {
          family: "Inter, sans-serif",
          size: 12,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (value: any) => value + "%",
          font: {
            family: "Inter, sans-serif",
            size: 11,
          },
        },
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
      },
      x: {
        ticks: {
          font: {
            family: "Inter, sans-serif",
            size: 11,
          },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <Card className="p-2.5">
      <div className="text-sm font-medium mb-2">
        Top 5 Hosts by Lowest Availability
      </div>
      <div className="h-[180px]">
        <Bar data={chartData} options={options} />
      </div>
    </Card>
  );
}

// NetworkTrafficChart Component
interface NetworkTrafficData {
  labels: string[];
  received: number[];
  sent: number[];
}

interface NetworkTrafficChartProps {
  data: NetworkTrafficData;
}

function NetworkTrafficChart({ data }: NetworkTrafficChartProps) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "Received (Mbps)",
        data: data.received,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 5,
      },
      {
        label: "Sent (Mbps)",
        data: data.sent,
        borderColor: "#93c5fd",
        backgroundColor: "rgba(147, 197, 253, 0.1)",
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          padding: 15,
          font: {
            family: "Inter, sans-serif",
            size: 12,
          },
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        backgroundColor: "rgba(45, 45, 45, 0.9)",
        padding: 12,
        titleFont: {
          family: "Inter, sans-serif",
          size: 13,
        },
        bodyFont: {
          family: "Inter, sans-serif",
          size: 12,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: any) => value + " Mbps",
          font: {
            family: "Inter, sans-serif",
            size: 11,
          },
        },
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
      },
      x: {
        ticks: {
          font: {
            family: "Inter, sans-serif",
            size: 11,
          },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <Card className="p-2.5">
      <div className="text-sm font-medium mb-2">
        Network Traffic Trend
      </div>
      <div className="h-[180px]">
        <Line data={chartData} options={options} />
      </div>
    </Card>
  );
}

// ResourceUsageChart Component
interface ResourceUsageData {
  labels: string[];
  cpu: number[];
  memory: number[];
  disk: number[];
}

interface ResourceUsageChartProps {
  data: ResourceUsageData;
}

function ResourceUsageChart({ data }: ResourceUsageChartProps) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "CPU %",
        data: data.cpu,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 5,
      },
      {
        label: "Memory %",
        data: data.memory,
        borderColor: "#93c5fd",
        backgroundColor: "rgba(147, 197, 253, 0.1)",
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 5,
      },
      {
        label: "Disk %",
        data: data.disk,
        borderColor: "#60a5fa",
        backgroundColor: "rgba(96, 165, 250, 0.1)",
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          padding: 15,
          font: {
            family: "Inter, sans-serif",
            size: 12,
          },
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        backgroundColor: "rgba(45, 45, 45, 0.9)",
        padding: 12,
        titleFont: {
          family: "Inter, sans-serif",
          size: 13,
        },
        bodyFont: {
          family: "Inter, sans-serif",
          size: 12,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (value: any) => value + "%",
          font: {
            family: "Inter, sans-serif",
            size: 11,
          },
        },
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
      },
      x: {
        ticks: {
          font: {
            family: "Inter, sans-serif",
            size: 11,
          },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <Card className="p-2.5">
      <div className="text-sm font-medium mb-2">
        Average Resource Usage
      </div>
      <div className="h-[180px]">
        <Line data={chartData} options={options} />
      </div>
    </Card>
  );
}

// UtilizationTable Component
interface HostUtilization {
  hostname: string;
  cpu: number;
  memory: number;
  disk: number;
}

interface UtilizationTableProps {
  data: HostUtilization[];
}

function UtilizationTable({ data }: UtilizationTableProps) {
  const getStatusColor = (value: number, thresholds: { warning: number; critical: number }) => {
    if (value >= thresholds.critical) return "red";
    if (value >= thresholds.warning) return "orange";
    return "gray";
  };

  const getCpuColor = (cpu: number) => getStatusColor(cpu, { warning: 75, critical: 85 });
  const getMemoryColor = (memory: number) => getStatusColor(memory, { warning: 80, critical: 90 });
  const getDiskColor = (disk: number) => getStatusColor(disk, { warning: 65, critical: 80 });

  return (
    <Card className="p-2.5">
      <div className="text-sm font-medium mb-2">
        Hosts with Highest Utilization
      </div>
      <div className="overflow-auto">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell className="text-gray-600 font-medium">Hostname</TableHeaderCell>
              <TableHeaderCell className="text-gray-600 font-medium">CPU Usage</TableHeaderCell>
              <TableHeaderCell className="text-gray-600 font-medium">Memory Usage</TableHeaderCell>
              <TableHeaderCell className="text-gray-600 font-medium">Disk Usage</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((host, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium text-gray-900">{host.hostname}</TableCell>
                <TableCell>
                  <Badge color={getCpuColor(host.cpu)} size="lg">
                    {host.cpu}%
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge color={getMemoryColor(host.memory)} size="lg">
                    {host.memory}%
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge color={getDiskColor(host.disk)} size="lg">
                    {host.disk}%
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}

// Main Dashboard Component
export default function InfraMonitoringDashboard() {
  // Mock data for demonstration
  const mockAvailabilityData: AvailabilityData[] = [
    { hostName: "srv-web-01", availability: 92.5 },
    { hostName: "srv-db-02", availability: 88.3 },
    { hostName: "srv-api-03", availability: 95.1 },
    { hostName: "srv-cache-04", availability: 90.7 },
    { hostName: "srv-worker-05", availability: 87.2 },
  ];

  const mockNetworkData: NetworkTrafficData = {
    labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
    received: [120, 150, 180, 220, 190, 160],
    sent: [80, 95, 110, 130, 115, 100],
  };

  const mockResourceData: ResourceUsageData = {
    labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
    cpu: [45, 52, 68, 75, 62, 50],
    memory: [60, 62, 65, 70, 68, 64],
    disk: [75, 75, 76, 77, 78, 78],
  };

  const mockUtilizationData: HostUtilization[] = [
    { hostname: "srv-app-01", cpu: 87, memory: 92, disk: 68 },
    { hostname: "srv-db-03", cpu: 82, memory: 88, disk: 75 },
    { hostname: "srv-web-02", cpu: 78, memory: 85, disk: 71 },
    { hostname: "srv-api-05", cpu: 75, memory: 82, disk: 69 },
    { hostname: "srv-cache-04", cpu: 72, memory: 79, disk: 65 },
  ];

  return (
    <div className="flex-1 flex flex-col h-full gap-6 px-4 py-5">
      <div>
        <h1 className="text-2xl font-bold">Infra Monitoring Dashboard</h1>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-2.5">
        <MetricCard
          title="Total Hosts"
          value={42}
          trend={{ value: "+5.00%", direction: "up" }}
          color="#f97316"
        />
        <MetricCard
          title="Host Availability"
          value="95.8%"
          trend={{ value: "+2.3%", direction: "up" }}
          color="#10b981"
        />
        <MetricCard
          title="Hosts with Problems"
          value={4}
          trend={{ value: "-20.0%", direction: "down" }}
          color="#ef4444"
        />
        <MetricCard
          title="Total Network Traffic"
          value="1.2 TB"
          trend={{ value: "+12.5%", direction: "up" }}
          color="#8b5cf6"
        />
        <MetricCard
          title="Average CPU Usage"
          value="62%"
          trend={{ value: "+3.2%", direction: "up" }}
          color="#f97316"
        />
        <MetricCard
          title="Average Memory Usage"
          value="68%"
          trend={{ value: "-1.5%", direction: "down" }}
          color="#06b6d4"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
        <AvailabilityChart data={mockAvailabilityData} />
        <HostStatesChart running={38} offline={4} />
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
        <NetworkTrafficChart data={mockNetworkData} />
        <ResourceUsageChart data={mockResourceData} />
      </div>

      {/* Utilization Table */}
      <UtilizationTable data={mockUtilizationData} />
    </div>
  );
}
