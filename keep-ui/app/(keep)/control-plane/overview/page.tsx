import { Title, Card, Grid, Text, Metric, Flex, Badge } from "@tremor/react";

export default function ControlPlaneOverviewPage() {
  return (
    <div className="p-6">
      <Title>Control Plane Overview</Title>
      <Text className="mt-2 mb-6">Real-time operational intelligence and control</Text>

      <Grid numItemsMd={2} numItemsLg={4} className="gap-6 mb-6">
        {/* System Health Summary */}
        <Card className="max-w-full">
          <Flex alignItems="start">
            <div className="truncate">
              <Text>System Health Summary</Text>
              <Metric className="truncate mt-2">Healthy</Metric>
            </div>
            <Badge size="xs" className="!bg-green-500 !text-white">
              Operational
            </Badge>
          </Flex>
          <div className="mt-4 space-y-2">
            <Flex>
              <Text className="text-sm text-gray-600">Services monitored</Text>
              <Text className="text-sm font-semibold">128</Text>
            </Flex>
            <Flex>
              <Text className="text-sm text-gray-600">AI agents active</Text>
              <Text className="text-sm font-semibold">6</Text>
            </Flex>
            <Flex>
              <Text className="text-sm text-gray-600">Automation success</Text>
              <Text className="text-sm font-semibold">94%</Text>
            </Flex>
          </div>
        </Card>

        {/* Active Signals */}
        <Card className="max-w-full">
          <Flex alignItems="start">
            <div className="truncate">
              <Text>Active Signals</Text>
              <Metric className="truncate mt-2">312</Metric>
            </div>
            <Badge size="xs" className="!bg-blue-500 !text-white">
              24h
            </Badge>
          </Flex>
          <div className="mt-4 space-y-2">
            <Flex>
              <Text className="text-sm text-gray-600">Correlated events</Text>
              <Text className="text-sm font-semibold">78</Text>
            </Flex>
            <Flex>
              <Text className="text-sm text-gray-600">Noise reduced</Text>
              <Text className="text-sm font-semibold">61%</Text>
            </Flex>
            <Flex>
              <Text className="text-sm text-gray-600">Critical signals</Text>
              <Badge size="xs" className="!bg-red-500 !text-white">9</Badge>
            </Flex>
          </div>
        </Card>

        {/* Open Requests */}
        <Card className="max-w-full">
          <Flex alignItems="start">
            <div className="truncate">
              <Text>Open Requests</Text>
              <Metric className="truncate mt-2">23</Metric>
            </div>
            <Badge size="xs" className="!bg-orange-500 !text-white">
              Active
            </Badge>
          </Flex>
          <div className="mt-4 space-y-2">
            <Flex>
              <Text className="text-sm text-gray-600">Employee requests</Text>
              <Text className="text-sm font-semibold">11</Text>
            </Flex>
            <Flex>
              <Text className="text-sm text-gray-600">System actions</Text>
              <Text className="text-sm font-semibold">8</Text>
            </Flex>
            <Flex>
              <Text className="text-sm text-gray-600">Change requests</Text>
              <Text className="text-sm font-semibold">4</Text>
            </Flex>
          </div>
        </Card>

        {/* Pending Approvals */}
        <Card className="max-w-full">
          <Flex alignItems="start">
            <div className="truncate">
              <Text>Pending Approvals</Text>
              <Metric className="truncate mt-2">7</Metric>
            </div>
            <Badge size="xs" className="!bg-yellow-500 !text-white">
              Attention
            </Badge>
          </Flex>
          <div className="mt-4 space-y-2">
            <Flex>
              <Text className="text-sm text-gray-600">SLA breach risk</Text>
              <Badge size="xs" className="!bg-red-500 !text-white">2</Badge>
            </Flex>
            <Flex>
              <Text className="text-sm text-gray-600">Avg approval time</Text>
              <Text className="text-sm font-semibold">6.4 min</Text>
            </Flex>
            <Flex>
              <Text className="text-sm text-gray-600">Escalated</Text>
              <Text className="text-sm font-semibold">0</Text>
            </Flex>
          </div>
        </Card>
      </Grid>

      {/* New Sections */}
      <Grid numItemsMd={2} numItemsLg={4} className="gap-6 mb-6">
        {/* AI Control Summary */}
        <Card className="max-w-full">
          <Flex alignItems="start">
            <div className="truncate">
              <Text>AI Control Summary</Text>
              <Metric className="truncate mt-2">91%</Metric>
            </div>
            <Badge size="xs" className="!bg-purple-500 !text-white">
              AI Active
            </Badge>
          </Flex>
          <div className="mt-4 space-y-2">
            <Flex>
              <Text className="text-sm text-gray-600">Autonomous actions</Text>
              <Text className="text-sm font-semibold">37</Text>
            </Flex>
            <Flex>
              <Text className="text-sm text-gray-600">Human-approved</Text>
              <Text className="text-sm font-semibold">14</Text>
            </Flex>
            <Flex>
              <Text className="text-sm text-gray-600">Blocked high-risk</Text>
              <Text className="text-sm font-semibold text-red-600">5</Text>
            </Flex>
          </div>
        </Card>

        {/* Platform Load & Capacity */}
        <Card className="max-w-full">
          <Flex alignItems="start">
            <div className="truncate">
              <Text>Platform Load & Capacity</Text>
              <Metric className="truncate mt-2">Normal</Metric>
            </div>
            <Badge size="xs" className="!bg-green-500 !text-white">
              Optimal
            </Badge>
          </Flex>
          <div className="mt-4 space-y-2">
            <Flex>
              <Text className="text-sm text-gray-600">Events/min</Text>
              <Text className="text-sm font-semibold">48.2K</Text>
            </Flex>
            <Flex>
              <Text className="text-sm text-gray-600">Signals/min</Text>
              <Text className="text-sm font-semibold">12.4K</Text>
            </Flex>
            <Flex>
              <Text className="text-sm text-gray-600">Corr. latency (p95)</Text>
              <Text className="text-sm font-semibold">1.4s</Text>
            </Flex>
          </div>
        </Card>

        {/* Risk & Governance Snapshot */}
        <Card className="max-w-full">
          <Flex alignItems="start">
            <div className="truncate">
              <Text>Risk & Governance</Text>
              <Metric className="truncate mt-2">Green</Metric>
            </div>
            <Badge size="xs" className="!bg-green-500 !text-white">
              Compliant
            </Badge>
          </Flex>
          <div className="mt-4 space-y-2">
            <Flex>
              <Text className="text-sm text-gray-600">High-risk actions</Text>
              <Text className="text-sm font-semibold">9</Text>
            </Flex>
            <Flex>
              <Text className="text-sm text-gray-600">Violations prevented</Text>
              <Text className="text-sm font-semibold">6</Text>
            </Flex>
            <Flex>
              <Text className="text-sm text-gray-600">Emergency overrides</Text>
              <Badge size="xs" className="!bg-orange-500 !text-white">1</Badge>
            </Flex>
          </div>
        </Card>

        {/* Automation Queue */}
        <Card className="max-w-full">
          <Flex alignItems="start">
            <div className="truncate">
              <Text>Automation Queue</Text>
              <Metric className="truncate mt-2">12</Metric>
            </div>
            <Badge size="xs" className="!bg-blue-500 !text-white">
              Processing
            </Badge>
          </Flex>
          <div className="mt-4 space-y-2">
            <Flex>
              <Text className="text-sm text-gray-600">Queue depth</Text>
              <Text className="text-sm font-semibold">Normal</Text>
            </Flex>
            <Flex>
              <Text className="text-sm text-gray-600">Avg wait time</Text>
              <Text className="text-sm font-semibold">2.3 min</Text>
            </Flex>
            <Flex>
              <Text className="text-sm text-gray-600">Success rate</Text>
              <Text className="text-sm font-semibold">96%</Text>
            </Flex>
          </div>
        </Card>
      </Grid>

      {/* Recent Highlights */}
      <Card>
        <Text className="font-semibold text-lg mb-4">Recent Highlights</Text>
        <div className="space-y-3">
          <div className="flex items-start gap-3 pb-3 border-b border-gray-200">
            <Badge size="xs" className="!bg-purple-500 !text-white mt-1">
              AI
            </Badge>
            <div className="flex-1">
              <Text className="font-medium text-sm">AI auto-remediation prevented outage</Text>
              <Text className="text-xs text-gray-600 mt-1">checkout-service pod restarted automatically • 12 min ago</Text>
            </div>
          </div>

          <div className="flex items-start gap-3 pb-3 border-b border-gray-200">
            <Badge size="xs" className="!bg-orange-500 !text-white mt-1">
              Alert
            </Badge>
            <div className="flex-1">
              <Text className="font-medium text-sm">SLO breach predicted 12 minutes early</Text>
              <Text className="text-xs text-gray-600 mt-1">Predictive AI flagged degradation pattern • 28 min ago</Text>
            </div>
          </div>

          <div className="flex items-start gap-3 pb-3 border-b border-gray-200">
            <Badge size="xs" className="!bg-green-500 !text-white mt-1">
              Success
            </Badge>
            <div className="flex-1">
              <Text className="font-medium text-sm">Noise reduction saved 420 alerts</Text>
              <Text className="text-xs text-gray-600 mt-1">Deduplication agent suppressed redundant alerts • 1 hour ago</Text>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Badge size="xs" className="!bg-blue-500 !text-white mt-1">
              Action
            </Badge>
            <div className="flex-1">
              <Text className="font-medium text-sm">Cluster autoscaling executed</Text>
              <Text className="text-xs text-gray-600 mt-1">prod-cluster-1 scaled from 24 to 32 nodes • 2 hours ago</Text>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}