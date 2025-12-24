"use client";

import { useState } from "react";
import { Card, Title, Text, Tab, TabGroup, TabList, TabPanel, TabPanels, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Badge } from "@tremor/react";
import { ShieldCheckIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

export default function PoliciesPage() {
  const [selectedTab, setSelectedTab] = useState(0);

  const automationPolicies = [
    {
      name: "Auto-remediation allowed for non-prod",
      status: "Enabled",
      scope: "Non-prod",
      agentType: "Auto-Remediation Agent",
      enforcement: "Strict"
    },
    {
      name: "Restart pod only once per 30 mins",
      status: "Enabled",
      scope: "All",
      agentType: "Auto-Remediation Agent",
      enforcement: "Strict"
    },
    {
      name: "Disable automation during incident freeze window",
      status: "Enabled",
      scope: "Prod",
      agentType: "All Agents",
      enforcement: "Strict"
    }
  ];

  const approvalRules = [
    {
      action: "Scale cluster",
      requires: "SRE Manager approval",
      sla: "10 minutes"
    },
    {
      action: "Disable alert source",
      requires: "Platform Admin",
      sla: "5 minutes"
    },
    {
      action: "Deploy to production",
      requires: "Release Manager + SRE Lead",
      sla: "15 minutes"
    },
    {
      action: "Delete database",
      requires: "CTO approval",
      sla: "30 minutes"
    }
  ];

  const dataAccessRules = [
    {
      actor: "AI Agents",
      access: "Read-only metrics",
      restrictions: "No PII access"
    },
    {
      actor: "RCA Agent",
      access: "Logs + traces access",
      restrictions: "Time-bound sessions"
    },
    {
      actor: "Humans",
      access: "Full access by role",
      restrictions: "Audit logged"
    },
    {
      actor: "Auto-Remediation Agent",
      access: "Execute commands",
      restrictions: "Predefined actions only"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <Title>Policies</Title>
        <Text className="mt-2">Define guardrails for automation, approvals, and data access</Text>
      </div>

      <TabGroup index={selectedTab} onIndexChange={setSelectedTab}>
        <TabList>
          <Tab>Automation Policies</Tab>
          <Tab>Approval Policies</Tab>
          <Tab>Data Access Policies</Tab>
        </TabList>

        <TabPanels className="mt-6">
          {/* Automation Policies Tab */}
          <TabPanel>
            <div className="space-y-4">
              {automationPolicies.map((policy, idx) => (
                <Card key={idx} decoration="left" decorationColor={policy.status === "Enabled" ? "emerald" : "gray"}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <ShieldCheckIcon className="h-5 w-5 text-gray-500" />
                        <Title>{policy.name}</Title>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mt-3">
                        <div>
                          <Text className="text-gray-600 text-sm">Scope</Text>
                          <Badge color="blue" className="mt-1">{policy.scope}</Badge>
                        </div>
                        <div>
                          <Text className="text-gray-600 text-sm">Agent Type</Text>
                          <Badge color="purple" className="mt-1">{policy.agentType}</Badge>
                        </div>
                        <div>
                          <Text className="text-gray-600 text-sm">Enforcement Mode</Text>
                          <Badge color="red" className="mt-1">{policy.enforcement}</Badge>
                        </div>
                      </div>
                    </div>
                    <Badge 
                      color={policy.status === "Enabled" ? "emerald" : "gray"} 
                      icon={policy.status === "Enabled" ? CheckCircleIcon : undefined}
                      className="ml-4"
                    >
                      {policy.status}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </TabPanel>

          {/* Approval Policies Tab */}
          <TabPanel>
            <Card>
              <Title className="mb-4">Approval Rules</Title>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>Action</TableHeaderCell>
                    <TableHeaderCell>Requires</TableHeaderCell>
                    <TableHeaderCell>SLA</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {approvalRules.map((rule, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">{rule.action}</TableCell>
                      <TableCell>
                        <Badge color="blue">{rule.requires}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge color="amber">{rule.sla}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>

            <Card className="mt-4">
              <Title className="mb-4">Approval Chain Visualization</Title>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <Text className="font-semibold">Request Initiated</Text>
                  <div className="flex-1 border-t-2 border-dashed border-gray-300" />
                </div>
                <div className="flex items-center gap-3 ml-6">
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <Text className="font-semibold">Pending Approval</Text>
                  <div className="flex-1 border-t-2 border-dashed border-gray-300" />
                </div>
                <div className="flex items-center gap-3 ml-12">
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <Text className="font-semibold">Approved & Executed</Text>
                </div>
              </div>
            </Card>
          </TabPanel>

          {/* Data Access Policies Tab */}
          <TabPanel>
            <Card>
              <Title className="mb-4">Access Rules</Title>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>Actor</TableHeaderCell>
                    <TableHeaderCell>Access Level</TableHeaderCell>
                    <TableHeaderCell>Restrictions</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataAccessRules.map((rule, idx) => (
                    <TableRow key={idx}>
                      <TableCell>
                        <Badge 
                          color={rule.actor.includes("Agent") ? "purple" : "blue"}
                          className="font-medium"
                        >
                          {rule.actor}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{rule.access}</TableCell>
                      <TableCell>
                        <Badge color="red">{rule.restrictions}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>

            <Card className="mt-4">
              <Title className="mb-4">Sensitive Data Protection</Title>
              <div className="flex gap-4">
                <Badge color="red" className="text-sm px-3 py-1">
                  🔒 PII Masked
                </Badge>
                <Badge color="red" className="text-sm px-3 py-1">
                  🔐 Secrets Redacted
                </Badge>
                <Badge color="amber" className="text-sm px-3 py-1">
                  📝 Access Logged
                </Badge>
              </div>
            </Card>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
}