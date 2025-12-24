"use client";

import { useState } from "react";
import { Card, Title, Text, Tab, TabGroup, TabList, TabPanel, TabPanels, Badge, Grid } from "@tremor/react";
import { ClipboardDocumentCheckIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

export default function CompliancePage() {
  const [selectedTab, setSelectedTab] = useState(0);

  const soxControls = [
    { name: "Change approval enforced", status: true },
    { name: "Audit trail retention", status: true },
    { name: "Access segregation", status: true },
    { name: "Financial data encryption", status: true }
  ];

  const pciControls = [
    { name: "Payment logs encrypted", status: true },
    { name: "Least privilege enforced", status: true },
    { name: "Vulnerability scans enabled", status: true },
    { name: "Network segmentation", status: true }
  ];

  const hipaaControls = [
    { name: "PHI access logging", status: true },
    { name: "Data masking", status: true },
    { name: "Incident response plan", status: true },
    { name: "Encryption at rest & transit", status: true }
  ];

  const customControls = [
    { name: "AI actions must be explainable", description: "All AI decisions must have traceable reasoning" },
    { name: "No automation without rollback plan", description: "Every automated action requires defined rollback" },
    { name: "Production changes logged always", description: "All prod changes must be logged in audit trail" },
    { name: "Agent actions require approval for critical resources", description: "AI agents need human approval for critical systems" }
  ];

  const ControlList = ({ controls }: { controls: { name: string; status: boolean }[] }) => (
    <div className="space-y-3">
      {controls.map((control, idx) => (
        <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <CheckCircleIcon className={`h-5 w-5 ${control.status ? "text-emerald-500" : "text-gray-400"}`} />
            <Text className="font-medium">{control.name}</Text>
          </div>
          <Badge color={control.status ? "emerald" : "red"}>
            {control.status ? "✔ Compliant" : "✗ Non-compliant"}
          </Badge>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <Title>Compliance</Title>
        <Text className="mt-2">Track compliance posture across standards and controls</Text>
      </div>

      {/* Compliance Overview */}
      <Grid numItemsMd={2} numItemsLg={4} className="gap-4">
        <Card decoration="top" decorationColor="emerald">
          <Text className="text-gray-600">SOX</Text>
          <div className="flex items-center gap-2 mt-2">
            <CheckCircleIcon className="h-6 w-6 text-emerald-500" />
            <Text className="text-2xl font-bold">100%</Text>
          </div>
          <Text className="text-gray-500 text-sm mt-1">4/4 controls</Text>
        </Card>
        <Card decoration="top" decorationColor="emerald">
          <Text className="text-gray-600">PCI</Text>
          <div className="flex items-center gap-2 mt-2">
            <CheckCircleIcon className="h-6 w-6 text-emerald-500" />
            <Text className="text-2xl font-bold">100%</Text>
          </div>
          <Text className="text-gray-500 text-sm mt-1">4/4 controls</Text>
        </Card>
        <Card decoration="top" decorationColor="emerald">
          <Text className="text-gray-600">HIPAA</Text>
          <div className="flex items-center gap-2 mt-2">
            <CheckCircleIcon className="h-6 w-6 text-emerald-500" />
            <Text className="text-2xl font-bold">100%</Text>
          </div>
          <Text className="text-gray-500 text-sm mt-1">4/4 controls</Text>
        </Card>
        <Card decoration="top" decorationColor="blue">
          <Text className="text-gray-600">Custom</Text>
          <div className="flex items-center gap-2 mt-2">
            <ClipboardDocumentCheckIcon className="h-6 w-6 text-blue-500" />
            <Text className="text-2xl font-bold">4</Text>
          </div>
          <Text className="text-gray-500 text-sm mt-1">Active rules</Text>
        </Card>
      </Grid>

      <TabGroup index={selectedTab} onIndexChange={setSelectedTab}>
        <TabList>
          <Tab>SOX</Tab>
          <Tab>PCI</Tab>
          <Tab>HIPAA</Tab>
          <Tab>Custom Controls</Tab>
        </TabList>

        <TabPanels className="mt-6">
          {/* SOX Tab */}
          <TabPanel>
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <ClipboardDocumentCheckIcon className="h-5 w-5 text-emerald-500" />
                <Title>SOX Controls Status</Title>
              </div>
              <ControlList controls={soxControls} />
            </Card>
          </TabPanel>

          {/* PCI Tab */}
          <TabPanel>
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <ClipboardDocumentCheckIcon className="h-5 w-5 text-emerald-500" />
                <Title>PCI DSS Controls Status</Title>
              </div>
              <ControlList controls={pciControls} />
            </Card>
          </TabPanel>

          {/* HIPAA Tab */}
          <TabPanel>
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <ClipboardDocumentCheckIcon className="h-5 w-5 text-emerald-500" />
                <Title>HIPAA Controls Status</Title>
              </div>
              <ControlList controls={hipaaControls} />
            </Card>
          </TabPanel>

          {/* Custom Controls Tab */}
          <TabPanel>
            <div className="space-y-4">
              {customControls.map((control, idx) => (
                <Card key={idx} decoration="left" decorationColor="blue">
                  <div className="flex items-start gap-3">
                    <ClipboardDocumentCheckIcon className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <Title className="mb-2">{control.name}</Title>
                      <Text className="text-gray-600">{control.description}</Text>
                      <div className="mt-3">
                        <Badge color="emerald">Active</Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
}