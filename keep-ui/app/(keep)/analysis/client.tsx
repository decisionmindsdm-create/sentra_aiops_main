"use client";

import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip as RTooltip,
  Legend,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ReferenceLine,
  ReferenceDot,
} from "recharts";
import { Card, Title, Subtitle } from "@tremor/react";
import { ArrowUp, ArrowDown } from "lucide-react";

const SHOW_BUSINESS_SECTION = false; // toggle to true if you want to show it later

// --- Tiny helpers (icons as React) ---
const ArrowRightIcon = ({ className = "" }) => (
  <svg className={`w-3 h-3 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

// --- Simple UI pieces (kept minimal so we don't affect global layout) ---
function Section({ title, children }: React.PropsWithChildren<{ title: string }>) {
  return (
    <section className="mb-5">
      <h2 className="text-sm font-medium mb-2.5">{title}</h2>
      {children}
    </section>
  );
}

function KPI({
  label,
  value,
  trend,
  status,
  target,
}: {
  label: string;
  value: string;
  trend: "up" | "down" | "stable";
  status: "excellent" | "good" | "warning" | "critical";
  target: string; // like "+21.21%" or "-76.26%"
}) {
  const statusClasses: Record<string, string> = {
    excellent: "border-l-2 border-green-500/80 bg-green-500/5",
    good: "border-l-2 border-cyan-500/80 bg-cyan-500/5",
    warning: "border-l-2 border-amber-500/80 bg-amber-500/5",
    critical: "border-l-2 border-red-500/80 bg-red-500/5",
  };
  const TrendIcon = trend === "up" ? ArrowUp : trend === "down" ? ArrowDown : ArrowRightIcon;
  // Treat "down" as positive if target is negative (improvement), otherwise positive on "up"
  const isPositive =
    (trend === "down" && target.startsWith("-")) ||
    (trend === "up" && target.startsWith("+")) ||
    trend === "stable";
  const trendColor = isPositive ? "text-chart-4" : "text-destructive";

  return (
    <Card className={`p-2.5 ${statusClasses[status]}`}>
      <div className="flex flex-col gap-1">
        <p className="text-xs text-gray-500">{label}</p>
        <h2 className="text-xl font-bold font-mono">{value}</h2>
        <div className="flex items-center gap-1">
          <TrendIcon className={`h-3 w-3 ${trendColor}`} />
          <span className={`text-xs ${trendColor}`}>{target}</span>
        </div>
      </div>
    </Card>
  );
}

function Gauge({
  title,
  value,
  target,
  status,
  unit = "%",
}: {
  title: string;
  value: number;
  target: number;
  status: "excellent" | "good" | "warning" | "critical";
  unit?: string;
}) {
  const ratio = Math.max(0, Math.min(100, (value / target) * 100));
  const barClass =
    status === "excellent"
      ? "bg-green-500"
      : status === "good"
      ? "bg-cyan-500"
      : status === "warning"
      ? "bg-amber-500"
      : "bg-red-500";
  const statusColor =
    status === "excellent" ? "text-green-600" : status === "warning" ? "text-amber-600" : "text-red-600";

  return (
    <Card>
      <div className="p-2.5">
        <div className="text-xs font-medium mb-2">{title}</div>
        <div className="flex items-baseline justify-between">
          <span className="text-xl font-bold font-mono">
            {value}
            {unit}
          </span>
          <span className="text-xs text-gray-500">Target: {target}{unit}</span>
        </div>
        <div className="mt-2 space-y-1">
          <div className="h-1.5 w-full rounded-full bg-gray-200 overflow-hidden">
            <div className={`h-full ${barClass}`} style={{ width: `${ratio}%` }} />
          </div>
          <p className={`text-xs ${statusColor}`}>Status: {status[0].toUpperCase() + status.slice(1)}</p>
        </div>
      </div>
    </Card>
  );
}

// --- The Dashboard (static content) ---
export const Client: React.FC = () => {
  // ---- Static data copied from your Replit file ----
  const kpiData = useMemo(
    () => [
      { label: "High-Urgency Incidents", value: "1357", trend: "up", status: "warning", target: "+21.21%" },
      { label: "MTTA (High-Urgency)", value: "3m", trend: "down", status: "excellent", target: "-76.26%" },
      { label: "MTTR (High-Urgency)", value: "24m", trend: "down", status: "excellent", target: "-19.00%" },
      { label: "Escalated Incidents", value: "5", trend: "up", status: "critical", target: "+400%" },
      { label: "Auto Resolve", value: "1064", trend: "up", status: "excellent", target: "+14.66%" },
      { label: "Merged Incidents", value: "679", trend: "down", status: "good", target: "-4.21%" },
    ],
    []
  );

  const incidentVolumeData = [
    { month: "Jan", volume: 320, backlog: 45 },
    { month: "Feb", volume: 280, backlog: 38 },
    { month: "Mar", volume: 350, backlog: 52 },
    { month: "Apr", volume: 290, backlog: 42 },
    { month: "May", volume: 310, backlog: 48 },
    { month: "Jun", volume: 270, backlog: 35 },
  ];

  const mttrData = [
    { priority: "Critical (Sev-1)", mttr: 1.2, target: 2 },
    { priority: "High (Sev-2)", mttr: 8.5, target: 12 },
    { priority: "Medium (Sev-3)", mttr: 38, target: 48 },
  ];

  const incidentCategories = [
    { name: "Database Errors", value: 245 },
    { name: "API Timeouts", value: 198 },
    { name: "UI/Login Issues", value: 156 },
    { name: "Network Issues", value: 132 },
    { name: "Authentication", value: 98 },
    { name: "Batch Job Failures", value: 87 },
    { name: "Performance", value: 65 },
    { name: "Other", value: 76 },
  ];

  const mtbfData = [
    { month: "Jan", mtbf: 168, incident: false },
    { month: "Feb", mtbf: 192, incident: false },
    { month: "Mar", mtbf: 156, incident: true },
    { month: "Apr", mtbf: 210, incident: false },
    { month: "May", mtbf: 180, incident: false },
    { month: "Jun", mtbf: 195, incident: true },
  ];

  const costEfficiencyData = [
    { month: "Jan", costPerTicket: 95, ticketVolume: 1320 },
    { month: "Feb", costPerTicket: 92, ticketVolume: 1280 },
    { month: "Mar", costPerTicket: 88, ticketVolume: 1350 },
    { month: "Apr", costPerTicket: 87, ticketVolume: 1290 },
    { month: "May", costPerTicket: 85, ticketVolume: 1250 },
    { month: "Jun", costPerTicket: 85, ticketVolume: 1250 },
  ];

  const slaData = [
    { priority: "Sev-1 (4 hrs)", target: 100, achievement: 100 },
    { priority: "Sev-2 (24 hrs)", target: 95, achievement: 98 },
    { priority: "Sev-3 (5 days)", target: 90, achievement: 92 },
  ];

  const csatPositive = [
    { name: "Quick Resolution", value: 45 },
    { name: "Helpful Engineer", value: 35 },
    { name: "Good Communication", value: 20 },
  ];

  const csatNegative = [
    { name: "Slow Response", value: 60 },
    { name: "Issue Recurred", value: 30 },
    { name: "Unclear Explanation", value: 10 },
  ];

  const costMetrics = [
    { metric: "Total Ticket Volume", value: "1,250", trend: "Down 5%", isPositive: true },
    { metric: "Cost Per Ticket", value: "$85", trend: "Down $10", isPositive: true },
    { metric: "% Time on Proactive Work", value: "25%", trend: "Up 3%", isPositive: true },
  ];

  const incidentsByPriority = [
    { priority: "P0", tickets: 3 },
    { priority: "P1", tickets: 5 },
    { priority: "P2", tickets: 7 },
    { priority: "P3", tickets: 6 },
  ];

  const slaPriorityData = [
    { priority: "P1", percentage: 25 },
    { priority: "P2", percentage: 30 },
    { priority: "P3", percentage: 35 },
    { priority: "P4", percentage: 10 },
  ];

  const donutColors = ["#f59e0b", "#60a5fa", "#eab308", "#fb923c", "#22c55e"];

  // --- Derived datasets ---
  const csatChartData = useMemo(() => {
    const pos = csatPositive.reduce((acc, item) => ({ ...acc, [item.name]: item.value }), {});
    const neg = csatNegative.reduce((acc, item) => ({ ...acc, [item.name]: item.value }), {});
    return [
      { category: "Positive (92%)", ...pos },
      { category: "Negative (8%)", ...neg },
    ];
  }, [csatPositive, csatNegative]);
  const csatKeys = useMemo(
    () => Array.from(new Set([...csatPositive.map((d) => d.name), ...csatNegative.map((d) => d.name)])),
    [csatPositive, csatNegative]
  );

  const categoriesTotal = useMemo(
    () => incidentCategories.reduce((sum, i) => sum + i.value, 0),
    [incidentCategories]
  );

  return (
    <div className="flex-1 flex flex-col h-full gap-6 px-4 py-5">
      <div>
        <Title>Executive Overview Dashboard</Title>
      </div>

      {/* Summary Metrics */}
      <Section title="Summary Metrics - Last Week">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-2.5">
          {kpiData.map((k, i) => (
            <KPI key={i} {...(k as any)} />
          ))}
        </div>
      </Section>

      {/* Reactive Support Pulse */}
      <Section title="Reactive Support Pulse">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 mb-3.5">
          {/* Volume + Backlog */}
          <Card className="p-2.5">
            <div className="text-sm font-medium mb-2">Incident Volume &amp; Backlog</div>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={incidentVolumeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#6b7280" }} />
                  <YAxis yAxisId="left" tick={{ fontSize: 10, fill: "#6b7280" }} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fill: "#6b7280" }} />
                  <RTooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="volume" name="Incident Volume" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  <Line yAxisId="right" dataKey="backlog" name="Backlog" stroke="#60a5fa" strokeWidth={2} type="monotone" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* MTTR by Priority */}
          <Card className="p-2.5">
            <div className="text-sm font-medium mb-2">MTTR by Priority</div>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mttrData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" tick={{ fontSize: 10, fill: "#6b7280" }} />
                  <YAxis dataKey="priority" type="category" tick={{ fontSize: 10, fill: "#6b7280" }} />
                  <RTooltip />
                  <Bar dataKey="mttr" radius={[0, 4, 4, 0]}>
                    {mttrData.map((d, i) => {
                      const color = d.mttr <= d.target * 0.7 ? "#60a5fa" : d.mttr <= d.target ? "#eab308" : "#22c55e";
                      return <Cell key={i} fill={color} />;
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 mb-3.5">
          {/* Incidents by Priority */}
          <Card className="p-2.5">
            <div className="text-sm font-medium mb-2">Incidents by Priority</div>
            <div className="h-[170px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={incidentsByPriority}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="priority" tick={{ fontSize: 10, fill: "#6b7280" }} />
                  <YAxis tick={{ fontSize: 10, fill: "#6b7280" }} />
                  <RTooltip />
                  <Bar dataKey="tickets" fill="#fb923c" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Top Incident Categories (donut + legend) */}
          <Card className="p-2.5">
            <div className="text-sm font-medium mb-2">Top Incident Categories</div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <div className="h-[170px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={incidentCategories}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={60}
                      paddingAngle={2}
                    >
                      {incidentCategories.map((entry, i) => (
                        <Cell key={i} fill={donutColors[i % donutColors.length]} />
                      ))}
                    </Pie>
                    <RTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                {[...incidentCategories]
                  .sort((a, b) => b.value - a.value)
                  .slice(0, 6)
                  .map((c, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5">
                        <div
                          className="w-3 h-3 rounded-sm"
                          style={{ backgroundColor: donutColors[i % donutColors.length] }}
                        />
                        <span>{c.name}</span>
                      </div>
                      <span className="font-mono font-medium">
                        {((c.value / categoriesTotal) * 100).toFixed(1)}%
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Proactive Stability & Quality */}
      <Section title="Proactive Stability & Quality">
        {/* MTBF line + incident dots */}
        <Card className="p-2.5 mb-3.5">
          <div className="text-sm font-medium mb-2">Major Incident Trend &amp; MTBF</div>
          <div className="h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mtbfData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#6b7280" }} />
                <YAxis tick={{ fontSize: 10, fill: "#6b7280" }} />
                <RTooltip />
                <Line type="monotone" dataKey="mtbf" stroke="#60a5fa" strokeWidth={2} dot={{ r: 3 }} name="MTBF (hours)" />
                {mtbfData.map(
                  (e, i) =>
                    e.incident && <ReferenceDot key={i} x={e.month} y={e.mtbf} r={6} fill="#ef4444" stroke="none" />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5">
          {/* RCA completion donut */}
          <Card className="p-2.5">
            <div className="text-sm font-medium mb-2">RCA Completions</div>
            <div className="h-[150px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: "Completed", value: 90 },
                      { name: "To be Completed", value: 10 },
                    ]}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ value }) => `${value}%`}
                    outerRadius={50}
                  >
                    <Cell fill="#22c55e" />
                    <Cell fill="#f59e0b" />
                  </Pie>
                  <Legend wrapperStyle={{ fontSize: "11px" }} />
                  <RTooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Gauges */}
          <Gauge title="First Contact Resolution" value={68} target={70} status="warning" />
          <Gauge title="Incident Recurrence Rate" value={5} target={5} status="warning" />
        </div>
      </Section>
    {SHOW_BUSINESS_SECTION && (
      <>
      {/* Business & Customer Impact */}
      <Section title="Business & Customer Impact">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-3.5 mb-3.5">
          {/* SLA compliance (vertical bars + 95% ref) */}
          <Card className="p-2.5">
            <div className="text-sm font-medium mb-2">SLA Compliance by Priority</div>
            <div className="h-[150px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={slaData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10, fill: "#6b7280" }} />
                  <YAxis dataKey="priority" type="category" width={80} tick={{ fontSize: 10, fill: "#6b7280" }} />
                  <RTooltip />
                  <ReferenceLine x={95} stroke="#f59e0b" strokeDasharray="3 3" />
                  <Bar dataKey="achievement" fill="#60a5fa" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 space-y-1">
              {slaData.map((d, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">{d.priority}</span>
                  <span className={`font-medium ${d.achievement >= 95 ? "text-green-600" : "text-amber-600"}`}>
                    {d.achievement}%
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* SLA achievement pie */}
          <Card className="p-2.5">
            <div className="text-sm font-medium mb-2">SLA Achievement by Priority</div>
            <div className="h-[150px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={slaPriorityData}
                    dataKey="percentage"
                    cx="50%"
                    cy="50%"
                    outerRadius={50}
                    labelLine={false}
                    label={({ priority, percentage }) => `${priority}: ${percentage}%`}
                  >
                    {slaPriorityData.map((_, i) => (
                      <Cell key={i} fill={donutColors[i % donutColors.length]} />
                    ))}
                  </Pie>
                  <RTooltip />
                  <Legend wrapperStyle={{ fontSize: "11px" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* CSAT stacked bars */}
          <Card className="p-2.5">
            <div className="text-sm font-medium mb-2">Customer Satisfaction Drivers</div>
            <div className="h-[150px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={csatChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" tick={{ fontSize: 10, fill: "#6b7280" }} />
                  <YAxis tick={{ fontSize: 10, fill: "#6b7280" }} />
                  <RTooltip />
                  <Legend wrapperStyle={{ fontSize: "11px" }} />
                  {csatKeys.map((key, idx) => (
                    <Bar key={key} dataKey={key} stackId="a" fill={donutColors[idx % donutColors.length]} />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Cost & efficiency composed */}
          <Card className="p-2.5">
            <div className="text-sm font-medium mb-2">Cost &amp; Efficiency Trend</div>
            <div className="h-[150px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={costEfficiencyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#6b7280" }} />
                  <YAxis yAxisId="left" tick={{ fontSize: 10, fill: "#6b7280" }} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fill: "#6b7280" }} />
                  <RTooltip />
                  <Legend wrapperStyle={{ fontSize: "11px" }} />
                  <Line yAxisId="left" type="monotone" dataKey="costPerTicket" stroke="#f59e0b" strokeWidth={2} name="Cost Per Ticket ($)" />
                  <Bar yAxisId="right" dataKey="ticketVolume" fill="#60a5fa" name="Ticket Volume" radius={[4, 4, 0, 0]} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Cost metrics list */}
        <Card className="p-2.5">
          <div className="text-sm font-medium mb-3">Cost &amp; Efficiency</div>
          <div className="space-y-2.5">
            {costMetrics.map((m, i) => (
              <div key={i} className="flex items-center justify-between">
                <p className="text-xs text-gray-500">{m.metric}</p>
                <div className="flex items-center gap-1.5">
                  <p className="text-base font-bold font-mono">{m.value}</p>
                  <div className="flex items-center gap-1">
                    {m.isPositive ? <ArrowDown className="text-green-600" /> : <ArrowUp className="text-red-600" />}
                    <span className={`text-xs ${m.isPositive ? "text-green-600" : "text-red-600"}`}>{m.trend}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </Section>
      </>
    )}
    </div>
  );
};
