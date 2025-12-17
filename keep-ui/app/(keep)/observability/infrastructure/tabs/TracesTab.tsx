import { Card, Title, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Badge } from "@tremor/react";
import { ResourceType, TraceSpan } from "../../types";
import { formatTimestamp, formatLatency } from "../../utils";

interface TracesTabProps {
  resourceType: ResourceType;
}

const generateTraces = (servicePrefix: string, count: number = 10): TraceSpan[] => {
  const operations = ["GET /api/users", "POST /api/data", "DB Query", "Cache Lookup", "External API Call"];

  return Array.from({ length: count }, (_, i) => ({
    traceId: `trace-${Math.random().toString(36).substr(2, 9)}`,
    spanId: `span-${Math.random().toString(36).substr(2, 9)}`,
    service: `${servicePrefix}-${Math.floor(Math.random() * 5) + 1}`,
    operation: operations[Math.floor(Math.random() * operations.length)],
    duration: Math.floor(Math.random() * 500) + 10,
    timestamp: Date.now() - i * 60000,
  }));
};

export function TracesTab({ resourceType }: TracesTabProps) {
  let traces: TraceSpan[] = [];
  let title = "Request Traces";

  if (resourceType === "hosts") {
    traces = generateTraces("host");
    title = "Sample Request Traces Across Hosts";
  } else if (resourceType === "kubernetes") {
    traces = generateTraces("pod");
    title = "Request Traces Across Services/Pods";
  } else if (resourceType === "cloud") {
    traces = generateTraces("cloud-service");
    title = "Request Flows Through Cloud Services";
  } else {
    traces = generateTraces("network");
    title = "Data Flow Traces";
  }

  return (
    <div className="mt-4">
      <Card>
        <Title>{title}</Title>
        <Table className="mt-4">
          <TableHead>
            <TableRow>
              <TableHeaderCell>Trace ID</TableHeaderCell>
              <TableHeaderCell>Service</TableHeaderCell>
              <TableHeaderCell>Operation</TableHeaderCell>
              <TableHeaderCell>Duration</TableHeaderCell>
              <TableHeaderCell>Timestamp</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {traces.map((trace, idx) => (
              <TableRow key={idx}>
                <TableCell className="text-xs font-mono">{trace.traceId}</TableCell>
                <TableCell className="text-xs">{trace.service}</TableCell>
                <TableCell className="text-xs">{trace.operation}</TableCell>
                <TableCell>
                  <Badge color={trace.duration > 200 ? "red" : trace.duration > 100 ? "amber" : "emerald"} size="xs">
                    {formatLatency(trace.duration)}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs">{formatTimestamp(trace.timestamp)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}