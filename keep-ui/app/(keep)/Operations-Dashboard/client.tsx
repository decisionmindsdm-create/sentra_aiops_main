"use client";

import { Card } from "@tremor/react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Bar, Line, Doughnut, Chart as ChartComponent } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// ==================== INTERFACES ====================

interface MetricCardProps {
  title: string;
  value: string | number;
  trend?: {
    value: string;
    direction: "up" | "down";
  };
  borderColor?: string;
  bgColor?: string;
}

// ==================== COMPONENTS ====================

function MetricCard({ 
  title, 
  value, 
  trend,
  borderColor = "border-l-cyan-500",
  bgColor = "bg-white"
}: MetricCardProps) {
  const trendColor = trend?.direction === "up" ? "text-green-600" : "text-red-600";
  const TrendIcon = trend?.direction === "up" ? ArrowUp : ArrowDown;
  
  return (
    <Card className={`p-2.5 border-l-2 ${borderColor} ${bgColor}`}>
      <div className="flex flex-col gap-1">
        <p className="text-xs text-muted-foreground">{title}</p>
        <h2 className="text-xl font-bold font-mono">{value}</h2>
        {trend && (
          <div className="flex items-center gap-1">
            <TrendIcon className={`h-3 w-3 ${trendColor}`} />
            <span className={`text-xs ${trendColor}`}>
              {trend.value}
            </span>
          </div>
        )}
      </div>
    </Card>
  );
}

// Incident Volume & Backlog Chart
function IncidentVolumeChart() {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        type: "bar" as const,
        label: "Incident Volume",
        data: [12, 18, 8, 15, 24, 6, 4],
        backgroundColor: "#FF8C42",
        borderRadius: 4,
        yAxisID: 'y',
      },
      {
        type: "line" as const,
        label: "Backlog",
        data: [6, 9, 12, 9, 12, 3, 2],
        borderColor: "#5B9FE3",
        backgroundColor: "transparent",
        tension: 0.4,
        pointRadius: 6,
        pointBackgroundColor: "#5B9FE3",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        borderWidth: 3,
        yAxisID: 'y1',
      },
    ],
  } as any;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#fff",
        titleColor: "#000",
        bodyColor: "#666",
        borderColor: "#ddd",
        borderWidth: 1,
        padding: 12,
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        position: 'left' as const,
        beginAtZero: true,
        max: 24,
        ticks: {
          stepSize: 6,
          font: { size: 11 },
        },
        grid: {
          color: "#f0f0f0",
        },
      },
      y1: {
        type: 'linear' as const,
        position: 'right' as const,
        beginAtZero: true,
        max: 12,
        ticks: {
          stepSize: 3,
          font: { size: 11 },
        },
        grid: {
          drawOnChartArea: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: { size: 11 },
        },
      },
    },
  };

  return (
    <Card className="p-2.5">
      <h3 className="text-sm font-medium mb-2">Incident Volume & Backlog</h3>
      <div className="h-[180px]">
        <ChartComponent type="bar" data={data} options={options} />
      </div>
    </Card>
  );
}

// MTTR by Priority Chart
function MTTRByPriorityChart() {
  const data = {
    labels: ["Critical (P1)", "High (P2)", "Medium (P3)", "Low (P4)"],
    datasets: [
      {
        label: "MTTR (mins)",
        data: [5, 10, 18, 28],
        backgroundColor: ["#4A90E2", "#4A90E2", "#FF8C42", "#2ECC71"],
        borderRadius: 4,
        barThickness: 30,
      },
    ],
  };

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#fff",
        titleColor: "#000",
        bodyColor: "#666",
        borderColor: "#ddd",
        borderWidth: 1,
        padding: 12,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          font: { size: 11 },
        },
        grid: {
          color: "#f0f0f0",
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          font: { size: 11 },
        },
      },
    },
  };

  return (
    <Card className="p-2.5">
      <h3 className="text-sm font-medium mb-2">MTTR by Priority (mins)</h3>
      <div className="h-[180px]">
        <Bar data={data} options={options} />
      </div>
    </Card>
  );
}

// Manual vs Auto Remediation Chart
function ManualVsAutoChart() {
  const data = {
    labels: ["Auto-Remediation (AI RCA)", "Manual Resolution"],
    datasets: [
      {
        data: [65, 35],
        backgroundColor: ["#2ECC71", "#FF8C42"],
        borderColor: "#fff",
        borderWidth: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          padding: 15,
          font: { size: 12 },
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: "#fff",
        titleColor: "#000",
        bodyColor: "#666",
        borderColor: "#ddd",
        borderWidth: 1,
        padding: 12,
      },
    },
  };

  return (
    <Card className="p-2.5">
      <h3 className="text-sm font-medium mb-2">Manual vs Auto Remediation</h3>
      <div className="h-[180px] flex items-center justify-center">
        <div className="w-52 h-52">
          <Doughnut data={data} options={options} />
        </div>
      </div>
    </Card>
  );
}

