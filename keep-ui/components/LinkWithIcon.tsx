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
  ...restOfLinkProps
}: LinkWithIconProps) => {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);
  const isActive = isExact
    ? decodeURIComponent(pathname || "") === restOfLinkProps.href?.toString()
    : decodeURIComponent(pathname || "").startsWith(
        restOfLinkProps.href?.toString() || ""
      );

  const iconClasses = clsx(
    "group-hover:text-blue-600 transition-colors duration-200",
    {
      "text-blue-600": isActive,
      "text-slate-600": !isActive,
    },
    iconClassName
  );

  const textClasses = clsx("truncate font-semibold transition-colors duration-200", {
    "text-slate-900": isActive,
    "text-slate-700": !isActive,
  });

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (restOfLinkProps.onClick) {
      restOfLinkProps.onClick(e);
    }
  };

  return (
    <div
      className={clsx(
        "flex items-center justify-between py-2 px-3 font-medium rounded-xl focus:ring-2 focus:ring-blue-400/50 group w-full min-w-0 transition-all duration-200",
        {
          "bg-gradient-to-r from-blue-50 to-cyan-50/50 shadow-sm hover:shadow-md border border-blue-100/50": isActive,
          "hover:bg-slate-50 hover:shadow-sm border border-transparent hover:border-slate-200/50": !isActive,
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
        className="flex items-center space-x-2.5 flex-1 min-w-0"
        onClick={onClick}
        data-testid={`${testId}-link`}
      >
        <Icon className={iconClasses} icon={icon} size="sm" />
        <span className={textClasses}>{children}</span>
      </Link>
      <div className="flex items-center gap-1.5">
        {count !== undefined && count !== null && (
          <Badge
            size="xs"
            color="blue"
            data-testid={`${testId}-badge`}
            className="px-2 py-0.5 min-w-6 bg-slate-100 text-slate-700 font-bold border border-slate-200 rounded-lg shadow-sm"
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
          <Badge color="blue" size="xs" className="ml-1 bg-blue-100 text-blue-700 font-bold border border-blue-200 rounded-lg shadow-sm px-2 py-0.5">
            Beta
          </Badge>
        )}
        {isDeletable && onDelete && (
          <button
            onClick={onDelete}
            className={`flex items-center text-gray-400 hover:text-red-400 p-0`}
          >
            <Trashcan className="text-gray-400 hover:text-red-400 group-hover:block hidden h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};
