"use client";

import { useState } from "react";
import { Title, Card, Text, TabGroup, TabList, Tab, TabPanels, TabPanel, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Badge, Button, Flex } from "@tremor/react";

export default function ApprovalsPage() {
  const [selectedTab, setSelectedTab] = useState(0);

  const pendingApprovals = [
    { id: 1, request: "Scale prod cluster", type: "System Action", requester: "AI Agent", waitingFor: "SRE", submitted: "1 hour ago" },
    { id: 2, request: "Disable alert rule", type: "Configuration", requester: "John Doe", waitingFor: "Admin", submitted: "3 hours ago" }
  ];

  const approvedRequests = [
    { id: 3, request: "Restart pod", type: "System Action", approver: "Jane Smith", approved: "2 hours ago" },
    { id: 4, request: "Grant read-only DB access", type: "Access Request", approver: "Mike Johnson", approved: "5 hours ago" }
  ];

  const rejectedRequests = [
    { id: 5, request: "Disable monitoring agent", type: "Configuration", rejectedBy: "Admin", reason: "Security risk", rejected: "1 day ago" },
    { id: 6, request: "Skip approval policy", type: "Policy Override", rejectedBy: "Security Team", reason: "Not authorized", rejected: "2 days ago" }
  ];

  return (
    <div className="p-6">
      <Title>Approvals</Title>
      <Text className="mt-2 mb-6">Manage approval workflows and requests</Text>

      <TabGroup index={selectedTab} onIndexChange={setSelectedTab}>
        <TabList>
          <Tab>Pending Approvals</Tab>
          <Tab>Approved</Tab>
          <Tab>Rejected</Tab>
        </TabList>

        <TabPanels>
          {/* Pending Approvals Tab */}
          <TabPanel>
            <Card className="mt-4">
              <Flex className="mb-3">
                <Text className="font-semibold">Pending Approvals</Text>
                <Badge color="yellow">{pendingApprovals.length} pending</Badge>
              </Flex>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>Request</TableHeaderCell>
                    <TableHeaderCell>Type</TableHeaderCell>
                    <TableHeaderCell>Requester</TableHeaderCell>
                    <TableHeaderCell>Waiting For</TableHeaderCell>
                    <TableHeaderCell>Submitted</TableHeaderCell>
                    <TableHeaderCell>Actions</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pendingApprovals.map((approval) => (
                    <TableRow key={approval.id}>
                      <TableCell>{approval.request}</TableCell>
                      <TableCell>
                        <Badge color="blue">{approval.type}</Badge>
                      </TableCell>
                      <TableCell>{approval.requester}</TableCell>
                      <TableCell>
                        <Badge color="orange">{approval.waitingFor}</Badge>
                      </TableCell>
                      <TableCell>{approval.submitted}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="xs" variant="secondary" className="!bg-green-500 !text-white hover:!bg-green-600">
                            Approve
                          </Button>
                          <Button size="xs" variant="secondary" className="!bg-red-500 !text-white hover:!bg-red-600">
                            Reject
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabPanel>

          {/* Approved Tab */}
          <TabPanel>
            <Card className="mt-4">
              <Text className="font-semibold mb-3">Approved Requests</Text>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>Request</TableHeaderCell>
                    <TableHeaderCell>Type</TableHeaderCell>
                    <TableHeaderCell>Approver</TableHeaderCell>
                    <TableHeaderCell>Approved</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {approvedRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>{request.request}</TableCell>
                      <TableCell>
                        <Badge color="blue">{request.type}</Badge>
                      </TableCell>
                      <TableCell>{request.approver}</TableCell>
                      <TableCell>{request.approved}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabPanel>

          {/* Rejected Tab */}
          <TabPanel>
            <Card className="mt-4">
              <Text className="font-semibold mb-3">Rejected Requests</Text>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>Request</TableHeaderCell>
                    <TableHeaderCell>Type</TableHeaderCell>
                    <TableHeaderCell>Rejected By</TableHeaderCell>
                    <TableHeaderCell>Reason</TableHeaderCell>
                    <TableHeaderCell>Rejected</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rejectedRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>{request.request}</TableCell>
                      <TableCell>
                        <Badge color="blue">{request.type}</Badge>
                      </TableCell>
                      <TableCell>{request.rejectedBy}</TableCell>
                      <TableCell>{request.reason}</TableCell>
                      <TableCell>{request.rejected}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
}