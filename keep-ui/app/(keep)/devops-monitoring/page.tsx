"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Chart } from "react-chartjs-2";
import { Bar, Line, Doughnut, Pie } from "react-chartjs-2";
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
    value: number;
    isPositive: boolean;
  };
  bgColor?: string;
  borderColor?: string;
}

interface ProgressMetricProps {
  title: string;
  value: number;
  colorClass?: string;
}

// ==================== COMPONENTS ====================

function MetricCard({ 
  title, 
  value, 
  trend, 
  bgColor = "bg-chart-2/10",
  borderColor = "border-l-chart-2" 
}: MetricCardProps) {
  const trendColor = trend?.isPositive ? "text-chart-4" : "text-destructive";
  const TrendIcon = trend && trend.value > 0 ? ArrowUp : ArrowDown;
  
  return (
    <Card 
      data-testid={`card-metric-${title.toLowerCase().replace(/\s+/g, '-')}`} 
      className={`p-2.5 border-l-2 ${borderColor} ${bgColor}`}
    >
      <div className="flex flex-col gap-1">
        <p className="text-xs text-muted-foreground">{title}</p>
        <h2 className="text-xl font-bold font-mono" data-testid={`text-value-${title.toLowerCase().replace(/\s+/g, '-')}`}>
          {value}
        </h2>
        {trend && (
          <div className="flex items-center gap-1">
            <TrendIcon className={`h-3 w-3 ${trendColor}`} />
            <span className={`text-xs ${trendColor}`} data-testid={`text-trend-${title.toLowerCase().replace(/\s+/g, '-')}`}>
              {trend.value > 0 ? '+' : ''}{trend.value.toFixed(2)}%
            </span>
          </div>
        )}
      </div>
    </Card>
  );
}

