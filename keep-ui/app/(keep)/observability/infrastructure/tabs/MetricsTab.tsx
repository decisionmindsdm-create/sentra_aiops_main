import { Card, Grid, Title, AreaChart, LineChart } from "@tremor/react";
import { ResourceType } from "../../types";

interface MetricsTabProps {
  resourceType: ResourceType;
}

const generateTimeSeriesData = (metric: string, points: number = 24) => {
  return Array.from({ length: points }, (_, i) => ({
    time: `${i}:00`,
    [metric]: Math.floor(Math.random() * 40) + 50,
  }));
};

export function MetricsTab({ resourceType }: MetricsTabProps) {
  if (resourceType === "hosts") {
    return (
      <div className="mt-4 space-y-4">
        <Grid numItems={1} numItemsSm={2} className="gap-4">
          <Card>
            <Title>CPU Usage (%)</Title>
            <AreaChart
              className="mt-4 h-52"
              data={generateTimeSeriesData("CPU")}
              index="time"
              categories={["CPU"]}
              colors={["blue"]}
              showLegend={false}
              showYAxis={true}
              showGridLines={true}
            />
          </Card>
          <Card>
            <Title>Memory Usage (%)</Title>
            <AreaChart
              className="mt-4 h-52"
              data={generateTimeSeriesData("Memory")}
              index="time"
              categories={["Memory"]}
              colors={["emerald"]}
              showLegend={false}
              showYAxis={true}
              showGridLines={true}
            />
          </Card>
        </Grid>
        <Card>
          <Title>Disk Usage (%)</Title>
          <AreaChart
            className="mt-4 h-52"
            data={generateTimeSeriesData("Disk")}
            index="time"
            categories={["Disk"]}
            colors={["amber"]}
            showLegend={false}
            showYAxis={true}
            showGridLines={true}
          />
        </Card>
      </div>
    );
  }

  if (resourceType === "kubernetes") {
    return (
      <div className="mt-4 space-y-4">
        <Grid numItems={1} numItemsSm={2} className="gap-4">
          <Card>
            <Title>Node CPU Usage (%)</Title>
            <LineChart
              className="mt-4 h-52"
              data={generateTimeSeriesData("CPU")}
              index="time"
              categories={["CPU"]}
              colors={["blue"]}
              showLegend={false}
              showYAxis={true}
              showGridLines={true}
            />
          </Card>
          <Card>
            <Title>Node Memory Usage (%)</Title>
            <LineChart
              className="mt-4 h-52"
              data={generateTimeSeriesData("Memory")}
              index="time"
              categories={["Memory"]}
              colors={["emerald"]}
              showLegend={false}
              showYAxis={true}
              showGridLines={true}
            />
          </Card>
        </Grid>
        <Card>
          <Title>Pod Restarts (Last 24h)</Title>
          <AreaChart
            className="mt-4 h-52"
            data={Array.from({ length: 24 }, (_, i) => ({
              time: `${i}:00`,
              Restarts: Math.floor(Math.random() * 10),
            }))}
            index="time"
            categories={["Restarts"]}
            colors={["red"]}
            showLegend={false}
            showYAxis={true}
            showGridLines={true}
          />
        </Card>
      </div>
    );
  }

  if (resourceType === "cloud") {
    return (
      <div className="mt-4 space-y-4">
        <Grid numItems={1} numItemsSm={2} className="gap-4">
          <Card>
            <Title>EC2/VM CPU Usage (%)</Title>
            <AreaChart
              className="mt-4 h-52"
              data={generateTimeSeriesData("CPU")}
              index="time"
              categories={["CPU"]}
              colors={["amber"]}
              showLegend={false}
              showYAxis={true}
              showGridLines={true}
            />
          </Card>
          <Card>
            <Title>Network I/O (MB/s)</Title>
            <LineChart
              className="mt-4 h-52"
              data={Array.from({ length: 24 }, (_, i) => ({
                time: `${i}:00`,
                "Network I/O": Math.floor(Math.random() * 100) + 50,
              }))}
              index="time"
              categories={["Network I/O"]}
              colors={["cyan"]}
              showLegend={false}
              showYAxis={true}
              showGridLines={true}
            />
          </Card>
        </Grid>
        <Card>
          <Title>Storage Usage (GB)</Title>
          <AreaChart
            className="mt-4 h-52"
            data={Array.from({ length: 24 }, (_, i) => ({
              time: `${i}:00`,
              Storage: 5000 + Math.floor(Math.random() * 500),
            }))}
            index="time"
            categories={["Storage"]}
            colors={["purple"]}
            showLegend={false}
            showYAxis={true}
            showGridLines={true}
          />
        </Card>
      </div>
    );
  }

  // network-storage
  return (
    <div className="mt-4 space-y-4">
      <Grid numItems={1} numItemsSm={2} className="gap-4">
        <Card>
          <Title>Network Latency (ms)</Title>
          <LineChart
            className="mt-4 h-52"
            data={Array.from({ length: 24 }, (_, i) => ({
              time: `${i}:00`,
              Latency: Math.floor(Math.random() * 20) + 5,
            }))}
            index="time"
            categories={["Latency"]}
            colors={["blue"]}
            showLegend={false}
            showYAxis={true}
            showGridLines={true}
          />
        </Card>
        <Card>
          <Title>Throughput (Gbps)</Title>
          <AreaChart
            className="mt-4 h-52"
            data={Array.from({ length: 24 }, (_, i) => ({
              time: `${i}:00`,
              Throughput: Math.floor(Math.random() * 30) + 40,
            }))}
            index="time"
            categories={["Throughput"]}
            colors={["emerald"]}
            showLegend={false}
            showYAxis={true}
            showGridLines={true}
          />
        </Card>
      </Grid>
      <Card>
        <Title>IOPS (Operations/sec)</Title>
        <AreaChart
          className="mt-4 h-52"
          data={Array.from({ length: 24 }, (_, i) => ({
            time: `${i}:00`,
            IOPS: Math.floor(Math.random() * 5000) + 10000,
          }))}
          index="time"
          categories={["IOPS"]}
          colors={["indigo"]}
          showLegend={false}
          showYAxis={true}
          showGridLines={true}
        />
      </Card>
    </div>
  );
}