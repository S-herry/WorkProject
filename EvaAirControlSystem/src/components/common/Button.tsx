import React from "react";
import { clsx } from "clsx";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  color?: string;
  type?: "button" | "submit" | "reset";
  size?: "sm" | "md" | "lg";
  show?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  color = "bg-blue-500",
  children,
  type = "button",
  size = "lg",
  disabled = false,
  show = true,
  onClick,
}) => {
  if (!show) return null;

  const sizeClasses = {
    sm: "text-xs sm:text-sm ",
    md: "text-base sm:text-lg ",
    lg: "text-lg md:text-lg ",
  };

  return (
    <button
      type={type}
      className={clsx(
        "font-semibold text-white rounded-md shadow-lg transition-all ",
        color,
        sizeClasses[size],
        {
          "cursor-not-allowed opacity-50": disabled,
          "cursor-pointer": !disabled,
        }
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
