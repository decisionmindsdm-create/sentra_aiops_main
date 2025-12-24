"use client";

import { useState } from "react";
import { Card, Title, Text, Tab, TabGroup, TabList, TabPanel, TabPanels, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Badge, Grid, Metric, ProgressBar } from "@tremor/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function RiskManagementPage() {
  const [selectedTab, setSelectedTab] = useState(0);

  const highRiskActions = [
    {
      action: "Auto scale down prod cluster",
      riskLevel: "Critical",
      status: "Blocked",
      reason: "Error budget low",
      riskColor: "red"
    },
    {
      action: "Disable alert ingestion",
      riskLevel: "High",
      status: "Requires approval",
      reason: "System dependency",
      riskColor: "orange"
    },
    {
      action: "Delete old logs",
      riskLevel: "Medium",
      status: "Allowed with audit",
      reason: "Compliance requirement",
      riskColor: "amber"
    },
    {
      action: "Restart service pod",
      riskLevel: "Low",
      status: "Allowed",
      reason: "Standard operation",
      riskColor: "emerald"
    }
  ];

  const agentProfiles = [
    {
      name: "Auto-Remediation Agent",
      riskScore: 7.8,
      autonomyLevel: "Partial",
      lastIncidentImpact: "Medium",
      actionsLast30d: 156
    },
    {
      name: "RCA Agent",
      riskScore: 3.2,
      autonomyLevel: "Advisory",
      lastIncidentImpact: "None",
      actionsLast30d: 423
    },
    {
      name: "Alert Correlation Agent",
      riskScore: 5.1,
      autonomyLevel: "Partial",
      lastIncidentImpact: "Low",
      actionsLast30d: 892
    }
  ];

  const overrideRules = [
    {
      rule: "Emergency override allowed for Sev-1 only",
      status: "Active",
      lastUsed: "2 days ago"
    },
    {
      rule: "Overrides auto-expire in 30 minutes",
      status: "Active",
      lastUsed: "N/A"
    },
    {
      rule: "Overrides logged & audited",
      status: "Active",
      lastUsed: "2 days ago"
    },
    {
      rule: "Max 3 overrides per 24h window",
      status: "Active",
      lastUsed: "5 days ago"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <Title>Risk Management</Title>
        <Text className="mt-2">Monitor, assess, and mitigate operational and AI-driven risks</Text>
      </div>

      <TabGroup index={selectedTab} onIndexChange={setSelectedTab}>
        <TabList>
          <Tab>High-Risk Actions</Tab>
          <Tab>Agent Risk Profiles</Tab>
          <Tab>Override Rules</Tab>
        </TabList>

        <TabPanels className="mt-6">
          {/* High-Risk Actions Tab */}
          <TabPanel>
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
                <Title>Risk Assessment Table</Title>
              </div>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>Action</TableHeaderCell>
                    <TableHeaderCell>Risk Level</TableHeaderCell>
                    <TableHeaderCell>Status</TableHeaderCell>
                    <TableHeaderCell>Reason</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {highRiskActions.map((action, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">{action.action}</TableCell>
                      <TableCell>
                        <Badge color={action.riskColor as any}>
                          {action.riskLevel}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          color={
                            action.status === "Blocked" ? "red" :
                            action.status === "Requires approval" ? "amber" :
                            "emerald"
                          }
                        >
                          {action.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-600">{action.reason}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabPanel>

          {/* Agent Risk Profiles Tab */}
          <TabPanel>
            <Grid numItemsMd={2} numItemsLg={3} className="gap-4">
              {agentProfiles.map((agent, idx) => (
                <Card key={idx} decoration="top" decorationColor={agent.riskScore > 7 ? "red" : agent.riskScore > 5 ? "amber" : "emerald"}>
                  <Title className="mb-4">{agent.name}</Title>
                  
                  <div className="space-y-4">
                    <div>
                      <Text className="text-gray-600 text-sm mb-1">Risk Score</Text>
                      <div className="flex items-center gap-2">
                        <Metric>{agent.riskScore}</Metric>
                        <Text className="text-gray-500">/ 10</Text>
                      </div>
                      <ProgressBar 
                        value={agent.riskScore * 10} 
                        color={agent.riskScore > 7 ? "red" : agent.riskScore > 5 ? "amber" : "emerald"}
                        className="mt-2"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Text className="text-gray-600 text-sm">Autonomy Level</Text>
                        <Badge color="purple" className="mt-1">{agent.autonomyLevel}</Badge>
                      </div>
                      <div>
                        <Text className="text-gray-600 text-sm">Last Impact</Text>
                        <Badge 
                          color={
                            agent.lastIncidentImpact === "None" ? "emerald" :
                            agent.lastIncidentImpact === "Low" ? "amber" :
                            "orange"
                          }
                          className="mt-1"
                        >
                          {agent.lastIncidentImpact}
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <Text className="text-gray-600 text-sm">Actions (Last 30d)</Text>
                      <Metric className="mt-1">{agent.actionsLast30d}</Metric>
                    </div>
                  </div>
                </Card>
              ))}
            </Grid>
          </TabPanel>

          {/* Override Rules Tab */}
          <TabPanel>
            <Card>
              <Title className="mb-4">Override Rules & Policies</Title>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>Rule</TableHeaderCell>
                    <TableHeaderCell>Status</TableHeaderCell>
                    <TableHeaderCell>Last Used</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {overrideRules.map((rule, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">{rule.rule}</TableCell>
                      <TableCell>
                        <Badge color="emerald">{rule.status}</Badge>
                      </TableCell>
                      <TableCell className="text-gray-600">{rule.lastUsed}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>

            <Card className="mt-4">
              <Title className="mb-4">Override Statistics</Title>
              <Grid numItemsMd={3} className="gap-4">
                <div>
                  <Text className="text-gray-600">Total Overrides (30d)</Text>
                  <Metric className="mt-2">12</Metric>
                </div>
                <div>
                  <Text className="text-gray-600">Active Overrides</Text>
                  <Metric className="mt-2">0</Metric>
                </div>
                <div>
                  <Text className="text-gray-600">Avg. Duration</Text>
                  <Metric className="mt-2">18 min</Metric>
                </div>
              </Grid>
            </Card>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
}