function ProgressMetric({ title, value, colorClass = "bg-chart-1" }: ProgressMetricProps) {
  return (
    <Card className="p-8" data-testid={`card-progress-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          <span className="text-2xl font-bold text-chart-1" data-testid={`text-progress-value-${title.toLowerCase().replace(/\s+/g, '-')}`}>
            {value}%
          </span>
        </div>
        <Progress value={value} className="h-3" data-testid={`progress-${title.toLowerCase().replace(/\s+/g, '-')}`} />
      </div>
    </Card>
  );
}

function BuildVolumeChart() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        type: "bar" as const,
        label: "Build Volume",
        data: [320, 280, 360, 300, 310, 270],
        backgroundColor: "#E09C35",
        borderRadius: 0,
        barPercentage: 0.8,
        yAxisID: 'y',
      },
      {
        type: "line" as const,
        label: "Backlog",
        data: [48, 38, 56, 42, 52, 35],
        borderColor: "#2B7BE4",
        backgroundColor: "transparent",
        tension: 0.4,
        pointRadius: 6,
        pointBackgroundColor: "#2B7BE4",
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
        position: "bottom" as const,
        align: "center" as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: { size: 13 },
          boxWidth: 15,
          boxHeight: 15,
        },
      },
      tooltip: {
        backgroundColor: "hsl(var(--card))",
        titleColor: "hsl(var(--card-foreground))",
        bodyColor: "hsl(var(--card-foreground))",
        borderColor: "hsl(var(--border))",
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        beginAtZero: true,
        max: 360,
        ticks: {
          stepSize: 90,
          font: { size: 11 },
          color: "hsl(var(--muted-foreground))",
        },
        grid: {
          color: "hsl(var(--border) / 0.2)",
          drawTicks: false,
        },
        border: {
          display: false,
        },
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        beginAtZero: true,
        max: 60,
        ticks: {
          stepSize: 15,
          font: { size: 11 },
          color: "hsl(var(--muted-foreground))",
        },
        grid: {
          drawOnChartArea: false,
        },
        border: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: { size: 12 },
          color: "hsl(var(--foreground))",
        },
        border: {
          display: false,
        },
      },
    },
    animation: {
      duration: 800,
    },
  };

  return (
    <Card className="p-2.5" data-testid="card-build-volume">
      <h3 className="text-sm font-medium mb-2">Build Volume & Backlog</h3>
      <div className="h-[180px]">
        <Chart type="bar" data={data} options={options} />
      </div>
    </Card>
  );
}

function ChangeFailureRateChart() {
  const failureRate = 12.5;
  const successRate = 100 - failureRate;

  const data = {
    labels: ["Success", "Failure"],
    datasets: [
      {
        data: [successRate, failureRate],
        backgroundColor: "#FE9900",
        borderColor: "hsl(var(--card))",
        borderWidth: 3,
        circumference: 180,
        rotation: 270,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "75%",
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
        cornerRadius: 8,
        callbacks: {
          label: (context: any) => `${context.label}: ${context.parsed.toFixed(1)}%`,
        },
      },
    },
    animation: {
      duration: 800,
    },
  };

  return (
    <Card className="p-8" data-testid="card-change-failure-rate">
      <h3 className="text-lg font-semibold mb-6">Change Failure Rate</h3>
      <div className="h-64 flex flex-col items-center justify-center">
        <div className="relative w-full max-w-xs">
          <Doughnut data={data} options={options} />
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
            <p className="text-4xl font-bold text-chart-1" data-testid="text-failure-rate">{failureRate}%</p>
            <p className="text-sm text-muted-foreground">Failure Rate</p>
          </div>
        </div>
      </div>
    </Card>
  );
}

function DeploymentFailuresChart() {
  const data = {
    labels: ["Auth Service", "Payment API", "User Service", "Analytics", "Notification"],
    datasets: [
      {
        label: "Failed Deployments",
        data: [3, 7, 2, 5, 4],
        backgroundColor: "#FFB366",
        borderRadius: 6,
        barThickness: 40,
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
        cornerRadius: 8,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "hsl(var(--border) / 0.3)",
        },
        ticks: {
          font: { size: 11 },
          stepSize: 2,
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
    animation: {
      duration: 800,
    },
  };

  return (
    <Card className="p-2.5" data-testid="card-deployment-failures">
      <h3 className="text-sm font-medium mb-2">Deployment Failures by Service</h3>
      <div className="h-[170px]">
        <Bar data={data} options={options} />
      </div>
    </Card>
  );
}

function ErrorCategoriesChart() {
  const data = {
    labels: ["Database Errors", "API Timeouts", "UI/Login Issues", "Network Issues", "Authentication", "Batch Job Failures"],
    datasets: [
      {
        data: [23.2, 18.7, 14.8, 12.5, 9.3, 8.2],
        backgroundColor: [
          "#F5A623",
          "#5B9FE3",
          "#F8D053",
          "#FFB366",
          "#4CAF50",
          "#F5A623",
        ],
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
        align: "center" as const,
        labels: {
          usePointStyle: false,
          boxWidth: 20,
          boxHeight: 20,
          padding: 15,
          font: { size: 13 },
          generateLabels: (chart: any) => {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label: string, i: number) => {
                const value = data.datasets[0].data[i];
                const backgroundColor = data.datasets[0].backgroundColor[i];
                return {
                  text: `${label}                ${value}%`,
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
        cornerRadius: 8,
        callbacks: {
          label: (context: any) => `${context.label}: ${context.parsed}%`,
        },
      },
    },
    animation: {
      duration: 800,
    },
  };

  return (
    <Card className="p-2.5" data-testid="card-error-categories">
      <h3 className="text-sm font-medium mb-2">Top Incident Categories</h3>
      <div className="h-[170px] flex items-center">
        <Doughnut data={data} options={options} />
      </div>
    </Card>
  );
}

function MTBFTrendChart() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "MTBF (hours)",
        data: [165, 192, 155, 215, 175, 195],
        borderColor: "#5B9FE3",
        backgroundColor: "rgba(91, 159, 227, 0.1)",
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointBackgroundColor: ["#5B9FE3", "#5B9FE3", "#5B9FE3", "#5B9FE3", "#5B9FE3", "#5B9FE3"],
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        borderWidth: 3,
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
        cornerRadius: 8,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 240,
        ticks: {
          stepSize: 60,
          font: { size: 11 },
          color: "hsl(var(--muted-foreground))",
        },
        grid: {
          color: "hsl(var(--border) / 0.3)",
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: { size: 11 },
          color: "hsl(var(--foreground))",
        },
      },
    },
    animation: {
      duration: 800,
    },
  };

  return (
    <Card className="p-2.5" data-testid="card-mtbf-trend">
      <h3 className="text-sm font-medium mb-2">MTBF Trend</h3>
      <div className="h-[180px]">
        <Line data={data} options={options} />
      </div>
    </Card>
  );
}

function MTTRByPriorityChart() {
  const data = {
    labels: ["Critical (Sev-1)", "High (Sev-2)", "Medium (Sev-3)"],
    datasets: [
      {
        label: "MTTR (hours)",
        data: [2, 8, 35],
        backgroundColor: ["#5B9FE3", "#FFB366", "#F5A623"],
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
        backgroundColor: "hsl(var(--card))",
        titleColor: "hsl(var(--card-foreground))",
        bodyColor: "hsl(var(--card-foreground))",
        borderColor: "hsl(var(--border))",
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 40,
        ticks: {
          stepSize: 10,
          font: { size: 11 },
        },
        grid: {
          color: "hsl(var(--border) / 0.3)",
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
    animation: {
      duration: 800,
    },
  };

  return (
    <Card className="p-2.5" data-testid="card-mttr-priority">
      <h3 className="text-sm font-medium mb-2">MTTR by Priority</h3>
      <div className="h-[180px]">
        <Bar data={data} options={options} />
      </div>
    </Card>
  );
}

function RCACompletionChart() {
  const data = {
    labels: ["Completed", "In Progress", "Pending"],
    datasets: [
      {
        data: [70, 20, 10],
        backgroundColor: ["#4CAF50", "#5B9FE3", "#FFB366"],
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
        align: "center" as const,
        labels: {
          usePointStyle: true,
          padding: 15,
          font: { size: 12 },
        },
      },
      tooltip: {
        backgroundColor: "hsl(var(--card))",
        titleColor: "hsl(var(--card-foreground))",
        bodyColor: "hsl(var(--card-foreground))",
        borderColor: "hsl(var(--border))",
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: (context: any) => `${context.label}: ${context.parsed}%`,
        },
      },
    },
    animation: {
      duration: 800,
    },
  };

  return (
    <Card className="p-2.5" data-testid="card-rca-completion">
      <h3 className="text-sm font-medium mb-2">RCA Completion Rate</h3>
      <div className="h-[150px] flex items-center justify-center">
        <Pie data={data} options={options} />
      </div>
    </Card>
  );
}

// ==================== MAIN DASHBOARD ====================

export default function AnalyticsDashboard() {
  return (
    <div className="flex-1 flex flex-col h-full gap-5 px-4 py-5">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold">DevOps Monitoring Dashboard</h1>
      </div>

      {/* Summary Metrics - Last Week */}
      <div>
        <h2 className="text-sm font-medium mb-2.5">Summary Metrics - Last Week</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2.5">
          <MetricCard 
            title="Deployment Frequency" 
            value="47" 
            trend={{ value: 12.50, isPositive: true }}
            bgColor="bg-orange-50"
            borderColor="border-l-orange-400"
          />
          <MetricCard 
            title="Deployment Success Rate" 
            value="98.3%" 
            trend={{ value: 2.10, isPositive: true }}
            bgColor="bg-green-50"
            borderColor="border-l-green-400"
          />
          <MetricCard 
            title="Mean Build Time (MBT)" 
            value="4.2m" 
            trend={{ value: -8.50, isPositive: false }}
            bgColor="bg-cyan-50"
            borderColor="border-l-blue-400"
          />
          <MetricCard 
            title="Incidents Triggered" 
            value="3" 
            trend={{ value: -25.00, isPositive: false }}
            bgColor="bg-green-50"
            borderColor="border-l-green-400"
          />
          <MetricCard 
            title="Auto-Heal Success Rate" 
            value="94.7%" 
            trend={{ value: 3.20, isPositive: true }}
            bgColor="bg-cyan-50"
            borderColor="border-l-blue-400"
          />
        </div>
      </div>

      {/* Reactive DevOps Pulse */}
      <div>
        <h2 className="text-sm font-medium mb-2.5">Reactive DevOps Pulse</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
          <BuildVolumeChart />
          <MTTRByPriorityChart />
        </div>
      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
        <DeploymentFailuresChart />
        <ErrorCategoriesChart />
      </div>

      {/* Stability & Quality */}
      <div>
        <h2 className="text-sm font-medium mb-2.5">Stability & Quality</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
          <MTBFTrendChart />
          <RCACompletionChart />
        </div>
      </div>
    </div>
  );
}
