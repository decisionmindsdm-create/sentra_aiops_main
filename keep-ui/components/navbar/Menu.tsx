// UI Change Only - functionality unchanged
"use client";

import { ReactNode, useEffect } from "react";
import { Popover } from "@headlessui/react";
import { Icon } from "@tremor/react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";

type CloseMenuOnRouteChangeProps = {
  closeMenu: () => void;
};

const CloseMenuOnRouteChange = ({ closeMenu }: CloseMenuOnRouteChangeProps) => {
  const pathname = usePathname();

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  return null;
};

type MenuButtonProps = {
  children: ReactNode;
  session: Session | null;
};

export const Menu = ({ children, session }: MenuButtonProps) => {
  return (
    <Popover>
      {({ close: closeMenu }) => (
        <>
          <div className="p-4 w-full block lg:hidden">
            <Popover.Button className="p-2.5 hover:bg-slate-100 font-medium rounded-xl text-slate-700 focus:ring-2 focus:ring-blue-400/50 transition-all duration-200 shadow-sm hover:shadow-md">
              <Icon icon={AiOutlineMenu} color="slate" />
            </Popover.Button>
          </div>

          <aside className='relative border-r border-cyan-200/50 h-full w-64 lg:flex flex-col shadow-xl bg-gradient-to-b from-cyan-50/70 to-blue-50/60 backdrop-blur-sm hidden'>
            <nav className="flex flex-col h-full">
              {children}
            </nav>
          </aside>

          <CloseMenuOnRouteChange closeMenu={closeMenu} />
          <Popover.Panel
            className="border-r border-cyan-200/50 z-50 h-screen fixed inset-0 md:overflow-scroll sm:overflow-scroll bg-gradient-to-b from-cyan-50/80 to-blue-50/70 backdrop-blur-md shadow-2xl"
            as="nav"
          >
            <div className="p-4 fixed top-0 right-0 z-10">
              <Popover.Button className="p-2.5 hover:bg-slate-100 font-medium rounded-xl text-slate-700 focus:ring-2 focus:ring-blue-400/50 transition-all duration-200 shadow-sm hover:shadow-md">
                <Icon icon={AiOutlineClose} color="slate" />
              </Popover.Button>
            </div>

            <div className="mt-16 px-2">{children}</div>
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
};
