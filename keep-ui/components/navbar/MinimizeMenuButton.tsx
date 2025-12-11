// UI Change Only - functionality unchanged
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
    <div className="hidden lg:flex items-center justify-center border-r border-gray-300 bg-gray-50" style={{ width: '30px', minWidth: '30px' }}>
      <button
        className="flex items-center justify-center h-full w-full hover:bg-gray-100 transition-colors"
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
