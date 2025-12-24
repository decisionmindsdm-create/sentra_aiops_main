"use client";

import { Card, Title, Text, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Badge } from "@tremor/react";
import { BellIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function NotificationsPage() {
  const channels = [
    { name: "Email", enabled: true },
    { name: "Slack", enabled: true },
    { name: "PagerDuty", enabled: true },
    { name: "MS Teams", enabled: false }
  ];

  const severityRouting = [
    {
      severity: "Sev-1",
      channels: ["PagerDuty", "Slack"],
      color: "red"
    },
    {
      severity: "Sev-2",
      channels: ["Slack", "Email"],
      color: "amber"
    },
    {
      severity: "Sev-3",
      channels: ["Email"],
      color: "yellow"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <Title>Notification Preferences</Title>
        <Text className="mt-2">Configure how and where you receive alerts and notifications</Text>
      </div>

      {/* Channel Toggles */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <BellIcon className="h-5 w-5 text-gray-500" />
          <Title>Notification Channels</Title>
        </div>
        <div className="space-y-3">
          {channels.map((channel, idx) => (
            <div key={idx} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded flex items-center justify-center ${
                  channel.enabled 
                    ? "bg-emerald-500 text-white" 
                    : "bg-gray-300 text-gray-500"
                }`}>
                  {channel.enabled ? (
                    <CheckIcon className="h-4 w-4" />
                  ) : (
                    <XMarkIcon className="h-4 w-4" />
                  )}
                </div>
                <Text className="font-medium">{channel.name}</Text>
              </div>
              <Badge color={channel.enabled ? "emerald" : "gray"}>
                {channel.enabled ? "Enabled" : "Disabled"}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Severity Routing */}
      <Card>
        <Title className="mb-4">Severity Routing Rules</Title>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Severity Level</TableHeaderCell>
              <TableHeaderCell>Notification Channels</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {severityRouting.map((rule, idx) => (
              <TableRow key={idx}>
                <TableCell>
                  <Badge color={rule.color as any} className="font-semibold">
                    {rule.severity}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {rule.channels.map((channel, cidx) => (
                      <Badge key={cidx} color="blue">
                        {channel}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Quiet Hours */}
      <Card>
        <Title className="mb-4">Quiet Hours</Title>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <Text className="font-semibold">Time Window</Text>
              <Text className="text-gray-600 text-sm mt-1">11:00 PM – 6:00 AM</Text>
            </div>
            <Badge color="purple">Active</Badge>
          </div>
          <div className="pt-3 border-t border-gray-200">
            <Text className="font-semibold mb-2">Exceptions</Text>
            <Badge color="red" className="text-sm">
              Sev-1 alerts only
            </Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}