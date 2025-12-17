import { Card, Title, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Badge } from "@tremor/react";
import { ResourceType, LogEntry, SeverityLevel } from "../../types";
import { formatTimestamp } from "../../utils";

interface LogsTabProps {
  resourceType: ResourceType;
}

const getSeverityColor = (level: SeverityLevel): string => {
  const colorMap: Record<SeverityLevel, string> = {
    high: "red",
    medium: "amber",
    low: "blue",
  };
  return colorMap[level];
};

const generateLogs = (source: string, count: number = 10): LogEntry[] => {
  const messages = [
    "Service started successfully",
    "Connection established",
    "Memory threshold exceeded",
    "Disk space warning",
    "Authentication successful",
    "Request timeout",
    "Cache cleared",
    "Configuration reloaded",
    "Backup completed",
    "Health check passed",
  ];

  return Array.from({ length: count }, (_, i) => ({
    timestamp: Date.now() - i * 300000,
    level: (["low", "medium", "high"] as SeverityLevel[])[Math.floor(Math.random() * 3)],
    source,
    message: messages[Math.floor(Math.random() * messages.length)],
  }));
};

export function LogsTab({ resourceType }: LogsTabProps) {
  let logs: LogEntry[] = [];
  let title = "Recent Logs";

  if (resourceType === "hosts") {
    logs = generateLogs("host-prod-01");
    title = "Recent System Logs";
  } else if (resourceType === "kubernetes") {
    logs = generateLogs("pod-api-server-xyz");
    title = "Pod/Container Logs";
  } else if (resourceType === "cloud") {
    logs = generateLogs("cloudwatch-logs");
    title = "Cloud Activity Logs";
  } else {
    logs = generateLogs("network-device-01");
    title = "Network/Storage Event Logs";
  }

  return (
    <div className="mt-4">
      <Card>
        <Title>{title}</Title>
        <Table className="mt-4">
          <TableHead>
            <TableRow>
              <TableHeaderCell>Timestamp</TableHeaderCell>
              <TableHeaderCell>Level</TableHeaderCell>
              <TableHeaderCell>Source</TableHeaderCell>
              <TableHeaderCell>Message</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.map((log, idx) => (
              <TableRow key={idx}>
                <TableCell className="text-xs">{formatTimestamp(log.timestamp)}</TableCell>
                <TableCell>
                  <Badge color={getSeverityColor(log.level)} size="xs">
                    {log.level.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs font-mono">{log.source}</TableCell>
                <TableCell className="text-xs">{log.message}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}