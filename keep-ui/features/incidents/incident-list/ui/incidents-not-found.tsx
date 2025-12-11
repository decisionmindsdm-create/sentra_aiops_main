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
      <Button 
        onClick={() => onClearFilters()}
        className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 font-semibold shadow-md hover:shadow-lg transition-all duration-200 rounded-lg px-6"
      >
        Clear filters
      </Button>
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
      <Button
        color="orange"
        variant="secondary"
        size="md"
        onClick={() => {
          router.push(`/alerts/feed`);
        }}
        className="border-2 border-[#0d88c0] text-[#085690] hover:bg-blue-50 font-semibold px-6 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
      >
        Correlate Alerts Manually
      </Button>
    </EmptyStateCard>
  );
};
