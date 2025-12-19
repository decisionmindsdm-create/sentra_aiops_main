import { Button } from "@tremor/react";
import { useSearchParams } from "next/navigation";
import { useFormContext } from "react-hook-form";
import { CorrelationFormType } from "./types";

type CorrelationSubmissionProps = {
  toggle: VoidFunction;
  timeframeInSeconds: number;
};

export const CorrelationSubmission = ({
  toggle,
  timeframeInSeconds,
}: CorrelationSubmissionProps) => {
  const {
    formState: { isValid },
  } = useFormContext<CorrelationFormType>();

  const exceeds90Days = Math.floor(timeframeInSeconds / 86400) >= 90;

  const searchParams = useSearchParams();
  const isRuleBeingEdited = searchParams ? searchParams.get("id") : null;

  return (
    <div className="xl:col-span-2 flex justify-between items-end">
      <div className="flex items-center gap-x-4">
        <Button 
          type="button" 
          variant="light" 
          onClick={toggle}
          className="!text-[#0d88c0] hover:!text-[#0a6d9a]"
        >
          Cancel
        </Button>
        <Button 
          disabled={!isValid || exceeds90Days}
          className="!bg-[#0d88c0] hover:!bg-[#0a6d9a] !text-white"
        >
          {isRuleBeingEdited ? "Save correlation" : "Create correlation"}
        </Button>
      </div>
    </div>
  );
};
