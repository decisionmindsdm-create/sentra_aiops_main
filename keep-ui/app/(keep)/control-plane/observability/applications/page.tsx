"use client";

import { useState } from "react";
import { Title, Card, Text, TabGroup, TabList, Tab, TabPanels, TabPanel, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Badge, Flex, Metric } from "@tremor/react";

export default function ApplicationsPage() {
  const [selectedTab, setSelectedTab] = useState(0);

  const applications = [
    { name: "Checkout App", status: "Healthy", uptime: "99.9%", errors: 12 },
    { name: "Payments App", status: "Degraded", uptime: "98.2%", errors: 89 },
    { name: "User Profile App", status: "Healthy", uptime: "99.7%", errors: 5 }
  ];

  const services = [
    { name: "checkout-service", latency: "180ms", errorRate: "0.3%", status: "Healthy" },
    { name: "payment-gateway", latency: "420ms", errorRate: "2.1%", status: "Degraded" },
    { name: "user-service", latency: "95ms", errorRate: "0.1%", status: "Healthy" }
  ];

  const endpoints = [
    { endpoint: "/api/checkout", method: "POST", p95: "620ms", errorRate: "0.8%", calls: "12.4k" },
    { endpoint: "/api/payment", method: "POST", p95: "890ms", errorRate: "3.4%", calls: "8.1k" },
    { endpoint: "/api/user/profile", method: "GET", p95: "120ms", errorRate: "0.2%", calls: "45.2k" }
  ];

  return (
    <div className="p-6">
      <Title>Application Observability</Title>
      <Text className="mt-2 mb-6">Monitor application performance and health</Text>

      <TabGroup index={selectedTab} onIndexChange={setSelectedTab}>
        <TabList>
          <Tab>Applications</Tab>
          <Tab>Services</Tab>
          <Tab>APIs & Endpoints</Tab>
          <Tab>User Experience</Tab>
        </TabList>

        <TabPanels>
          {/* Applications Tab */}
          <TabPanel>
            <Card className="mt-4">
              <Text className="font-semibold mb-3">Applications</Text>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>Application</TableHeaderCell>
                    <TableHeaderCell>Status</TableHeaderCell>
                    <TableHeaderCell>Uptime</TableHeaderCell>
                    <TableHeaderCell>Errors (24h)</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {applications.map((app) => (
                    <TableRow key={app.name}>
                      <TableCell>{app.name}</TableCell>
                      <TableCell>
                        <Badge color={app.status === "Healthy" ? "green" : "yellow"}>
                          {app.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{app.uptime}</TableCell>
                      <TableCell>{app.errors}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabPanel>

          {/* Services Tab */}
          <TabPanel>
            <Card className="mt-4">
              <Text className="font-semibold mb-3">Services</Text>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>Service Name</TableHeaderCell>
                    <TableHeaderCell>Latency (avg)</TableHeaderCell>
                    <TableHeaderCell>Error Rate</TableHeaderCell>
                    <TableHeaderCell>Status</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {services.map((service) => (
                    <TableRow key={service.name}>
                      <TableCell>{service.name}</TableCell>
                      <TableCell>{service.latency}</TableCell>
                      <TableCell>{service.errorRate}</TableCell>
                      <TableCell>
                        <Badge color={service.status === "Healthy" ? "green" : "yellow"}>
                          {service.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabPanel>

          {/* APIs & Endpoints Tab */}
          <TabPanel>
            <Card className="mt-4">
              <Text className="font-semibold mb-3">APIs & Endpoints</Text>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>Endpoint</TableHeaderCell>
                    <TableHeaderCell>Method</TableHeaderCell>
                    <TableHeaderCell>P95 Latency</TableHeaderCell>
                    <TableHeaderCell>Error Rate</TableHeaderCell>
                    <TableHeaderCell>Calls (24h)</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {endpoints.map((ep) => (
                    <TableRow key={ep.endpoint}>
                      <TableCell>{ep.endpoint}</TableCell>
                      <TableCell>
                        <Badge color="blue">{ep.method}</Badge>
                      </TableCell>
                      <TableCell>{ep.p95}</TableCell>
                      <TableCell>{ep.errorRate}</TableCell>
                      <TableCell>{ep.calls}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabPanel>

          {/* User Experience Tab */}
          <TabPanel>
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <Text>Apdex Score</Text>
                  <Metric className="mt-2">0.91</Metric>
                  <Badge color="green" className="mt-2">Excellent</Badge>
                </Card>
                <Card>
                  <Text>Avg Page Load</Text>
                  <Metric className="mt-2">2.3s</Metric>
                  <Badge color="yellow" className="mt-2">Good</Badge>
                </Card>
                <Card>
                  <Text>Rage Clicks Detected</Text>
                  <Metric className="mt-2">14</Metric>
                  <Badge color="orange" className="mt-2">Monitor</Badge>
                </Card>
              </div>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
}