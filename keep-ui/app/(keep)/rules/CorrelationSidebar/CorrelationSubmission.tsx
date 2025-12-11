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
        <Button type="button" variant="light" className="text-[#0d88c0] hover:bg-[#e6f4f9]" onClick={toggle}>
          Cancel
        </Button>
        <Button className="bg-[#0d88c0] hover:bg-[#0b76a8] border-[#0d88c0] text-white" disabled={!isValid || exceeds90Days}>
          {isRuleBeingEdited ? "Save correlation" : "Create correlation"}
        </Button>
      </div>
    </div>
  );
};
