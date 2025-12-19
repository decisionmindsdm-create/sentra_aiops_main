"use client";

import { Card } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Bar, Line, Doughnut, Chart, Pie } from "react-chartjs-2";
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
  Filler,
  BarController,
  LineController,
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
  Legend,
  Filler,
  BarController,
  LineController
);

// MetricCard Component
interface MetricCardProps {
  title: string;
  value: string | number;
  trend?: {
    value: string;
    direction: "up" | "down";
  };
  subtitle?: string;
  bgColor?: string;
  borderColor?: string;
}

function MetricCard({
  title,
  value,
  trend,
  subtitle,
  bgColor = "bg-cyan-50",
  borderColor = "border-l-blue-400",
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
            <span className={`text-xs ${trendColor}`}>{trend.value}</span>
          </div>
        )}
        {subtitle && <span className="text-xs text-muted-foreground">{subtitle}</span>}
      </div>
    </Card>
  );
}

// Request Volume vs Error Trend Chart (Combined Bar + Line)
function RequestVolumeErrorChart() {
  const data: any = {
    labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "23:59"],
    datasets: [
      {
        type: "bar" as const,
        label: "Requests",
        data: [12000, 16000, 22000, 28000, 25000, 18000, 13000],
        backgroundColor: "#E09C35",
        borderRadius: 4,
        barPercentage: 0.6,
        yAxisID: "y",
      },
      {
        type: "line" as const,
        label: "Errors",
        data: [120, 180, 320, 450, 380, 250, 150],
        borderColor: "#5B9FE3",
        backgroundColor: "transparent",
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 5,
        pointBackgroundColor: "#5B9FE3",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        yAxisID: "y1",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          padding: 15,
          font: { size: 12 },
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: "hsl(var(--card))",
        titleColor: "hsl(var(--card-foreground))",
        bodyColor: "hsl(var(--card-foreground))",
        borderColor: "hsl(var(--border))",
        borderWidth: 1,
        padding: 12,
      },
    },
    scales: {
      y: {
        type: "linear" as const,
        position: "left" as const,
        beginAtZero: true,
        ticks: {
          callback: (value: any) => (value >= 1000 ? `${value / 1000}k` : value),
          font: { size: 11 },
          color: "hsl(var(--muted-foreground))",
        },
        grid: { color: "hsl(var(--border) / 0.2)" },
      },
      y1: {
        type: "linear" as const,
        position: "right" as const,
        beginAtZero: true,
        grid: { drawOnChartArea: false },
        ticks: {
          font: { size: 11 },
          color: "hsl(var(--muted-foreground))",
        },
      },
      x: {
        ticks: { font: { size: 11 } },
        grid: { display: false },
      },
    },
  };

  return (
    <Card className="p-2.5">
      <h3 className="text-sm font-medium mb-2">Request Volume vs Error Trend</h3>
      <div className="h-[180px]">
        <Chart type="bar" data={data} options={options} />
      </div>
    </Card>
  );
}

// Latency by Endpoint Chart (Horizontal Bar)
function LatencyByEndpointChart() {
  const data = {
    labels: ["/login", "/payment", "/orders", "/notifications"],
    datasets: [
      {
        label: "Latency (ms)",
        data: [180, 450, 400, 280],
        backgroundColor: [
          "#5B9FE3",  // /login - Frontend (blue)
          "#FF8C42",  // /payment - Backend (orange)
          "#FF8C42",  // /orders - Backend (orange)
          "#5B9FE3",  // /notifications - Frontend (blue)
        ],
        borderRadius: 4,
        barThickness: 30,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y" as const,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "hsl(var(--card))",
        titleColor: "hsl(var(--card-foreground))",
        bodyColor: "hsl(var(--card-foreground))",
        borderColor: "hsl(var(--border))",
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: (context: any) => {
            const labels = ["/login", "/payment", "/orders", "/notifications"];
            const types = ["Frontend", "Backend", "Backend", "Frontend"];
            const index = context.dataIndex;
            return `${types[index]}: ${context.parsed.x}ms`;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          font: { size: 11 },
          callback: (value: any) => `${value}ms`,
        },
        grid: { color: "hsl(var(--border) / 0.3)" },
      },
      y: {
        ticks: {
          font: { size: 11 },
        },
        grid: { display: false },
      },
    },
  };

  return (
    <Card className="p-2.5">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium">Latency by Endpoint (p95)</h3>
        <div className="flex gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#5B9FE3]"></div>
            <span className="text-xs text-muted-foreground">Frontend</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#FF8C42]"></div>
            <span className="text-xs text-muted-foreground">Backend</span>
          </div>
        </div>
      </div>
      <div className="h-[180px]">
        <Bar data={data} options={options} />
      </div>
    </Card>
  );
}

// Errors by Service Chart (Vertical Bar)
function ErrorsByServiceChart() {
  const data = {
    labels: ["Web App", "Mobile", "Auth API", "Payments", "Search"],
    datasets: [
      {
        label: "Frontend",
        data: [45, 35, 0, 0, 0],
        backgroundColor: "#5B9FE3",
        borderRadius: 4,
        barThickness: 30,
      },
      {
        label: "Backend",
        data: [0, 0, 180, 280, 120],
        backgroundColor: "#FFB366",
        borderRadius: 4,
        barThickness: 30,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        align: "end" as const,
        labels: {
          padding: 12,
          font: { size: 12 },
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        backgroundColor: "hsl(var(--card))",
        titleColor: "hsl(var(--card-foreground))",
        bodyColor: "hsl(var(--card-foreground))",
        borderColor: "hsl(var(--border))",
        borderWidth: 1,
        padding: 12,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: { size: 11 },
        },
        grid: { color: "hsl(var(--border) / 0.3)" },
      },
      x: {
        ticks: {
          font: { size: 11 },
        },
        grid: { display: false },
      },
    },
  };

  return (
    <Card className="p-2.5">
      <h3 className="text-sm font-medium mb-2">Errors by Service</h3>
      <div className="h-[170px]">
        <Bar data={data} options={options} />
      </div>
    </Card>
  );
}

