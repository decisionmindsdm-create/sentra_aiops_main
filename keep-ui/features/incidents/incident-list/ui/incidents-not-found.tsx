"use client";

import { Button } from "@tremor/react";
import { EmptyStateCard } from "@/shared/ui/EmptyState/EmptyStateCard";
import { MdFlashOn } from "react-icons/md";
import { useRouter } from "next/navigation";

interface Props {
  onClearFilters: () => void;
}

export const IncidentsNotFoundForFiltersPlaceholder = ({
  onClearFilters,
}: Props) => {
  return (
    <EmptyStateCard
      icon={MdFlashOn}
      title="No Incidents Matching the Filter"
      description="Clear filters to see all incidents"
    >
      <Button onClick={() => onClearFilters()}>Clear filters</Button>
    </EmptyStateCard>
  );
};

export const IncidentsNotFoundPlaceholder = () => {
  const router = useRouter();
  return (
    <EmptyStateCard
      icon={MdFlashOn}
      title="No Incidents Found"
      description="No active incidents found"
    >
      <div className="flex gap-2">
        <Button
          variant="secondary"
          size="md"
          onClick={() => {
            router.push(`/alerts/feed`);
          }}
          className="!border-[#0d88c0] !text-[#0d88c0] hover:!bg-[#0d88c0] hover:!text-white"
        >
          Correlate Alerts Manually
        </Button>
        <Button
          variant="primary"
          size="md"
          onClick={() => {
            router.push(`/alerts/feed?createIncidentsFromLastAlerts=50`);
          }}
          className="!bg-[#0d88c0] hover:!bg-[#0a6d9a] !text-white"
        >
          Try AI Correlation
        </Button>
      </div>
    </EmptyStateCard>
  );
};
