import { Title, Card, Text, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Badge } from "@tremor/react";

export default function ChangeRequestsPage() {
  const plannedChanges = [
    { id: 1, change: "Checkout release v2.3", type: "Deployment", scheduled: "Tomorrow 10:00 AM", status: "Scheduled" },
    { id: 2, change: "DB index optimization", type: "Database", scheduled: "Friday 2:00 AM", status: "Approved" }
  ];

  const emergencyChanges = [
    { id: 3, change: "Hotfix for payment failures", type: "Emergency", submitted: "30 min ago", status: "In Progress" }
  ];

  const maintenanceWindows = [
    { id: 4, window: "Prod maintenance", schedule: "Sunday 2:00 AM - 4:00 AM", impactedServices: "All", status: "Scheduled" },
    { id: 5, window: "Database maintenance", schedule: "Saturday 11:00 PM - 1:00 AM", impactedServices: "Orders, Payments", status: "Scheduled" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved": case "Scheduled": return "green";
      case "In Progress": return "blue";
      case "Pending": return "yellow";
      case "Rejected": return "red";
      default: return "gray";
    }
  };

  return (
    <div className="p-6">
      <Title>Change Requests</Title>
      <Text className="mt-2 mb-6">Manage planned changes, emergency fixes, and maintenance windows</Text>

      <div className="space-y-6">
        {/* Planned Changes */}
        <Card>
          <Text className="font-semibold mb-3">Planned Changes</Text>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Change</TableHeaderCell>
                <TableHeaderCell>Type</TableHeaderCell>
                <TableHeaderCell>Scheduled</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {plannedChanges.map((change) => (
                <TableRow key={change.id}>
                  <TableCell>{change.change}</TableCell>
                  <TableCell>
                    <Badge color="blue">{change.type}</Badge>
                  </TableCell>
                  <TableCell>{change.scheduled}</TableCell>
                  <TableCell>
                    <Badge color={getStatusColor(change.status)}>
                      {change.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* Emergency Changes */}
        <Card>
          <Text className="font-semibold mb-3">Emergency Changes</Text>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Change</TableHeaderCell>
                <TableHeaderCell>Type</TableHeaderCell>
                <TableHeaderCell>Submitted</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {emergencyChanges.map((change) => (
                <TableRow key={change.id}>
                  <TableCell>{change.change}</TableCell>
                  <TableCell>
                    <Badge color="red">{change.type}</Badge>
                  </TableCell>
                  <TableCell>{change.submitted}</TableCell>
                  <TableCell>
                    <Badge color={getStatusColor(change.status)}>
                      {change.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* Maintenance Windows */}
        <Card>
          <Text className="font-semibold mb-3">Maintenance Windows</Text>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Window</TableHeaderCell>
                <TableHeaderCell>Schedule</TableHeaderCell>
                <TableHeaderCell>Impacted Services</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {maintenanceWindows.map((window) => (
                <TableRow key={window.id}>
                  <TableCell>{window.window}</TableCell>
                  <TableCell>{window.schedule}</TableCell>
                  <TableCell>{window.impactedServices}</TableCell>
                  <TableCell>
                    <Badge color={getStatusColor(window.status)}>
                      {window.status}
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