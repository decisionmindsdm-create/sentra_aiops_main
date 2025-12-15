"use client";

import { ReactNode, useEffect } from "react";
import { Popover } from "@headlessui/react";
import { Icon } from "@tremor/react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { usePathname } from "next/navigation";
import { useLocalStorage } from "utils/hooks/useLocalStorage";
import { useHotkeys } from "react-hotkeys-hook";
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
  const [isMenuMinimized, setisMenuMinimized] = useLocalStorage<boolean>(
    "menu-minimized",
    false
  );

  useHotkeys(
    "[",
    () => {
      // Toggle the state based on its current value
      const newState = !isMenuMinimized;
      console.log(newState ? "Closing menu ([)" : "Opening menu ([)");
      setisMenuMinimized(newState);
    },
    [isMenuMinimized]
  );

  return (
    <Popover>
      {({ close: closeMenu }) => (
        <>
          <div className="p-3 w-full block lg:hidden">
            <Popover.Button className="p-1 hover:bg-stone-200/50 font-medium rounded-lg hover:text-orange-400 focus:ring focus:ring-orange-300">
              <Icon icon={AiOutlineMenu} color="orange" />
            </Popover.Button>
          </div>

          {/* UI Change Only - functionality unchanged */}
          {/* Light sidebar theme to match design */}
          <aside
            className='fixed left-0 bottom-0 border-r w-[240px] xl:w-[260px] 2xl:w-[280px] hidden lg:flex flex-col [&[data-minimized="true"]>nav]:invisible z-30 sidebar'
            data-minimized={isMenuMinimized}
            style={{ backgroundColor: '#F5F7FA', borderColor: '#E5E7EB', top: '56px', paddingTop: '12px' }}
          >
            <nav className="flex flex-col h-full overflow-hidden">
              {children}
            </nav>
          </aside>

          <CloseMenuOnRouteChange closeMenu={closeMenu} />
          <Popover.Panel
            className="bg-gray-50 col-span-1 border-r border-gray-300 z-50 h-screen fixed inset-0 md:overflow-scroll sm:overflow-scroll"
            as="nav"
          >
            <div className="p-3 fixed top-0 right-0 ">
              <Popover.Button className="p-1 hover:bg-stone-200/50 font-medium rounded-lg hover:text-orange-400 focus:ring focus:ring-orange-300">
                <Icon icon={AiOutlineClose} color="orange" />
              </Popover.Button>
            </div>

            {/* No more TenantSwitcher here either */}
            <div className="mt-12">{children}</div>
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
};
