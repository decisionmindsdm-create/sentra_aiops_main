import { Card, Grid, Title, Text, Metric, Badge, BarList } from "@tremor/react";
import { ResourceType } from "../../types";
import { getStatusColor } from "../../utils";

interface OverviewTabProps {
  resourceType: ResourceType;
}

export function OverviewTab({ resourceType }: OverviewTabProps) {
  if (resourceType === "hosts") {
    return (
      <div className="mt-4">
        <Grid numItems={1} numItemsSm={2} numItemsLg={4} className="gap-4">
          <Card>
            <Text>Total Hosts</Text>
            <Metric>156</Metric>
          </Card>
          <Card>
            <Text>Healthy</Text>
            <Metric className="text-emerald-600">142</Metric>
          </Card>
          <Card>
            <Text>Warning</Text>
            <Metric className="text-amber-600">10</Metric>
          </Card>
          <Card>
            <Text>Critical</Text>
            <Metric className="text-red-600">4</Metric>
          </Card>
        </Grid>

        <Card className="mt-4">
          <Title>OS Distribution</Title>
          <BarList
            data={[
              { name: "Linux", value: 89, color: "blue" },
              { name: "Windows", value: 52, color: "cyan" },
              { name: "macOS", value: 15, color: "indigo" },
            ]}
            className="mt-4"
          />
        </Card>
      </div>
    );
  }

  if (resourceType === "kubernetes") {
    return (
      <div className="mt-4">
        <Grid numItems={1} numItemsSm={2} numItemsLg={4} className="gap-4">
          <Card>
            <Text>Clusters</Text>
            <Metric>8</Metric>
          </Card>
          <Card>
            <Text>Total Nodes</Text>
            <Metric>124</Metric>
          </Card>
          <Card>
            <Text>Total Pods</Text>
            <Metric>1,247</Metric>
          </Card>
          <Card>
            <Text>Healthy Pods</Text>
            <Metric className="text-emerald-600">1,189</Metric>
          </Card>
        </Grid>

        <Card className="mt-4">
          <Title>Pod Status Distribution</Title>
          <BarList
            data={[
              { name: "Running", value: 1189, color: "emerald" },
              { name: "Pending", value: 42, color: "amber" },
              { name: "Failed", value: 16, color: "red" },
            ]}
            className="mt-4"
          />
        </Card>
      </div>
    );
  }

  if (resourceType === "cloud") {
    return (
      <div className="mt-4">
        <Grid numItems={1} numItemsSm={2} numItemsLg={4} className="gap-4">
          <Card>
            <Text>AWS Resources</Text>
            <Metric>342</Metric>
          </Card>
          <Card>
            <Text>Azure Resources</Text>
            <Metric>156</Metric>
          </Card>
          <Card>
            <Text>GCP Resources</Text>
            <Metric>89</Metric>
          </Card>
          <Card>
            <Text>Monthly Cost</Text>
            <Metric>$45,678</Metric>
          </Card>
        </Grid>

        <Card className="mt-4">
          <Title>Resource Distribution by Provider</Title>
          <BarList
            data={[
              { name: "AWS", value: 342, color: "amber" },
              { name: "Azure", value: 156, color: "blue" },
              { name: "GCP", value: 89, color: "red" },
            ]}
            className="mt-4"
          />
        </Card>
      </div>
    );
  }

  // network-storage
  return (
    <div className="mt-4">
      <Grid numItems={1} numItemsSm={2} numItemsLg={4} className="gap-4">
        <Card>
          <Text>Network Devices</Text>
          <Metric>67</Metric>
        </Card>
        <Card>
          <Text>Storage Systems</Text>
          <Metric>23</Metric>
        </Card>
        <Card>
          <Text>Network Health</Text>
          <Metric className="text-emerald-600">98.5%</Metric>
        </Card>
        <Card>
          <Text>Storage Utilization</Text>
          <Metric className="text-amber-600">76.3%</Metric>
        </Card>
      </Grid>

      <Card className="mt-4">
        <Title>Device Type Distribution</Title>
        <BarList
          data={[
            { name: "Switches", value: 34, color: "blue" },
            { name: "Routers", value: 18, color: "cyan" },
            { name: "Firewalls", value: 15, color: "indigo" },
            { name: "Storage Arrays", value: 23, color: "purple" },
          ]}
          className="mt-4"
        />
      </Card>
    </div>
  );
}