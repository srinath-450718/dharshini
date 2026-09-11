import React, { forwardRef } from "react";
import { cn } from "../utils/cn";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "gold" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = "primary",
      size = "md",
      icon,
      iconPosition = "left",
      isLoading = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: "px-3.5 py-1.5 text-xs gap-1.5 rounded-full",
      md: "px-5 py-2.5 text-sm gap-2 rounded-full",
      lg: "px-7 py-3.5 text-base gap-2.5 rounded-full font-medium",
    }[size];

    const variantClasses = {
      primary:
        "bg-gradient-to-r from-[#F05AA6] to-[#C93984] text-[#FFF7F0] shadow-lg shadow-[#F05AA6]/25 hover:shadow-[#F05AA6]/40 hover:scale-[1.02] border border-white/10",
      secondary:
        "bg-[#0D1330]/80 text-[#FFF7F0] border border-white/10 hover:border-[#F05AA6]/40 hover:bg-[#151A3A] shadow-md shadow-black/30",
      gold:
        "bg-gradient-to-r from-[#F5C84B] to-[#D4A82F] text-[#080D25] font-medium shadow-lg shadow-[#F5C84B]/20 hover:shadow-[#F5C84B]/35 hover:scale-[1.02] border border-[#F5C84B]/40",
      ghost:
        "bg-transparent text-[#AEB6CC] hover:text-[#FFF7F0] hover:bg-white/5 border border-transparent hover:border-white/5",
    }[variant];

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "relative inline-flex items-center justify-center font-sans transition-all duration-300 active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:pointer-events-none select-none overflow-hidden group",
          sizeClasses,
          variantClasses,
          className
        )}
        {...props}
      >
        {/* Subtle shimmer effect on hover for primary and gold */}
        {(variant === "primary" || variant === "gold") && (
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />
        )}

        {isLoading ? (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            {icon && iconPosition === "left" && <span className="shrink-0">{icon}</span>}
            <span>{children}</span>
            {icon && iconPosition === "right" && <span className="shrink-0">{icon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
