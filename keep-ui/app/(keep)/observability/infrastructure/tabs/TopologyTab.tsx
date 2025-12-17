import { Card, Title, Text } from "@tremor/react";
import { ResourceType } from "../../types";

interface TopologyTabProps {
  resourceType: ResourceType;
}

export function TopologyTab({ resourceType }: TopologyTabProps) {
  let title = "Topology Map";
  let description = "Visual representation of resource dependencies";

  if (resourceType === "hosts") {
    title = "Host Dependency Graph";
    description = "Interconnections and dependencies between hosts";
  } else if (resourceType === "kubernetes") {
    title = "Cluster Topology";
    description = "Cluster → Namespace → Pod relationships";
  } else if (resourceType === "cloud") {
    title = "Cloud Service Dependency Map";
    description = "Dependencies between cloud services and resources";
  } else {
    title = "Network & Storage Connectivity";
    description = "Network topology and storage connectivity map";
  }

  return (
    <div className="mt-4">
      <Card>
        <Title>{title}</Title>
        <Text className="mt-2">{description}</Text>
        <div className="mt-6 h-96 bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
            <Text className="mt-2 text-gray-600">
              Interactive topology visualization
            </Text>
            <Text className="text-sm text-gray-500">
              Mock visualization - shows {resourceType} topology
            </Text>
          </div>
        </div>
      </Card>
    </div>
  );
}