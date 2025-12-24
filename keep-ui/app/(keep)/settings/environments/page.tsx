"use client";

import { Card, Title, Text, Grid, Metric, Badge } from "@tremor/react";
import { ServerIcon, CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function EnvironmentsPage() {
  const environments = [
    {
      name: "Production",
      status: "Critical",
      services: 42,
      alerts24h: 128,
      autoRemediation: "Restricted",
      statusColor: "red",
      statusIcon: ExclamationTriangleIcon
    },
    {
      name: "Staging",
      status: "Warning",
      services: 38,
      alerts24h: 45,
      autoRemediation: "Enabled",
      statusColor: "amber",
      statusIcon: ExclamationTriangleIcon
    },
    {
      name: "Development",
      status: "Healthy",
      services: 35,
      alerts24h: 12,
      autoRemediation: "Enabled",
      statusColor: "emerald",
      statusIcon: CheckCircleIcon
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <Title>Environments</Title>
        <Text className="mt-2">Monitor and manage your deployment environments</Text>
      </div>

      <Grid numItemsMd={2} numItemsLg={3} className="gap-6">
        {environments.map((env, idx) => {
          const StatusIcon = env.statusIcon;
          return (
            <Card key={idx} decoration="top" decorationColor={env.statusColor as any}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <ServerIcon className="h-6 w-6 text-gray-500" />
                  <Title>{env.name}</Title>
                </div>
                <Badge color={env.statusColor as any} icon={StatusIcon}>
                  {env.status}
                </Badge>
              </div>

              <div className="space-y-3">
                <div>
                  <Text className="text-sm text-gray-600">Connected Services</Text>
                  <Metric className="mt-1">{env.services}</Metric>
                </div>

                <div>
                  <Text className="text-sm text-gray-600">Alerts (Last 24h)</Text>
                  <Metric className="mt-1">{env.alerts24h}</Metric>
                </div>

                <div>
                  <Text className="text-sm text-gray-600">Auto-Remediation</Text>
                  <div className="mt-1">
                    <Badge 
                      color={env.autoRemediation === "Restricted" ? "red" : "emerald"}
                      className="text-sm"
                    >
                      {env.autoRemediation}
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </Grid>

      <Card>
        <Title className="mb-4">Environment Details</Title>
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-4 pb-3 border-b border-gray-200">
            <Text className="font-semibold">Environment</Text>
            <Text className="font-semibold">Status</Text>
            <Text className="font-semibold">Services</Text>
            <Text className="font-semibold">Configuration</Text>
          </div>
          {environments.map((env, idx) => (
            <div key={idx} className="grid grid-cols-4 gap-4 items-center">
              <div className="flex items-center gap-2">
                <ServerIcon className="h-4 w-4 text-gray-400" />
                <Text className="font-medium">{env.name}</Text>
              </div>
              <Badge color={env.statusColor as any}>{env.status}</Badge>
              <Text>{env.services} services</Text>
              <Text className="text-gray-600">{env.autoRemediation}</Text>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}