// Top Error Categories (Doughnut)
function TopErrorCategoriesChart() {
  const data = {
    labels: ["DB Errors", "API Timeouts", "Validation", "Network"],
    datasets: [
      {
        data: [35, 30, 20, 15],
        backgroundColor: ["#F5A623", "#5B9FE3", "#4CAF50", "#FFB366"],
        borderColor: "#fff",
        borderWidth: 3,
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
        align: "center" as const,
        labels: {
          boxWidth: 15,
          padding: 10,
          font: { size: 11 },
          generateLabels: (chart: any) => {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label: string, i: number) => {
                const value = data.datasets[0].data[i];
                const backgroundColor = data.datasets[0].backgroundColor[i];
                return {
                  text: `${label}: ${value}%`,
                  fillStyle: backgroundColor,
                  hidden: false,
                  index: i,
                };
              });
            }
            return [];
          },
        },
      },
      tooltip: {
        backgroundColor: "hsl(var(--card))",
        titleColor: "hsl(var(--card-foreground))",
        bodyColor: "hsl(var(--card-foreground))",
        borderColor: "hsl(var(--border))",
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: (context: any) => `${context.label}: ${context.parsed}%`,
        },
      },
    },
  };

  return (
    <Card className="p-2.5">
      <h3 className="text-sm font-medium mb-2">Top Error Categories</h3>
      <div className="h-[170px] flex items-center">
        <Doughnut data={data} options={options} />
      </div>
    </Card>
  );
}

// Response Time Trend (Area Chart)
function ResponseTimeTrendChart() {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Response Time (ms)",
        data: [300, 320, 310, 420, 390, 280, 285],
        borderColor: "#5B9FE3",
        backgroundColor: "rgba(91, 159, 227, 0.1)",
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 5,
        pointBackgroundColor: "#5B9FE3",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        fill: true,
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
        backgroundColor: "hsl(var(--card))",
        titleColor: "hsl(var(--card-foreground))",
        bodyColor: "hsl(var(--card-foreground))",
        borderColor: "hsl(var(--border))",
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: (context: any) => `${context.parsed.y}ms`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: { size: 11 },
          color: "hsl(var(--muted-foreground))",
        },
        grid: { color: "hsl(var(--border) / 0.3)" },
      },
      x: {
        ticks: {
          font: { size: 11 },
        },
        grid: { display: false },
      },
    },
  };

  return (
    <Card className="p-2.5">
      <h3 className="text-sm font-medium mb-2">Response Time Trend (7 Days)</h3>
      <div className="h-[180px]">
        <Line data={data} options={options} />
      </div>
    </Card>
  );
}

// Incident / RCA Status (Pie Chart)
function IncidentRCAStatusChart() {
  const data = {
    labels: ["Resolved", "In Progress", "Pending"],
    datasets: [
      {
        data: [65, 25, 10],
        backgroundColor: ["#4CAF50", "#FFB366", "#5B9FE3"],
        borderColor: "#fff",
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
          padding: 12,
          font: { size: 12 },
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        backgroundColor: "hsl(var(--card))",
        titleColor: "hsl(var(--card-foreground))",
        bodyColor: "hsl(var(--card-foreground))",
        borderColor: "hsl(var(--border))",
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: (context: any) => `${context.label}: ${context.parsed}%`,
        },
      },
    },
  };

  return (
    <Card className="p-2.5">
      <h3 className="text-sm font-medium mb-2">Incident / RCA Status</h3>
      <div className="h-[150px] flex items-center justify-center">
        <Pie data={data} options={options} />
      </div>
    </Card>
  );
}

// Main Dashboard Component
export default function ApplicationObservabilityDashboard() {
  return (
    <div className="flex-1 flex flex-col h-full gap-5 px-4 py-5">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold">Application Dashboard</h1>
      </div>

      {/* Metric Cards */}
      <div>
        <h2 className="text-sm font-medium mb-2.5">Key Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2.5">
          <MetricCard
            title="Request Throughput"
            value="12.5k"
            trend={{ value: "5.2% req/min", direction: "up" }}
            bgColor="bg-orange-50"
            borderColor="border-l-orange-400"
          />
          <MetricCard
            title="App Availability"
            value="99.95%"
            subtitle="Stable"
            bgColor="bg-green-50"
            borderColor="border-l-green-400"
          />
          <MetricCard
            title="p95 Response Time"
            value="420 ms"
            trend={{ value: "12ms", direction: "down" }}
            bgColor="bg-cyan-50"
            borderColor="border-l-blue-400"
          />
          <MetricCard
            title="Error Rate"
            value="1.8%"
            trend={{ value: "+0.2%", direction: "down" }}
            bgColor="bg-red-50"
            borderColor="border-l-red-400"
          />
          <MetricCard
            title="Apdex Score"
            value="0.91"
            subtitle="Satisfied"
            bgColor="bg-cyan-50"
            borderColor="border-l-blue-400"
          />
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
        <RequestVolumeErrorChart />
        <LatencyByEndpointChart />
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
        <ErrorsByServiceChart />
        <TopErrorCategoriesChart />
      </div>

      {/* Charts Row 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
        <ResponseTimeTrendChart />
        <IncidentRCAStatusChart />
      </div>
    </div>
  );
}
