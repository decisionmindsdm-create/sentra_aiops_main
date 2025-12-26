import { Title, Card, Text, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Badge, Flex } from "@tremor/react";

export default function SystemActionRequestsPage() {
  const aiRecommendations = [
    { id: 1, action: "Restart unstable pod", target: "payments-db-22c", confidence: "92%", status: "Pending Review" },
    { id: 2, action: "Scale checkout service", target: "checkout-api", confidence: "87%", status: "Approved" }
  ];

  const manualActions = [
    { id: 3, action: "Flush cache manually", target: "redis-cache", requester: "SRE Team", status: "In Progress" },
    { id: 4, action: "Pause alert ingestion", target: "alert-manager", requester: "Admin", status: "Pending" }
  ];

  const scheduledActions = [
    { id: 5, action: "Nightly cluster scaling", schedule: "Daily 2:00 AM", nextRun: "Tonight", status: "Active" },
    { id: 6, action: "Weekly log cleanup", schedule: "Sunday 3:00 AM", nextRun: "4 days", status: "Active" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved": case "Active": return "green";
      case "Pending": case "Pending Review": return "yellow";
      case "In Progress": return "blue";
      case "Rejected": return "red";
      default: return "gray";
    }
  };

  return (
    <div className="p-6">
      <Title>System Action Requests</Title>
      <Text className="mt-2 mb-6">AI-recommended and manual system actions</Text>

      <div className="space-y-6">
        {/* AI Recommended Actions */}
        <Card>
          <Flex>
            <Text className="font-semibold mb-3">AI Recommended Actions</Text>
            <Badge color="purple">AI Insights</Badge>
          </Flex>
          <Table className="mt-3">
            <TableHead>
              <TableRow>
                <TableHeaderCell>Action</TableHeaderCell>
                <TableHeaderCell>Target</TableHeaderCell>
                <TableHeaderCell>Confidence</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {aiRecommendations.map((action) => (
                <TableRow key={action.id}>
                  <TableCell>{action.action}</TableCell>
                  <TableCell><code className="text-xs bg-gray-100 px-2 py-1 rounded">{action.target}</code></TableCell>
                  <TableCell>
                    <Badge color={parseInt(action.confidence) > 90 ? "green" : "yellow"}>
                      {action.confidence}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge color={getStatusColor(action.status)}>
                      {action.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* Manual Action Requests */}
        <Card>
          <Text className="font-semibold mb-3">Manual Action Requests</Text>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Action</TableHeaderCell>
                <TableHeaderCell>Target</TableHeaderCell>
                <TableHeaderCell>Requester</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {manualActions.map((action) => (
                <TableRow key={action.id}>
                  <TableCell>{action.action}</TableCell>
                  <TableCell><code className="text-xs bg-gray-100 px-2 py-1 rounded">{action.target}</code></TableCell>
                  <TableCell>{action.requester}</TableCell>
                  <TableCell>
                    <Badge color={getStatusColor(action.status)}>
                      {action.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* Scheduled Actions */}
        <Card>
          <Text className="font-semibold mb-3">Scheduled Actions</Text>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Action</TableHeaderCell>
                <TableHeaderCell>Schedule</TableHeaderCell>
                <TableHeaderCell>Next Run</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {scheduledActions.map((action) => (
                <TableRow key={action.id}>
                  <TableCell>{action.action}</TableCell>
                  <TableCell>{action.schedule}</TableCell>
                  <TableCell>{action.nextRun}</TableCell>
                  <TableCell>
                    <Badge color={getStatusColor(action.status)}>
                      {action.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}