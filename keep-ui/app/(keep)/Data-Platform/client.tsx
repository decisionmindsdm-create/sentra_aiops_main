"use client";

import React from "react";
import { Card, Title, Text, Badge } from "@tremor/react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RTooltip,
  ReferenceDot,
  BarChart,
  Bar,
} from "recharts";
import { ArrowUp, ArrowDown } from "lucide-react";

// Quality Metrics Card Component
function QualityMetric({
  title,
  value,
  change,
  isPositive,
}: {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
}) {
  const TrendIcon = isPositive ? ArrowUp : ArrowDown;
  const trendColor = isPositive ? "text-green-600" : "text-red-600";
  const bgColor = isPositive ? "bg-green-50" : "bg-red-50";

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

// Schema Validation Issue Item
function ValidationIssue({
  type,
  count,
  color = "blue",
}: {
  type: string;
  count: number;
  color?: string;
}) {
  return (
    <div className="flex items-center justify-between py-2 border-l-4 pl-3" style={{ borderColor: color }}>
      <span className="text-sm">{type}</span>
      <span className="text-xl font-bold">{count}</span>
    </div>
  );
}

// Main Dashboard Component
export const Client: React.FC = () => {
  // Data Timeliness Trend (7 Days)
  const timelinessData = [
    { day: "Monday", score: 89, hasIssue: false },
    { day: "Tuesday", score: 87, hasIssue: false },
    { day: "Wednesday", score: 96, hasIssue: true },
    { day: "Thursday", score: 85, hasIssue: true },
    { day: "Friday", score: 92, hasIssue: false },
    { day: "Saturday", score: 88, hasIssue: false },
    { day: "Sunday", score: 91, hasIssue: false },
  ];

  // Duplicate Records Trend
  const duplicateData = [
    { day: "Monday", count: 45, hasIssue: false },
    { day: "Tuesday", count: 48, hasIssue: false },
    { day: "Wednesday", count: 56, hasIssue: false },
    { day: "Thursday", count: 65, hasIssue: false },
    { day: "Friday", count: 38, hasIssue: false },
    { day: "Saturday", count: 32, hasIssue: false },
    { day: "Sunday", count: 68, hasIssue: true },
  ];

  // Accuracy vs Consistency
  const comparisonData = [
    { metric: "Accuracy", score: 93 },
    { metric: "Consistency", score: 94 },
  ];

  // Schema Validation Issues
  const schemaIssues = [
    { type: "Type Mismatches", count: 4, color: "#3b82f6" },
    { type: "Missing Required Fields", count: 2, color: "#3b82f6" },
    { type: "Constraint Violations", count: 2, color: "#3b82f6" },
    { type: "Format Errors", count: 0, color: "#3b82f6" },
    { type: "Invalid Ranges", count: 2, color: "#3b82f6" },
  ];

  // Duplicate Records Details
  const duplicateRecords = [
    { id: "1001", field: "customer_email", count: 12, severity: "Medium" },
    { id: "1002", field: "order_id", count: 5, severity: "High" },
    { id: "1003", field: "product_sku", count: 8, severity: "Medium" },
    { id: "1004", field: "user_phone", count: 3, severity: "Low" },
    { id: "1005", field: "transaction_ref", count: 15, severity: "High" },
  ];

  // Schema Validation Details
  const validationDetails = [
    { field: "customer_age", issue: "Type Mismatch", expected: "Integer", found: "String" },
    { field: "order_date", issue: "Format Error", expected: "ISO-8601", found: "Custom" },
    { field: "product_price", issue: "Constraint Violation", expected: "> 0", found: "Negative values" },
    { field: "email", issue: "Format Error", expected: "Valid email", found: "Invalid format" },
  ];

  return (
    <div className="flex-1 flex flex-col h-full gap-6 px-4 py-5">
      {/* Header */}
      <div>
        <Title>Data Platform Dashboard</Title>
      </div>

      {/* Quality Metrics - Top KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <QualityMetric title="Data Completeness" value="92.7%" change="+1.36%" isPositive={true} />
        <QualityMetric title="Data Accuracy" value="93.3%" change="-5.02%" isPositive={false} />
        <QualityMetric title="Data Consistency" value="93.5%" change="+0.36%" isPositive={true} />
        <QualityMetric title="Data Timeliness" value="91.1%" change="+16.39%" isPositive={true} />
        <QualityMetric title="Duplicate Records" value="50" change="-1.09%" isPositive={true} />
      </div>

      {/* Schema Validation KPI */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <div className="md:col-span-1">
          <QualityMetric title="Schema Validation" value="95.4%" change="+17.42%" isPositive={true} />
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Data Timeliness Trend */}
        <Card className="p-4">
          <div className="text-sm font-semibold mb-3">Data Timeliness Trend (7 Days)</div>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timelinessData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" tick={{ fontSize: 10 }} />
                <YAxis domain={[70, 107]} tick={{ fontSize: 10 }} />
                <RTooltip />
                <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
                {timelinessData.map(
                  (e, i) =>
                    e.hasIssue && <ReferenceDot key={i} x={e.day} y={e.score} r={6} fill="#ef4444" stroke="none" />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Accuracy vs Consistency */}
        <Card className="p-4">
          <div className="text-sm font-semibold mb-3">Accuracy vs Consistency Comparison</div>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="metric" tick={{ fontSize: 10 }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
                <RTooltip />
                <Bar dataKey="score" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Duplicate Records Trend */}
        <Card className="p-4">
          <div className="text-sm font-semibold mb-3">Duplicate Records Trend (7 Days)</div>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={duplicateData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" tick={{ fontSize: 10 }} />
                <YAxis domain={[20, 80]} tick={{ fontSize: 10 }} />
                <RTooltip />
                <Line type="monotone" dataKey="count" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} />
                {duplicateData.map(
                  (e, i) =>
                    e.hasIssue && <ReferenceDot key={i} x={e.day} y={e.count} r={6} fill="#ef4444" stroke="none" />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Schema Validation Issues */}
        <Card className="p-4">
          <div className="text-sm font-semibold mb-3">Schema Validation Issues</div>
          <div className="space-y-2">
            {schemaIssues.map((issue, i) => (
              <ValidationIssue key={i} type={issue.type} count={issue.count} color={issue.color} />
            ))}
          </div>
        </Card>
      </div>

      {/* Details Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Duplicate Records Details */}
        <Card className="p-4">
          <div className="text-sm font-semibold mb-3">Duplicate Records Details</div>
          <div className="overflow-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-2">RECORD ID</th>
                  <th className="text-left py-2 px-2">FIELD NAME</th>
                  <th className="text-left py-2 px-2">DUPLICATE COUNT</th>
                  <th className="text-left py-2 px-2">SEVERITY</th>
                </tr>
              </thead>
              <tbody>
                {duplicateRecords.map((record, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-2">{record.id}</td>
                    <td className="py-2 px-2">{record.field}</td>
                    <td className="py-2 px-2">{record.count}</td>
                    <td className="py-2 px-2">
                      <Badge
                        color={
                          record.severity === "High" ? "red" : record.severity === "Medium" ? "yellow" : "blue"
                        }
                      >
                        {record.severity}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Schema Validation Details */}
        <Card className="p-4">
          <div className="text-sm font-semibold mb-3">Schema Validation Details</div>
          <div className="overflow-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-2">FIELD NAME</th>
                  <th className="text-left py-2 px-2">ISSUE TYPE</th>
                  <th className="text-left py-2 px-2">EXPECTED</th>
                  <th className="text-left py-2 px-2">FOUND</th>
                </tr>
              </thead>
              <tbody>
                {validationDetails.map((detail, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-2">{detail.field}</td>
                    <td className="py-2 px-2">{detail.issue}</td>
                    <td className="py-2 px-2">{detail.expected}</td>
                    <td className="py-2 px-2">{detail.found}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};
