"use client";

import { Card, Grid, Title, Text, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Badge, AreaChart, Metric } from "@tremor/react";
import { ServiceInfo, APIEndpoint, HTTPMethod } from "../types";
import { getStatusColor, formatLatency, formatRequestRate, formatPercentage } from "../utils";

const mockServices: ServiceInfo[] = [
  { id: "1", name: "api-gateway", status: "healthy", requestRate: 1250.5, errorRate: 0.8, latency: 45, instances: 3 },
  { id: "2", name: "auth-service", status: "healthy", requestRate: 890.2, errorRate: 0.5, latency: 32, instances: 2 },
  { id: "3", name: "user-service", status: "warning", requestRate: 567.8, errorRate: 2.3, latency: 78, instances: 2 },
  { id: "4", name: "payment-service", status: "healthy", requestRate: 234.1, errorRate: 0.2, latency: 56, instances: 2 },
  { id: "5", name: "notification-service", status: "degraded", requestRate: 445.6, errorRate: 5.1, latency: 120, instances: 1 },
];

const mockAPIs: APIEndpoint[] = [
  { id: "1", path: "/api/v1/users", method: "GET", latency: 45, errorRate: 0.5, requestCount: 15420 },
  { id: "2", path: "/api/v1/users", method: "POST", latency: 67, errorRate: 1.2, requestCount: 3240 },
  { id: "3", path: "/api/v1/auth/login", method: "POST", latency: 89, errorRate: 0.8, requestCount: 8920 },
  { id: "4", path: "/api/v1/payments", method: "POST", latency: 156, errorRate: 0.3, requestCount: 2340 },
  { id: "5", path: "/api/v1/notifications", method: "GET", latency: 34, errorRate: 0.1, requestCount: 22100 },
];

const latencyData = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  "P50": Math.floor(Math.random() * 30) + 40,
  "P95": Math.floor(Math.random() * 50) + 80,
  "P99": Math.floor(Math.random() * 70) + 120,
}));

const errorData = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  "Error Rate": Math.random() * 3 + 0.5,
}));

export default function ApplicationsPage() {
  return (
    <div className="space-y-4 p-4">
      <div>
        <Title className="text-2xl font-bold text-gray-900">Application Observability</Title>
        <Text className="mt-1">Monitor services, APIs, and application performance</Text>
      </div>

      {/* Summary Cards */}
      <Grid numItems={1} numItemsSm={2} numItemsLg={4} className="gap-4">
        <Card>
          <Text>Total Services</Text>
          <Metric>{mockServices.length}</Metric>
        </Card>
        <Card>
          <Text>Total Requests/s</Text>
          <Metric>{formatRequestRate(mockServices.reduce((sum, s) => sum + s.requestRate, 0))}</Metric>
        </Card>
        <Card>
          <Text>Avg Latency</Text>
          <Metric>{formatLatency(mockServices.reduce((sum, s) => sum + s.latency, 0) / mockServices.length)}</Metric>
        </Card>
        <Card>
          <Text>Avg Error Rate</Text>
          <Metric className="text-amber-600">{formatPercentage(mockServices.reduce((sum, s) => sum + s.errorRate, 0) / mockServices.length)}</Metric>
        </Card>
      </Grid>

      {/* Services List */}
      <Card>
        <Title>Services</Title>
        <Table className="mt-4">
          <TableHead>
            <TableRow>
              <TableHeaderCell>Service Name</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Request Rate</TableHeaderCell>
              <TableHeaderCell>Error Rate</TableHeaderCell>
              <TableHeaderCell>Latency</TableHeaderCell>
              <TableHeaderCell>Instances</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockServices.map((service) => (
              <TableRow key={service.id}>
                <TableCell className="font-medium">{service.name}</TableCell>
                <TableCell>
                  <Badge color={getStatusColor(service.status)} size="xs">
                    {service.status}
                  </Badge>
                </TableCell>
                <TableCell>{formatRequestRate(service.requestRate)}</TableCell>
                <TableCell>
                  <Badge color={service.errorRate > 2 ? "red" : service.errorRate > 1 ? "amber" : "emerald"} size="xs">
                    {formatPercentage(service.errorRate)}
                  </Badge>
                </TableCell>
                <TableCell>{formatLatency(service.latency)}</TableCell>
                <TableCell>{service.instances}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* API Endpoints */}
      <Card>
        <Title>API Endpoints</Title>
        <Table className="mt-4">
          <TableHead>
            <TableRow>
              <TableHeaderCell>Endpoint</TableHeaderCell>
              <TableHeaderCell>Method</TableHeaderCell>
              <TableHeaderCell>Latency</TableHeaderCell>
              <TableHeaderCell>Error Rate</TableHeaderCell>
              <TableHeaderCell>Request Count</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockAPIs.map((api) => (
              <TableRow key={api.id}>
                <TableCell className="font-mono text-xs">{api.path}</TableCell>
                <TableCell>
                  <Badge color="blue" size="xs">{api.method}</Badge>
                </TableCell>
                <TableCell>{formatLatency(api.latency)}</TableCell>
                <TableCell>
                  <Badge color={api.errorRate > 1 ? "amber" : "emerald"} size="xs">
                    {formatPercentage(api.errorRate)}
                  </Badge>
                </TableCell>
                <TableCell>{api.requestCount.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Latency & Errors Charts */}
      <Grid numItems={1} numItemsSm={2} className="gap-4">
        <Card>
          <Title>Latency Percentiles (Last 24h)</Title>
          <AreaChart
            className="mt-4 h-52"
            data={latencyData}
            index="time"
            categories={["P50", "P95", "P99"]}
            colors={["emerald", "amber", "red"]}
            showLegend={true}
            showYAxis={true}
            showGridLines={true}
          />
        </Card>
        <Card>
          <Title>Error Rate (Last 24h)</Title>
          <AreaChart
            className="mt-4 h-52"
            data={errorData}
            index="time"
            categories={["Error Rate"]}
            colors={["red"]}
            showLegend={false}
            showYAxis={true}
            showGridLines={true}
          />
        </Card>
      </Grid>

      {/* Dependency Map Placeholder */}
      <Card>
        <Title>Service Dependency Map</Title>
        <Text className="mt-2">Visual representation of service-to-service relationships</Text>
        <div className="mt-6 h-96 bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <Text className="mt-2 text-gray-600">
              Interactive dependency graph
            </Text>
            <Text className="text-sm text-gray-500">
              Shows service relationships and data flow
            </Text>
          </div>
        </div>
      </Card>
    </div>
  );
}