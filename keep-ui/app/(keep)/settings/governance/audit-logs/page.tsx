"use client";

import { Card, Title, Text, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Badge, Button } from "@tremor/react";
import { DocumentTextIcon, FunnelIcon } from "@heroicons/react/24/outline";

export default function AuditLogsPage() {
  const auditLogs = [
    {
      timestamp: "10:42 AM",
      actor: "RCA Agent",
      actorType: "AI Agent",
      action: "Auto RCA generated",
      resource: "checkout-service",
      outcome: "Success",
      severity: "Medium"
    },
    {
      timestamp: "10:36 AM",
      actor: "Auto-Remediation Agent",
      actorType: "AI Agent",
      action: "Restarted pod",
      resource: "payments-prod",
      outcome: "Success",
      severity: "High"
    },
    {
      timestamp: "10:21 AM",
      actor: "Vivek (Admin)",
      actorType: "User",
      action: "Policy override",
      resource: "SLO Guard",
      outcome: "Approved",
      severity: "Critical"
    },
    {
      timestamp: "09:58 AM",
      actor: "System",
      actorType: "System",
      action: "Policy sync",
      resource: "Governance Engine",
      outcome: "Success",
      severity: "Low"
    },
    {
      timestamp: "09:45 AM",
      actor: "RCA Agent",
      actorType: "AI Agent",
      action: "Generated incident report",
      resource: "database-service",
      outcome: "Success",
      severity: "Medium"
    },
    {
      timestamp: "09:32 AM",
      actor: "Riya (SRE)",
      actorType: "User",
      action: "Scaled cluster",
      resource: "prod-cluster-01",
      outcome: "Success",
      severity: "High"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical": return "red";
      case "High": return "orange";
      case "Medium": return "amber";
      case "Low": return "gray";
      default: return "gray";
    }
  };

  const getActorTypeBadgeColor = (actorType: string) => {
    switch (actorType) {
      case "AI Agent": return "purple";
      case "User": return "blue";
      case "System": return "gray";
      default: return "gray";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Title>Audit Logs</Title>
        <Text className="mt-2">Immutable record of user, agent, and system actions</Text>
      </div>

      {/* Filters Section */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <FunnelIcon className="h-5 w-5 text-gray-500" />
          <Title>Filters</Title>
        </div>
        <div className="flex gap-3">
          <div className="flex gap-2">
            <Text className="text-gray-600 font-medium">Actor Type:</Text>
            <Badge color="purple">AI Agent</Badge>
            <Badge color="blue">User</Badge>
            <Badge color="gray">System</Badge>
          </div>
          <div className="flex gap-2 ml-6">
            <Text className="text-gray-600 font-medium">Severity:</Text>
            <Badge color="red">Critical</Badge>
            <Badge color="orange">High</Badge>
            <Badge color="amber">Medium</Badge>
            <Badge color="gray">Low</Badge>
          </div>
          <div className="flex gap-2 ml-6">
            <Text className="text-gray-600 font-medium">Time Range:</Text>
            <Badge color="slate">Last 24h</Badge>
          </div>
        </div>
      </Card>

      {/* Audit Log Table */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <DocumentTextIcon className="h-5 w-5 text-gray-500" />
          <Title>Audit Trail</Title>
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Timestamp</TableHeaderCell>
              <TableHeaderCell>Actor</TableHeaderCell>
              <TableHeaderCell>Action</TableHeaderCell>
              <TableHeaderCell>Resource</TableHeaderCell>
              <TableHeaderCell>Outcome</TableHeaderCell>
              <TableHeaderCell>Severity</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {auditLogs.map((log, idx) => (
              <TableRow key={idx}>
                <TableCell className="text-gray-600 font-mono text-sm">
                  {log.timestamp}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">{log.actor}</span>
                    <Badge color={getActorTypeBadgeColor(log.actorType) as any} size="xs">
                      {log.actorType}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="font-medium">{log.action}</TableCell>
                <TableCell className="text-gray-600 font-mono text-sm">
                  {log.resource}
                </TableCell>
                <TableCell>
                  <Badge color={log.outcome === "Success" ? "emerald" : "red"}>
                    {log.outcome}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge color={getSeverityColor(log.severity) as any}>
                    {log.severity}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}