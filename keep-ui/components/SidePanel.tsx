import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  panelWidth?: string;
  overlayOpacity?: string;
}

const SidePanel: React.FC<SidePanelProps> = ({
  isOpen,
  onClose,
  children,
  panelWidth = "w-1/2", // Default width
  overlayOpacity = "bg-slate-900/40", // Default overlay opacity
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className={`fixed inset-0 ${overlayOpacity} backdrop-blur-sm`}
            aria-hidden="true"
          />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <Dialog.Panel
            className={`fixed right-0 inset-y-0 ${panelWidth} bg-gradient-to-br from-white to-slate-50/30 z-30 flex flex-col p-6 shadow-2xl border-l border-slate-200/60`}
          >
            {children}
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default SidePanel;
