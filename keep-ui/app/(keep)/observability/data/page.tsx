"use client";

import { Card, Grid, Title, Text, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Badge, BarChart, LineChart, Metric, ProgressBar } from "@tremor/react";
import { Pipeline, DataQualityMetrics, VolumeAnomaly } from "../types";
import { getStatusColor, formatTimestamp } from "../utils";

const mockPipelines: Pipeline[] = [
  { id: "1", name: "user-data-pipeline", status: "running", lastRun: Date.now() - 300000, recordsProcessed: 1250000, duration: 145 },
  { id: "2", name: "analytics-etl", status: "running", lastRun: Date.now() - 600000, recordsProcessed: 890000, duration: 234 },
  { id: "3", name: "logs-aggregation", status: "warning", lastRun: Date.now() - 900000, recordsProcessed: 3400000, duration: 567 },
  { id: "4", name: "metrics-collector", status: "running", lastRun: Date.now() - 180000, recordsProcessed: 567000, duration: 89 },
  { id: "5", name: "backup-sync", status: "failed", lastRun: Date.now() - 1800000, recordsProcessed: 0, duration: 0 },
];

const mockDataQuality: DataQualityMetrics[] = [
  { dataset: "users", nullPercentage: 2.3, duplicatePercentage: 0.5, validityScore: 97.2, freshnessDelay: 5 },
  { dataset: "orders", nullPercentage: 1.8, duplicatePercentage: 0.2, validityScore: 98.5, freshnessDelay: 3 },
  { dataset: "products", nullPercentage: 5.6, duplicatePercentage: 1.2, validityScore: 93.2, freshnessDelay: 15 },
  { dataset: "analytics", nullPercentage: 3.4, duplicatePercentage: 0.8, validityScore: 95.8, freshnessDelay: 8 },
  { dataset: "logs", nullPercentage: 0.9, duplicatePercentage: 0.1, validityScore: 99.0, freshnessDelay: 2 },
];

const volumeAnomalies: VolumeAnomaly[] = Array.from({ length: 24 }, (_, i) => ({
  timestamp: Date.now() - (23 - i) * 3600000,
  expected: 100000 + Math.floor(Math.random() * 20000),
  actual: 100000 + Math.floor(Math.random() * 40000) - 10000,
  deviation: 0,
})).map(item => ({
  ...item,
  deviation: ((item.actual - item.expected) / item.expected) * 100,
}));

const schemaChanges = [
  { table: "users", change: "Added column: last_login_ip", timestamp: Date.now() - 86400000, severity: "low" },
  { table: "orders", change: "Modified column: payment_status (varchar → enum)", timestamp: Date.now() - 172800000, severity: "medium" },
  { table: "products", change: "Dropped column: legacy_id", timestamp: Date.now() - 259200000, severity: "high" },
];

