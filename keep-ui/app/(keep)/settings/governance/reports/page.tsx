"use client";

import { Card, Title, Text, Grid, Button, Badge } from "@tremor/react";
import { ArrowDownTrayIcon, DocumentTextIcon, ClockIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

export default function ReportsPage() {
  const reportTypes = [
    {
      name: "Audit Activity Report",
      description: "Complete log of all user, agent, and system actions",
      icon: DocumentTextIcon,
      lastGenerated: "2 hours ago"
    },
    {
      name: "Policy Enforcement Report",
      description: "Summary of policy violations and enforcement actions",
      icon: DocumentTextIcon,
      lastGenerated: "1 day ago"
    },
    {
      name: "AI Decision Traceability Report",
      description: "Detailed breakdown of AI agent decisions and reasoning",
      icon: DocumentTextIcon,
      lastGenerated: "5 hours ago"
    },
    {
      name: "Compliance Readiness Report",
      description: "Overall compliance status across SOX, PCI, HIPAA standards",
      icon: DocumentTextIcon,
      lastGenerated: "3 hours ago"
    }
  ];

  const exportFormats = [
    { format: "PDF", color: "red", icon: "📄" },
    { format: "CSV", color: "emerald", icon: "📊" },
    { format: "JSON", color: "blue", icon: "📋" }
  ];

  const schedules = [
    { frequency: "Daily", time: "9:00 AM", color: "blue" },
    { frequency: "Weekly", time: "Monday 9:00 AM", color: "purple" },
    { frequency: "Monthly", time: "1st of month, 9:00 AM", color: "amber" }
  ];

  return (
    <div className="space-y-6">
      <div>
        <Title>Reports & Exports</Title>
        <Text className="mt-2">Generate governance, audit, and compliance reports</Text>
      </div>

      {/* Report Types */}
      <div>
        <Title className="mb-4">Available Reports</Title>
        <Grid numItemsMd={2} className="gap-4">
          {reportTypes.map((report, idx) => {
            const IconComponent = report.icon;
            return (
              <Card key={idx}>
                <div className="flex items-start gap-3 mb-3">
                  <IconComponent className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <Title className="mb-1">{report.name}</Title>
                    <Text className="text-gray-600 text-sm">{report.description}</Text>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <ClockIcon className="h-4 w-4 text-gray-400" />
                    <Text className="text-sm text-gray-600">Last: {report.lastGenerated}</Text>
                  </div>
                  <Button size="xs" icon={ArrowDownTrayIcon} color="blue">
                    Generate
                  </Button>
                </div>
              </Card>
            );
          })}
        </Grid>
      </div>

      {/* Export Options */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <ArrowDownTrayIcon className="h-5 w-5 text-gray-500" />
          <Title>Export Formats</Title>
        </div>
        <div className="flex gap-3">
          {exportFormats.map((format, idx) => (
            <Badge key={idx} color={format.color as any} className="text-base px-4 py-2">
              {format.icon} {format.format}
            </Badge>
          ))}
        </div>
        <Text className="text-gray-600 text-sm mt-3">
          All reports can be exported in PDF, CSV, or JSON format
        </Text>
      </Card>

      {/* Schedule Reports */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <ClockIcon className="h-5 w-5 text-gray-500" />
          <Title>Schedule Reports</Title>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {schedules.map((schedule, idx) => (
              <Card key={idx} decoration="top" decorationColor={schedule.color as any}>
                <Text className="font-semibold mb-1">{schedule.frequency}</Text>
                <Text className="text-gray-600 text-sm">{schedule.time}</Text>
              </Card>
            ))}
          </div>

          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <EnvelopeIcon className="h-5 w-5 text-gray-500" />
              <Text className="font-semibold">Email Recipients</Text>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge color="gray">vivek@company.com</Badge>
              <Badge color="gray">riya@company.com</Badge>
              <Badge color="gray">compliance-team@company.com</Badge>
              <Badge color="gray">audit-team@company.com</Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <Card>
        <Title className="mb-4">Quick Actions</Title>
        <div className="flex gap-3">
          <Button color="blue" icon={ArrowDownTrayIcon}>
            Generate All Reports
          </Button>
          <Button color="slate" variant="secondary">
            Configure Schedule
          </Button>
          <Button color="slate" variant="secondary">
            Manage Recipients
          </Button>
        </div>
      </Card>
    </div>
  );
}