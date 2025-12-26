"use client";

import { useState } from "react";
import { Title, Card, Text, TabGroup, TabList, Tab, TabPanels, TabPanel, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Badge, Flex } from "@tremor/react";

export default function InfrastructurePage() {
  const [selectedTab, setSelectedTab] = useState(0);

  // Mock data
  const clusters = [
    { name: "prod-cluster-1", status: "Healthy", nodes: 24, pods: 312 },
    { name: "staging-cluster-2", status: "Warning", nodes: 8, pods: 89 },
    { name: "dev-cluster-3", status: "Healthy", nodes: 4, pods: 45 }
  ];

  const namespaces = [
    { name: "payments", pods: 12, cpu: "62%", memory: "71%" },
    { name: "checkout", pods: 9, cpu: "45%", memory: "53%" },
    { name: "monitoring", pods: 7, cpu: "32%", memory: "41%" }
  ];

  const pods = [
    { name: "checkout-api-7fd", namespace: "checkout", cpu: "62%", memory: "71%", restarts: 0, status: "Running" },
    { name: "payments-db-22c", namespace: "payments", cpu: "91%", memory: "84%", restarts: 2, status: "Warning" },
    { name: "checkout-web-9ab", namespace: "checkout", cpu: "34%", memory: "42%", restarts: 0, status: "Running" },
    { name: "payments-api-5ef", namespace: "payments", cpu: "78%", memory: "69%", restarts: 1, status: "Running" },
    { name: "monitoring-prometheus", namespace: "monitoring", cpu: "45%", memory: "67%", restarts: 0, status: "Running" }
  ];

  return (
    <div className="p-6">
      <Title>Infrastructure Observability</Title>
      <Text className="mt-2 mb-6">Monitor and manage infrastructure resources</Text>

      <TabGroup index={selectedTab} onIndexChange={setSelectedTab}>
        <TabList>
          <Tab>Hosts</Tab>
          <Tab>Kubernetes</Tab>
          <Tab>Cloud Resources</Tab>
          <Tab>Network & Storage</Tab>
        </TabList>

        <TabPanels>
          {/* Hosts Tab */}
          <TabPanel>
            <Card className="mt-4">
              <Text className="font-semibold mb-4">Host Infrastructure</Text>
              <Text className="text-gray-600">Host monitoring data will be displayed here.</Text>
            </Card>
          </TabPanel>

          {/* Kubernetes Tab */}
          <TabPanel>
            <div className="mt-4 space-y-6">
              {/* Clusters */}
              <Card>
                <Text className="font-semibold mb-3">Clusters</Text>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableHeaderCell>Cluster Name</TableHeaderCell>
                      <TableHeaderCell>Status</TableHeaderCell>
                      <TableHeaderCell>Nodes</TableHeaderCell>
                      <TableHeaderCell>Pods</TableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {clusters.map((cluster) => (
                      <TableRow key={cluster.name}>
                        <TableCell>{cluster.name}</TableCell>
                        <TableCell>
                          <Badge color={cluster.status === "Healthy" ? "green" : "yellow"}>
                            {cluster.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{cluster.nodes}</TableCell>
                        <TableCell>{cluster.pods}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>

              {/* Namespaces */}
              <Card>
                <Text className="font-semibold mb-3">Namespaces</Text>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableHeaderCell>Namespace</TableHeaderCell>
                      <TableHeaderCell>Pods</TableHeaderCell>
                      <TableHeaderCell>CPU Usage</TableHeaderCell>
                      <TableHeaderCell>Memory Usage</TableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {namespaces.map((ns) => (
                      <TableRow key={ns.name}>
                        <TableCell>{ns.name}</TableCell>
                        <TableCell>{ns.pods}</TableCell>
                        <TableCell>{ns.cpu}</TableCell>
                        <TableCell>{ns.memory}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>

              {/* Pods */}
              <Card>
                <Text className="font-semibold mb-3">Pods</Text>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableHeaderCell>Pod Name</TableHeaderCell>
                      <TableHeaderCell>Namespace</TableHeaderCell>
                      <TableHeaderCell>CPU %</TableHeaderCell>
                      <TableHeaderCell>Memory %</TableHeaderCell>
                      <TableHeaderCell>Restarts</TableHeaderCell>
                      <TableHeaderCell>Status</TableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pods.map((pod) => (
                      <TableRow key={pod.name}>
                        <TableCell>{pod.name}</TableCell>
                        <TableCell>{pod.namespace}</TableCell>
                        <TableCell>{pod.cpu}</TableCell>
                        <TableCell>{pod.memory}</TableCell>
                        <TableCell>{pod.restarts}</TableCell>
                        <TableCell>
                          <Badge color={pod.status === "Running" ? "green" : "yellow"}>
                            {pod.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          </TabPanel>

          {/* Cloud Resources Tab */}
          <TabPanel>
            <Card className="mt-4">
              <Text className="font-semibold mb-4">Cloud Resources</Text>
              <Text className="text-gray-600">Cloud resource monitoring data will be displayed here.</Text>
            </Card>
          </TabPanel>

          {/* Network & Storage Tab */}
          <TabPanel>
            <Card className="mt-4">
              <Text className="font-semibold mb-4">Network & Storage</Text>
              <Text className="text-gray-600">Network and storage monitoring data will be displayed here.</Text>
            </Card>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
}