export default function DataPage() {
  return (
    <div className="space-y-4 p-4">
      <div>
        <Title className="text-2xl font-bold text-gray-900">Data Observability</Title>
        <Text className="mt-1">Monitor data pipelines, quality, and freshness</Text>
      </div>

      {/* Summary Cards */}
      <Grid numItems={1} numItemsSm={2} numItemsLg={4} className="gap-4">
        <Card>
          <Text>Active Pipelines</Text>
          <Metric>{mockPipelines.filter(p => p.status === "running").length}</Metric>
        </Card>
        <Card>
          <Text>Failed Pipelines</Text>
          <Metric className="text-red-600">{mockPipelines.filter(p => p.status === "failed").length}</Metric>
        </Card>
        <Card>
          <Text>Avg Data Quality</Text>
          <Metric className="text-emerald-600">
            {(mockDataQuality.reduce((sum, d) => sum + d.validityScore, 0) / mockDataQuality.length).toFixed(1)}%
          </Metric>
        </Card>
        <Card>
          <Text>Schema Changes (7d)</Text>
          <Metric>{schemaChanges.length}</Metric>
        </Card>
      </Grid>

      {/* Pipelines */}
      <Card>
        <Title>Data Pipelines</Title>
        <Table className="mt-4">
          <TableHead>
            <TableRow>
              <TableHeaderCell>Pipeline Name</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Last Run</TableHeaderCell>
              <TableHeaderCell>Records Processed</TableHeaderCell>
              <TableHeaderCell>Duration (s)</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockPipelines.map((pipeline) => (
              <TableRow key={pipeline.id}>
                <TableCell className="font-medium">{pipeline.name}</TableCell>
                <TableCell>
                  <Badge color={getStatusColor(pipeline.status)} size="xs">
                    {pipeline.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs">{formatTimestamp(pipeline.lastRun)}</TableCell>
                <TableCell>{pipeline.recordsProcessed.toLocaleString()}</TableCell>
                <TableCell>{pipeline.duration}s</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Data Quality */}
      <Card>
        <Title>Data Quality Metrics</Title>
        <Table className="mt-4">
          <TableHead>
            <TableRow>
              <TableHeaderCell>Dataset</TableHeaderCell>
              <TableHeaderCell>Null %</TableHeaderCell>
              <TableHeaderCell>Duplicate %</TableHeaderCell>
              <TableHeaderCell>Validity Score</TableHeaderCell>
              <TableHeaderCell>Freshness Delay (min)</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockDataQuality.map((quality, idx) => (
              <TableRow key={idx}>
                <TableCell className="font-medium">{quality.dataset}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span>{quality.nullPercentage.toFixed(1)}%</span>
                    <ProgressBar
                      value={quality.nullPercentage}
                      color={quality.nullPercentage > 5 ? "red" : quality.nullPercentage > 3 ? "amber" : "emerald"}
                      className="w-20"
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span>{quality.duplicatePercentage.toFixed(1)}%</span>
                    <ProgressBar
                      value={quality.duplicatePercentage}
                      color={quality.duplicatePercentage > 1 ? "red" : "emerald"}
                      className="w-20"
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <Badge color={quality.validityScore > 95 ? "emerald" : quality.validityScore > 90 ? "amber" : "red"} size="xs">
                    {quality.validityScore.toFixed(1)}%
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge color={quality.freshnessDelay > 10 ? "red" : quality.freshnessDelay > 5 ? "amber" : "emerald"} size="xs">
                    {quality.freshnessDelay} min
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Volume Anomalies */}
      <Card>
        <Title>Volume Anomalies (Last 24h)</Title>
        <Text className="mt-2">Expected vs Actual data volume</Text>
        <LineChart
          className="mt-4 h-64"
          data={volumeAnomalies.map((item, i) => ({
            time: new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            Expected: item.expected,
            Actual: item.actual,
          }))}
          index="time"
          categories={["Expected", "Actual"]}
          colors={["blue", "amber"]}
          showLegend={true}
          showYAxis={true}
          showGridLines={true}
        />
      </Card>

      {/* Schema Drift */}
      <Card>
        <Title>Schema Drift Alerts</Title>
        <Text className="mt-2">Recent schema changes detected</Text>
        <Table className="mt-4">
          <TableHead>
            <TableRow>
              <TableHeaderCell>Table</TableHeaderCell>
              <TableHeaderCell>Change</TableHeaderCell>
              <TableHeaderCell>Timestamp</TableHeaderCell>
              <TableHeaderCell>Severity</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schemaChanges.map((change, idx) => (
              <TableRow key={idx}>
                <TableCell className="font-mono text-xs">{change.table}</TableCell>
                <TableCell className="text-xs">{change.change}</TableCell>
                <TableCell className="text-xs">{formatTimestamp(change.timestamp)}</TableCell>
                <TableCell>
                  <Badge 
                    color={change.severity === "high" ? "red" : change.severity === "medium" ? "amber" : "blue"} 
                    size="xs"
                  >
                    {change.severity.toUpperCase()}
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