"use client";

import { Card, Title, Text, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Badge } from "@tremor/react";
import { UserGroupIcon } from "@heroicons/react/24/outline";

export default function TeamsPage() {
  const teams = [
    {
      name: "Payments Team",
      owner: "Vivek",
      members: 8,
      services: 12,
      onCallContact: "payments-oncall@company.com"
    },
    {
      name: "Platform SRE",
      owner: "Riya",
      members: 5,
      services: 24,
      onCallContact: "sre-oncall@company.com"
    },
    {
      name: "Data Engineering",
      owner: "Arun",
      members: 6,
      services: 15,
      onCallContact: "data-oncall@company.com"
    }
  ];

  const ownershipMapping = [
    {
      service: "checkout-service",
      team: "Payments Team",
      onCallContact: "pagerduty",
      escalation: "SRE Manager"
    },
    {
      service: "user-authentication",
      team: "Platform SRE",
      onCallContact: "slack",
      escalation: "Tech Lead"
    },
    {
      service: "data-pipeline",
      team: "Data Engineering",
      onCallContact: "pagerduty",
      escalation: "Data Architect"
    },
    {
      service: "payment-gateway",
      team: "Payments Team",
      onCallContact: "pagerduty",
      escalation: "SRE Manager"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <Title>Teams & Ownership</Title>
        <Text className="mt-2">Manage teams, responsibilities, and service ownership</Text>
      </div>

      {/* Teams List */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <UserGroupIcon className="h-5 w-5 text-gray-500" />
          <Title>Teams</Title>
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Team Name</TableHeaderCell>
              <TableHeaderCell>Owner</TableHeaderCell>
              <TableHeaderCell>Members</TableHeaderCell>
              <TableHeaderCell>Services</TableHeaderCell>
              <TableHeaderCell>On-Call Contact</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teams.map((team, idx) => (
              <TableRow key={idx}>
                <TableCell className="font-medium">{team.name}</TableCell>
                <TableCell>{team.owner}</TableCell>
                <TableCell>
                  <Badge color="blue">{team.members}</Badge>
                </TableCell>
                <TableCell>
                  <Badge color="emerald">{team.services}</Badge>
                </TableCell>
                <TableCell className="text-gray-600">{team.onCallContact}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Ownership Mapping */}
      <Card>
        <Title className="mb-4">Ownership Mapping</Title>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Service / Component</TableHeaderCell>
              <TableHeaderCell>Owning Team</TableHeaderCell>
              <TableHeaderCell>On-Call Contact</TableHeaderCell>
              <TableHeaderCell>Escalation Path</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ownershipMapping.map((mapping, idx) => (
              <TableRow key={idx}>
                <TableCell className="font-medium">{mapping.service}</TableCell>
                <TableCell>{mapping.team}</TableCell>
                <TableCell>
                  <Badge color="amber">{mapping.onCallContact}</Badge>
                </TableCell>
                <TableCell className="text-gray-600">{mapping.escalation}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}