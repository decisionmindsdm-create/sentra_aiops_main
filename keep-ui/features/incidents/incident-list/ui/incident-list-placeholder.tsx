import { Fragment } from "react";
import { Button, Subtitle, Title } from "@tremor/react";

interface Props {
  setIsFormOpen: (value: boolean) => void;
}

export const IncidentListPlaceholder = ({ setIsFormOpen }: Props) => {
  const onCreateButtonClick = () => {
    setIsFormOpen(true);
  };

  return (
    <Fragment>
      <div className="flex flex-col items-center justify-center gap-y-8 h-full py-16">
        <div className="text-center space-y-4">
          <Title className="text-3xl font-bold text-slate-900">No Incidents Yet</Title>
          <Subtitle className="text-slate-500 text-base">
            Create incidents manually to enable AI detection
          </Subtitle>
        </div>
        <Button
          className="mb-10 bg-gradient-to-r from-[#085690] to-[#0d88c0] hover:from-[#0d88c0] hover:to-[#085690] font-semibold shadow-md hover:shadow-lg transition-all duration-200 rounded-lg px-6 border-2 border-[#085690]"
          color="orange"
          onClick={() => onCreateButtonClick()}
        >
          Create Incident
        </Button>
      </div>
    </Fragment>
  );
};
