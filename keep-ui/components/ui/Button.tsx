import React from "react";
import { Button as TremorButton, ButtonProps } from "@tremor/react";
import { cn } from "utils/helpers";

type ButtonVariantType = "destructive" | "primary" | ButtonProps["variant"];

export function Button({
  variant,
  className,
  ...props
}: { variant: ButtonVariantType } & Omit<ButtonProps, "variant">) {
  let variantClasses = "";

  if (variant === "destructive") {
    variantClasses =
      "bg-red-500 hover:bg-red-600 text-white border-red-500 hover:border-red-600";
  } else if (variant === "primary") {
    variantClasses =
      "bg-[#0d88c0] hover:bg-[#0a6d9a] text-white border-[#0d88c0] hover:border-[#0a6d9a]";
  }

  return (
    <TremorButton
      className={cn(variantClasses, className)}
      variant={variant !== "destructive" && variant !== "primary" ? variant : undefined}
      {...props}
    />
  );
}
