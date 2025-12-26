import { Title, Card, Text, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Badge } from "@tremor/react";

export default function EmployeeRequestsPage() {
  const accessRequests = [
    { id: 1, request: "Request DB read access", requester: "John Doe", status: "Pending", submitted: "2 hours ago" },
    { id: 2, request: "Request prod logs access", requester: "Jane Smith", status: "Approved", submitted: "1 day ago" }
  ];

  const toolingRequests = [
    { id: 3, request: "Enable Grafana access", requester: "Mike Johnson", status: "Pending", submitted: "5 hours ago" },
    { id: 4, request: "Request GitHub repo access", requester: "Sarah Williams", status: "Approved", submitted: "3 days ago" }
  ];

  const itRequests = [
    { id: 5, request: "VPN issue", requester: "Tom Brown", status: "In Progress", submitted: "1 hour ago" },
    { id: 6, request: "Laptop performance issue", requester: "Emily Davis", status: "Pending", submitted: "4 hours ago" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved": return "green";
      case "Pending": return "yellow";
      case "In Progress": return "blue";
      case "Rejected": return "red";
      default: return "gray";
    }
  };

  return (
    <div className="p-6">
      <Title>Employee Requests</Title>
      <Text className="mt-2 mb-6">Manage employee access, tooling, and IT requests</Text>

      <div className="space-y-6">
        {/* Access Requests */}
        <Card>
          <Text className="font-semibold mb-3">Access Requests</Text>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Request</TableHeaderCell>
                <TableHeaderCell>Requester</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell>Submitted</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {accessRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.request}</TableCell>
                  <TableCell>{request.requester}</TableCell>
                  <TableCell>
                    <Badge color={getStatusColor(request.status)}>
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{request.submitted}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* Tooling Requests */}
        <Card>
          <Text className="font-semibold mb-3">Tooling Requests</Text>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Request</TableHeaderCell>
                <TableHeaderCell>Requester</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell>Submitted</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {toolingRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.request}</TableCell>
                  <TableCell>{request.requester}</TableCell>
                  <TableCell>
                    <Badge color={getStatusColor(request.status)}>
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{request.submitted}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* General IT Requests */}
        <Card>
          <Text className="font-semibold mb-3">General IT Requests</Text>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Request</TableHeaderCell>
                <TableHeaderCell>Requester</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell>Submitted</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {itRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.request}</TableCell>
                  <TableCell>{request.requester}</TableCell>
                  <TableCell>
                    <Badge color={getStatusColor(request.status)}>
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{request.submitted}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}