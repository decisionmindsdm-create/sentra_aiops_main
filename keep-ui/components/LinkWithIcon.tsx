import { AnchorHTMLAttributes, ReactNode, useState } from "react";
import Link, { LinkProps } from "next/link";
import { IconType } from "react-icons/lib";
import { Badge, Icon } from "@tremor/react";
import { usePathname } from "next/navigation";
import { Trashcan } from "@/components/icons";
import clsx from "clsx";
import { ShortNumber } from "./ui";

type LinkWithIconProps = {
  children: ReactNode;
  icon: IconType;
  count?: number;
  isBeta?: boolean;
  isDeletable?: boolean;
  onDelete?: () => void;
  className?: string;
  testId?: string;
  isExact?: boolean;
  iconClassName?: string;
  renderBeforeCount?: () => JSX.Element | undefined;
  onIconClick?: (e: React.MouseEvent) => void;
} & LinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement>;

export const LinkWithIcon = ({
  icon,
  children,
  tabIndex = 0,
  count,
  isBeta = false,
  isDeletable = false,
  onDelete,
  className,
  testId,
  isExact = false,
  iconClassName,
  renderBeforeCount,
  onIconClick,
  ...restOfLinkProps
}: LinkWithIconProps) => {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);
  const isActive = isExact
    ? decodeURIComponent(pathname || "") === restOfLinkProps.href?.toString()
    : decodeURIComponent(pathname || "").startsWith(
        restOfLinkProps.href?.toString() || ""
      );

  // UI Change Only - functionality unchanged
  const iconClasses = clsx(
    "group-hover:text-[#3BA3D4] transition-colors duration-200",
    {
      "text-[#3BA3D4]": isActive,
      "text-gray-600": !isActive,
    },
    iconClassName
  );

  const textClasses = clsx("truncate transition-colors duration-200", {
    "text-gray-900 font-medium": isActive,
    "text-gray-700": !isActive,
  });

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (restOfLinkProps.onClick) {
      restOfLinkProps.onClick(e);
    }
  };

  const handleIconClick = (e: React.MouseEvent) => {
    if (onIconClick) {
      e.preventDefault();
      e.stopPropagation();
      onIconClick(e);
    }
  };

  return (
    <div
      className={clsx(
        "flex items-center justify-between py-0.5 px-1 font-medium rounded-lg focus:ring focus:ring-blue-300 group w-full min-w-0 transition-all duration-200",
        {
          "bg-white shadow-sm": isActive,
          "hover:bg-white/60": !isActive,
        },
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-testid={`${testId}-link-container`}
    >
      <Link
        tabIndex={tabIndex}
        {...restOfLinkProps}
        className="flex items-center space-x-1 flex-1 min-w-0"
        onClick={onClick}
        data-testid={`${testId}-link`}
      >
        {onIconClick ? (
          <button
            onClick={handleIconClick}
            className="flex items-center p-0 bg-transparent border-none cursor-pointer"
            type="button"
          >
            <Icon className={iconClasses} icon={icon} />
          </button>
        ) : (
          <Icon className={iconClasses} icon={icon} />
        )}
        <span className={textClasses}>{children}</span>
      </Link>
      <div className="flex items-center">
        {count !== undefined && count !== null && (
          <Badge
            size="xs"
            className="px-1 mr-0.5 min-w-5 !bg-[#0d88c0] !text-white"
            data-testid={`${testId}-badge`}
          >
            <div className="flex gap-1 items-center">
              {renderBeforeCount && renderBeforeCount() && (
                <span>{renderBeforeCount()}</span>
              )}
              <ShortNumber value={count}></ShortNumber>
            </div>
          </Badge>
        )}
        {isBeta && (
          <Badge className="ml-1 !bg-[#0d88c0] !text-white" size="xs">
            Beta
          </Badge>
        )}
        {isDeletable && onDelete && (
          <button
            onClick={onDelete}
            className={`flex items-center text-slate-400 hover:text-red-500 p-0`}
          >
            <Trashcan className="text-slate-400 hover:text-red-500 group-hover:block hidden h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};
