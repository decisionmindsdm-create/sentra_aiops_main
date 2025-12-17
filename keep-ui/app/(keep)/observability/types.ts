export type ResourceType = "hosts" | "kubernetes" | "cloud" | "network-storage";
export type TabType = "overview" | "metrics" | "logs" | "traces" | "topology";
export type StatusType = "active" | "inactive" | "healthy" | "warning" | "critical" | "online" | "offline" | "degraded" | "running" | "pending" | "failed";
export type OSType = "linux" | "windows" | "macos";
export type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";
export type SeverityLevel = "high" | "medium" | "low";

// Types for Infrastructure page
export interface HostMetrics {
  id: string;
  name: string;
  status: StatusType;
  cpu: number;
  memory: number;
  disk: number;
  os: OSType;
  uptime: number;
}

export interface KubernetesMetrics {
  clusterId: string;
  clusterName: string;
  nodeCount: number;
  podCount: number;
  healthyPods: number;
  unhealthyPods: number;
  cpuUsage: number;
  memoryUsage: number;
}

export interface CloudResource {
  id: string;
  name: string;
  type: string;
  provider: "aws" | "azure" | "gcp";
  status: StatusType;
  region: string;
  cost: number;
}

export interface NetworkMetrics {
  id: string;
  name: string;
  type: "switch" | "router" | "firewall" | "storage";
  status: StatusType;
  latency: number;
  throughput: number;
  packetLoss: number;
}

export interface LogEntry {
  timestamp: number;
  level: SeverityLevel;
  source: string;
  message: string;
}

export interface TraceSpan {
  traceId: string;
  spanId: string;
  service: string;
  operation: string;
  duration: number;
  timestamp: number;
}

// Types for Applications page
export interface ServiceInfo {
  id: string;
  name: string;
  status: StatusType;
  requestRate: number;
  errorRate: number;
  latency: number;
  instances: number;
}

export interface APIEndpoint {
  id: string;
  path: string;
  method: HTTPMethod;
  latency: number;
  errorRate: number;
  requestCount: number;
}

export interface ServiceDependency {
  from: string;
  to: string;
  requestCount: number;
}

// Types for Data page
export interface Pipeline {
  id: string;
  name: string;
  status: StatusType;
  lastRun: number;
  recordsProcessed: number;
  duration: number;
}

export interface DataQualityMetrics {
  dataset: string;
  nullPercentage: number;
  duplicatePercentage: number;
  validityScore: number;
  freshnessDelay: number;
}

export interface VolumeAnomaly {
  timestamp: number;
  expected: number;
  actual: number;
  deviation: number;
}