"use client";

import { Card, Title, Text, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Badge } from "@tremor/react";
import { CircleStackIcon } from "@heroicons/react/24/outline";

export default function DataSourcesPage() {
  const dataSources = [
    {
      name: "Dynatrace",
      type: "Monitoring",
      status: "Connected",
      lastSync: "2 mins ago",
      statusColor: "emerald"
    },
    {
      name: "Prometheus",
      type: "Metrics",
      status: "Connected",
      lastSync: "1 min ago",
      statusColor: "emerald"
    },
    {
      name: "ServiceNow",
      type: "ITSM",
      status: "Warning",
      lastSync: "15 mins ago",
      statusColor: "amber"
    },
    {
      name: "AWS CloudWatch",
      type: "Cloud",
      status: "Connected",
      lastSync: "Live",
      statusColor: "emerald"
    },
    {
      name: "Datadog",
      type: "Monitoring",
      status: "Connected",
      lastSync: "3 mins ago",
      statusColor: "emerald"
    },
    {
      name: "Grafana",
      type: "Visualization",
      status: "Connected",
      lastSync: "5 mins ago",
      statusColor: "emerald"
    }
  ];

  const getStatusIndicator = (statusColor: string) => {
    return (
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${
          statusColor === "emerald" ? "bg-emerald-500" : 
          statusColor === "amber" ? "bg-amber-500" : 
          "bg-red-500"
        }`} />
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <Title>Data Sources</Title>
        <Text className="mt-2">Manage connected monitoring and observability platforms</Text>
      </div>

      <Card>
        <div className="flex items-center gap-2 mb-4">
          <CircleStackIcon className="h-5 w-5 text-gray-500" />
          <Title>Connected Sources</Title>
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Source Name</TableHeaderCell>
              <TableHeaderCell>Type</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Last Sync</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataSources.map((source, idx) => (
              <TableRow key={idx}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getStatusIndicator(source.statusColor)}
                    <span className="font-medium">{source.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge color="gray">{source.type}</Badge>
                </TableCell>
                <TableCell>
                  <Badge color={source.statusColor as any}>{source.status}</Badge>
                </TableCell>
                <TableCell className="text-gray-600">{source.lastSync}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Card>
        <Title className="mb-4">Status Indicators</Title>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <Text><span className="font-semibold">Green</span> - Healthy connection and data flowing</Text>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <Text><span className="font-semibold">Yellow</span> - Degraded performance or delayed sync</Text>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <Text><span className="font-semibold">Red</span> - Disconnected or critical error</Text>
          </div>
        </div>
      </Card>
    </div>
  );
}