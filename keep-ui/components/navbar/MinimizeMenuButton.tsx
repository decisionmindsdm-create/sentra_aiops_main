"use client";

import { Icon } from "@tremor/react";
import { TbChevronCompactRight, TbChevronCompactLeft } from "react-icons/tb";
import { useLocalStorage } from "utils/hooks/useLocalStorage";

export const MinimizeMenuButton = () => {
  const [isMenuMinimized, setisMenuMinimized] = useLocalStorage<boolean>(
    "menu-minimized",
    false
  );

  return (
    <div className="hidden lg:flex items-center h-full justify-center fixed left-[240px] xl:left-[260px] 2xl:left-[280px] bottom-0 w-[30px] z-20" style={{ top: '56px' }}>
      <button
        className="flex items-center justify-center"
        onClick={() => setisMenuMinimized(!isMenuMinimized)}
      >
        <Icon
          className="text-slate-600 p-0 opacity-50 hover:opacity-100"
          icon={isMenuMinimized ? TbChevronCompactRight : TbChevronCompactLeft}
          size="lg"
        />
      </button>
    </div>
  );
};
