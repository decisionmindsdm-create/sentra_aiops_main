import { StatusType } from "./types";

// Format timestamp to readable date
export const formatTimestamp = (timestamp: number): string => {
  return new Date(timestamp).toLocaleString();
};

// Format bytes to human readable
export const formatBytes = (bytes: number): string => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let size = bytes;
  let unitIndex = 0;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  return `${size.toFixed(2)} ${units[unitIndex]}`;
};

// Format percentage
export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

// Format latency in milliseconds
export const formatLatency = (ms: number): string => {
  return `${ms.toFixed(0)} ms`;
};

// Format request rate
export const formatRequestRate = (rate: number): string => {
  return `${rate.toFixed(1)} req/s`;
};

// Format status badge color
export const getStatusColor = (status: StatusType): string => {
  const colorMap: Record<StatusType, string> = {
    active: "emerald",
    healthy: "emerald",
    online: "emerald",
    running: "emerald",
    warning: "amber",
    degraded: "amber",
    pending: "amber",
    critical: "red",
    inactive: "red",
    offline: "red",
    failed: "red",
  };
  return colorMap[status] || "gray";
};