// Top Incident Categories Chart
function TopIncidentCategoriesChart() {
  const data = {
    labels: ["Database Errors", "API Timeouts", "UI/Login", "Network", "Auth", "Batch Job"],
    datasets: [
      {
        data: [25, 30, 8, 15, 12, 10],
        backgroundColor: ["#FF8C42", "#4A90E2", "#2ECC71", "#4A90E2", "#FFC107", "#2ECC71"],
        borderColor: "#fff",
        borderWidth: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "65%",
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          padding: 12,
          font: { size: 11 },
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: "#fff",
        titleColor: "#000",
        bodyColor: "#666",
        borderColor: "#ddd",
        borderWidth: 1,
        padding: 12,
      },
    },
  };

  return (
    <Card className="p-2.5">
      <h3 className="text-sm font-medium mb-2">Top Incident Categories</h3>
      <div className="h-[180px] flex items-center justify-center">
        <div className="w-60 h-52">
          <Doughnut data={data} options={options} />
        </div>
      </div>
    </Card>
  );
}

// Automation & Auto-Healing Chart
function AutomationAutoHealingChart() {
  const data = [
    { label: "Auto-healed", value: 142, color: "#2ECC71" },
    { label: "Manual Intervention", value: 38, color: "#FF8C42" },
    { label: "Failed Automations", value: 5, color: "#4A90E2" },
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const successRate = ((data[0].value / total) * 100).toFixed(0);

  return (
    <Card className="p-2.5">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-sm font-medium">Automation & Auto-Healing</h3>
        <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded">
          {successRate}% Success Rate
        </span>
      </div>
      <div className="space-y-2.5 mt-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-1">
              <span className="text-xs text-gray-700">{item.label}</span>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    backgroundColor: item.color,
                    width: `${(item.value / total) * 100}%`,
                  }}
                />
              </div>
            </div>
            <span className="text-xs font-semibold ml-3 w-6 text-right">{item.value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

// RCA & Problem Management Chart
function RCAProblemManagementChart() {
  const data = {
    labels: ["Completed", "In Progress", "Pending"],
    datasets: [
      {
        data: [55, 30, 15],
        backgroundColor: ["#2ECC71", "#FF8C42", "#9E9E9E"],
        borderColor: "#fff",
        borderWidth: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          padding: 15,
          font: { size: 12 },
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: "#fff",
        titleColor: "#000",
        bodyColor: "#666",
        borderColor: "#ddd",
        borderWidth: 1,
        padding: 12,
      },
    },
  };

  return (
    <Card className="p-8">
      <h3 className="text-lg font-semibold mb-6">RCA & Problem Management</h3>
      <div className="h-64 flex flex-col items-center justify-center">
        <div className="relative w-full max-w-xs">
          <Doughnut data={data} options={options} />
        </div>
      </div>
    </Card>
  );
}

// ==================== MAIN DASHBOARD ====================

function ITOpsDashboard() {
  return (
    <div className="flex-1 flex flex-col h-full gap-5 px-4 py-5">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold">Operations Dashboard</h1>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-2.5">
        <MetricCard 
          title="SYSTEM AVAILABILITY" 
          value="99.98%" 
          trend={{ value: "+0.02%", direction: "up" }}
          borderColor="border-l-green-400"
          bgColor="bg-green-50"
        />
        <MetricCard 
          title="TOTAL INCIDENTS" 
          value="24" 
          trend={{ value: "-12%", direction: "down" }}
          borderColor="border-l-orange-400"
          bgColor="bg-orange-50"
        />
        <MetricCard 
          title="MTTR" 
          value="14m" 
          trend={{ value: "-5m", direction: "down" }}
          borderColor="border-l-blue-400"
          bgColor="bg-cyan-50"
        />
        <MetricCard 
          title="MTTD" 
          value="2m" 
          trend={{ value: "-30s", direction: "down" }}
          borderColor="border-l-blue-400"
          bgColor="bg-cyan-50"
        />
        <MetricCard 
          title="CHANGE SUCCESS" 
          value="98.5%" 
          trend={{ value: "+1.2%", direction: "up" }}
          borderColor="border-l-green-400"
          bgColor="bg-green-50"
        />
        <MetricCard 
          title="AUTO-REMEDIATION" 
          value="85%" 
          trend={{ value: "+5%", direction: "up" }}
          borderColor="border-l-orange-400"
          bgColor="bg-orange-50"
        />
      </div>

      {/* Incident Volume & MTTR */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
        <IncidentVolumeChart />
        <MTTRByPriorityChart />
      </div>

      {/* Manual vs Auto & Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
        <ManualVsAutoChart />
        <TopIncidentCategoriesChart />
      </div>

      {/* Automation & RCA */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
        <AutomationAutoHealingChart />
        <RCAProblemManagementChart />
      </div>
    </div>
  );
}

export default ITOpsDashboard;
